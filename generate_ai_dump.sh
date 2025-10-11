#!/bin/bash
# ======================================================
# ASRD-RWA COMPLETE REPO DUMP (Enhanced)
# Automatically generates a full text file for AI
# Includes metadata: size, lines, last modified
# Optionally includes node_modules info & key config files
# ======================================================

OUTPUT_FILE="asrd_project_full_dump.txt"
echo "=== ASRD-RWA FULL PROJECT DUMP ===" > $OUTPUT_FILE

# Function to dump a single file with metadata
dump_file() {
  local FILE="$1"
  if [ -f "$FILE" ]; then
    FILE_SIZE=$(stat -c%s "$FILE" 2>/dev/null || stat -f%z "$FILE")
    FILE_LINES=$(wc -l < "$FILE" 2>/dev/null || echo "N/A")
    FILE_MODIFIED=$(stat -c%y "$FILE" 2>/dev/null || stat -f%Sm "$FILE")
    echo -e "\n--- $FILE ---" >> $OUTPUT_FILE
    echo "Size: $FILE_SIZE bytes | Lines: $FILE_LINES | Last Modified: $FILE_MODIFIED" >> $OUTPUT_FILE
    echo "----------------------------------------" >> $OUTPUT_FILE
    # Only dump text files; skip binary
    if file "$FILE" | grep -q text; then
      cat "$FILE" >> $OUTPUT_FILE
    else
      echo "[Binary file content skipped]" >> $OUTPUT_FILE
    fi
  else
    echo -e "\n--- $FILE NOT FOUND ---" >> $OUTPUT_FILE
  fi
}

# Dump project structure
echo -e "\n=== Project Structure Overview ===" >> $OUTPUT_FILE
find . -type d >> $OUTPUT_FILE
find . -type f >> $OUTPUT_FILE
echo -e "\n=== End of Structure ===\n" >> $OUTPUT_FILE

# List of key config files
CONFIG_FILES=("package.json" "tsconfig.json" ".env" ".eslintrc.js" ".prettierrc" "next.config.js")

echo "Dumping key config files..." >> $OUTPUT_FILE
for cfg in "${CONFIG_FILES[@]}"; do
  dump_file "$cfg"
done

# Dump all repo files, excluding node_modules by default
echo "Dumping all files (excluding node_modules)..." >> $OUTPUT_FILE
for file in $(find . -type f ! -path "./node_modules*"); do
  dump_file "$file"
done

# Optional: include node_modules metadata only (skip huge binaries)
echo "Dumping node_modules metadata..." >> $OUTPUT_FILE
for dir in node_modules/*; do
  if [ -d "$dir" ]; then
    echo -e "\n--- node_modules/$dir ---" >> $OUTPUT_FILE
    echo "Contains $(find "$dir" -type f | wc -l) files" >> $OUTPUT_FILE
    echo "Top 10 files:" >> $OUTPUT_FILE
    find "$dir" -type f | head -10 >> $OUTPUT_FILE
  fi
done

echo -e "\n✅ Full project dump complete! File: $OUTPUT_FILE"
echo "You can now upload $OUTPUT_FILE for AI analysis."
