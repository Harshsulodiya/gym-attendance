@echo off
title Repair Git Repository for Vercel
color 0A

echo ====================================================
echo     REPAIRING GIT REPOSITORY FOR VERCEL
echo ====================================================
echo.

:: Verify project folder
if not exist package.json (
    echo ERROR: package.json not found.
    echo Please run this file inside your project folder.
    pause
    exit /b
)

echo [1/8] Creating .gitignore...

(
echo node_modules/
echo dist/
echo .vite/
echo .vercel/
echo .env
echo *.log
echo npm-debug.log*
echo yarn-debug.log*
echo yarn-error.log*
) > .gitignore

echo.
echo [2/8] Removing all tracked files from Git index...
git rm -r --cached .

echo.
echo [3/8] Re-adding files (node_modules will be ignored)...
git add .

echo.
echo [4/8] Creating commit...
git commit -m "Clean repository for Vercel"

echo.
echo [5/8] Pushing to GitHub...
git push origin main

echo.
echo [6/8] Verifying node_modules...
git ls-files | findstr node_modules

echo.
echo [7/8] Verifying dist...
git ls-files | findstr dist

echo.
echo ====================================================
echo If NO output appeared above,
echo node_modules and dist are no longer tracked.
echo ====================================================
echo.

pause