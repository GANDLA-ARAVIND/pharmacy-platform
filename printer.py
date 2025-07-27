def save_files_data(file_paths, output_file):
    with open(output_file, 'w', encoding='utf-8') as out_file:
        for path in file_paths:
            out_file.write(f"\n\n=== File: {path} ===\n")
            try:
                with open(path, 'r', encoding='utf-8') as f:
                    content = f.read()
                    out_file.write(content)
            except Exception as e:
                out_file.write(f"[Error reading file]: {e}")

if __name__ == "__main__":  # ✅ fixed here
    files = [
r"C:\Users\Dell\Downloads\pharmacy-platform\app\globals.css",
r"C:\Users\Dell\Downloads\pharmacy-platform\app\layout.tsx",
r"C:\Users\Dell\Downloads\pharmacy-platform\app\loading.tsx",
r"C:\Users\Dell\Downloads\pharmacy-platform\app\page.tsx",
r"C:\Users\Dell\Downloads\pharmacy-platform\components\theme-provider.tsx",
r"C:\Users\Dell\Downloads\pharmacy-platform\hooks\use-mobile.tsx",
r"C:\Users\Dell\Downloads\pharmacy-platform\hooks\use-toast.ts",
r"C:\Users\Dell\Downloads\pharmacy-platform\lib\utils.ts",
r"C:\Users\Dell\Downloads\pharmacy-platform\styles\globals.css",
r"C:\Users\Dell\Downloads\pharmacy-platform\components.json",
r"C:\Users\Dell\Downloads\pharmacy-platform\package.json",
r"C:\Users\Dell\Downloads\pharmacy-platform\pnpm-lock.yaml",
r"C:\Users\Dell\Downloads\pharmacy-platform\postcss.config.mjs",
r"C:\Users\Dell\Downloads\pharmacy-platform\tailwind.config.ts",
r"C:\Users\Dell\Downloads\pharmacy-platform\tsconfig.json",
r"C:\Users\Dell\Downloads\pharmacy-platform\next.config.mjs",
        
    ]
    
    output = r"C:\Users\Dell\Downloads\pharmacy-platform\output.txt"
    save_files_data(files, output)
    print(f"Data saved to {output}")
