@echo off

set "GITHUB_USERNAME=janvanoverwalle"
set "GITHUB_REPO=instamax"
set "GITHUB_BRANCH=main"

set "ZIP_NAME=source.zip"

set "TMP_DIR=temp"
set "SOURCE_DIR=%TMP_DIR%\%GITHUB_REPO%-%GITHUB_BRANCH%"

if "%CD%"=="C:\" (
    echo Refusing to run in C:\
    goto :abort
)
if "%CD%"=="%USERPROFILE%" (
    echo Refusing to run in your home folder
    goto :abort
)

echo Updating Instamax...

<nul set /p =Downloading latest version...
curl -sS -fL -o %ZIP_NAME% https://github.com/%GITHUB_USERNAME%/%GITHUB_REPO%/archive/refs/heads/%GITHUB_BRANCH%.zip
if errorlevel 1 (
    echo ERROR
    goto :abort
)
echo OK

<nul set /p =Extracting files...
rmdir /s /q "%TMP_DIR%" 2>nul
mkdir "%TMP_DIR%"
tar -xf %ZIP_NAME% -C "%TMP_DIR%"
if errorlevel 1 (
    echo ERROR
    goto :abort
)
echo OK

if not exist "%SOURCE_DIR%" (
    echo Extracted folder not found.
    goto :abort
)

<nul set /p =echo Removing old files...
rmdir /s /q "assets" 2>nul
rmdir /s /q "css" 2>nul
rmdir /s /q "js" 2>nul
rmdir /s /q "scripts" 2>nul
del /f /q ".gitignore" 2>nul
del /f /q "README.md" 2>nul
del /f /q "converter.exe" 2>nul
del /f /q "instamax.html" 2>nul
echo OK

<nul set /p =Preparing new files...
del /f /q "%SOURCE_DIR%\.gitignore" 2>nul
del /f /q "%SOURCE_DIR%\*.md" 2>nul
del /f /q "%SOURCE_DIR%\updater.*" 2>nul
echo OK

<nul set /p =echo Installing new files...
move "%SOURCE_DIR%\*" . >nul
for /d %%d in ("%SOURCE_DIR%\*") do move "%%~fd" "%CD%\" >nul
echo OK

<nul set /p =echo Cleaning up...
del /f /q "%ZIP_NAME%" 2>nul
rmdir /s /q "%TMP_DIR%" 2>nul
echo OK

echo Update complete!
pause
exit /b 0

:abort
echo Update failed. All files are untouched.
pause
exit /b 1
