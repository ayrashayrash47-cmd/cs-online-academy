@echo off
title CS Online Academy — Dev Server
color 0A
cls
echo.
echo  =====================================================
echo    CS Online Academy
echo    Powered by CS School System
echo  =====================================================
echo.

cd /d D:\cs-online-academy

echo  [1/2] Opening site in browser in 4 seconds...
timeout /t 4 /nobreak >nul
start "" "http://localhost:3000"

echo  [2/2] Starting dev server...
echo.
echo  =====================================================
echo   Landing page: http://localhost:3000
echo   Admin panel:  http://localhost:3000/admin
echo   Press Ctrl+C to stop the server
echo  =====================================================
echo.

call npm run dev

echo.
echo  Server stopped. Press any key to close.
pause >nul
