import os
import re
import sys
from pathlib import Path

def lint_skills_directory(base_dir: str):
    print(f"[HajimiDog Linter] 开始扫描技能体系: {base_dir}")
    base_path = Path(base_dir).resolve()
    if not base_path.exists():
        print(f"错误: 目录 {base_dir} 不存在！")
        sys.exit(1)

    errors = 0
    warnings = 0
    visited_paths = set()

    # 1. 扫描所有 Markdown 文件
    md_files = list(base_path.rglob("*.md"))
    
    for file_path in md_files:
        try:
            resolved_path = file_path.resolve()
            # 防御符号链接死循环
            if resolved_path in visited_paths:
                continue
            visited_paths.add(resolved_path)
            
            # 防御大文件 OOM
            if resolved_path.stat().st_size > 1024 * 1024: # 1MB
                print(f"[警告] 文件过大跳过扫描: {file_path.name}")
                warnings += 1
                continue

            rel_path = resolved_path.relative_to(base_path)
            
            # 编码降级回退机制
            content = ""
            lines = []
            for enc in ['utf-8', 'gbk']:
                try:
                    with open(resolved_path, 'r', encoding=enc) as f:
                        lines = f.readlines()
                        content = "".join(lines)
                    break
                except UnicodeDecodeError:
                    continue
            
            if not content:
                print(f"[错误] 无法读取文件编码: {rel_path}")
                errors += 1
                continue

            # 检查文件大小 (行数)
            if len(lines) > 200:
                print(f"[警告] 文件过大: {rel_path} ({len(lines)} 行) - 建议拆分以防上下文溢出。")
                warnings += 1

            # 优化正则，防止 ReDoS，并处理跨平台路径
            links = re.findall(r'`([^`]{5,256})`', content)
            for link in links:
                if "hajimi-dog" in link and ("\\" in link or "/" in link):
                    try:
                        target_path = Path(os.path.normpath(link.strip()))
                        if target_path.is_absolute() and not target_path.exists():
                            print(f"[错误] 死链检测: {rel_path} 中引用了不存在的文件 -> {link}")
                            errors += 1
                    except Exception:
                        pass

        except PermissionError:
            print(f"[警告] 权限拒绝跳过: {file_path.name}")
            warnings += 1
        except Exception as e:
            print(f"[错误] 扫描异常 {file_path.name}: {e}")
            errors += 1

    # 2. 检查目录命名规范 (必须以数字+下划线开头，或纯中文/特定格式)
    dirs = [d for d in base_path.rglob("*") if d.is_dir()]
    for d in dirs:
        dir_name = d.name
        if dir_name in ["__pycache__", ".git"]:
            continue
            
        # 严格过滤不可见字符
        if re.search(r'[\n\r\t]', dir_name):
            print(f"[错误] 命名规范: 目录 '{dir_name}' 包含非法不可见字符。")
            errors += 1
            continue
            
        if not re.match(r'^\d{2}_[\u4e00-\u9fa5a-zA-Z0-9]+', dir_name) and dir_name != "hajimi-dog":
            print(f"[警告] 命名规范: 目录 '{dir_name}' 不符合 '00_中文描述' 的规范。")
            warnings += 1

    print("\n" + "="*40)
    print(f"Linter 扫描完成! 发现 {errors} 个错误, {warnings} 个警告。")
    if errors > 0:
        print("[拦截] CI/CD Linter 校验失败，请修复上述错误！")
        sys.exit(1)
    else:
        print("[通过] 技能体系健康度良好！")
        sys.exit(0)

if __name__ == "__main__":
    target_dir = os.path.dirname(os.path.abspath(__file__))
    lint_skills_directory(target_dir)