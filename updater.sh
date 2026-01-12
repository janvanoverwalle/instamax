#!/bin/bash

GITHUB_USERNAME="janvanoverwalle"
GITHUB_REPO="instamax"
GITHUB_BRANCH="main"

ZIP_NAME="source.zip"
TMP_DIR="temp"
SOURCE_DIR="$TMP_DIR/${GITHUB_REPO}-${GITHUB_BRANCH}"

if [[ "$PWD" == "/" || "$PWD" == "$HOME" ]]; then
  echo "Refusing to run in unsafe directory: $PWD"
  exit 1
fi

echo "Updating Instamax..."

printf "Downloading latest version... "
curl -sS -fL -o "$ZIP_NAME" "https://github.com/$GITHUB_USERNAME/$GITHUB_REPO/archive/refs/heads/$GITHUB_BRANCH.zip"
echo "OK"

printf "Extracting files... "
rm -rf "$TMP_DIR"
mkdir -p "$TMP_DIR"
unzip -q "$ZIP_NAME" -d "$TMP_DIR"
echo "OK"

[[ -d "$SOURCE_DIR" ]] || { echo "Extracted folder not found."; exit 1; }

printf "Removing old files... "
rm -rf assets css js scripts .gitignore README.md converter.exe instamax.html 2>/dev/null
echo "OK"

printf "Preparing new files... "
rm -rf "$SOURCE_DIR/.gitignore" "$SOURCE_DIR/README.md" "$SOURCE_DIR/updater.bat" "$SOURCE_DIR/updater.sh" 2>/dev/null
echo "OK"

printf "Installing new files... "
shopt -s dotglob
mv "$SOURCE_DIR"/* . 2>/dev/null
shopt -u dotglob
echo "OK"

printf "Cleaning up... "
rm -rf "$TMP_DIR" 2>/dev/null
echo "OK"

echo "Update complete!"
read -p "Press Enter to continue..."
