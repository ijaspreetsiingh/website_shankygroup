@echo off
echo ========================================
echo   Shanky Group - Next.js Build
echo ========================================
echo.

if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
    if errorlevel 1 (
        echo Build failed: npm install error
        pause
        exit /b 1
    )
    echo.
)

echo Building application...
call npm run build
if errorlevel 1 (
    echo Build failed.
    pause
    exit /b 1
)

echo.
echo ========================================
echo   Build completed successfully!
echo   Output: .next folder
echo   Run "npm start" to start production server
echo ========================================
pause
