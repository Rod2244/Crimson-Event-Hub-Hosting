@echo off
REM ════════════════════════════════════════════════════════════════════════════════
REM AUTOMATIC CACHE CLEAR & RESTART SCRIPT
REM ════════════════════════════════════════════════════════════════════════════════

echo.
echo 🔧 STARTING AUTOMATIC CACHE CLEAR & RESTART...
echo.

REM Step 1: Kill all node processes
echo ⏹️  Killing all Node.js processes...
taskkill /F /IM node.exe 2>nul
taskkill /F /IM npm.cmd 2>nul
timeout /t 2 /nobreak

REM Step 2: Delete Vite cache
echo 🗑️  Deleting Vite cache...
cd /d "c:\Users\ACER\Crimson Event Hub\Frontend"
if exist .vite rmdir /s /q .vite
if exist dist rmdir /s /q dist
if exist node_modules\.vite rmdir /s /q node_modules\.vite
echo ✅ Vite cache deleted

REM Step 3: Restart Backend
echo.
echo 🚀 Starting Backend server...
echo.
start cmd /k "cd /d c:\Users\ACER\Crimson Event Hub\Backend && npm start"
timeout /t 5 /nobreak

REM Step 4: Restart Frontend
echo.
echo 🚀 Starting Frontend dev server...
echo.
cd /d "c:\Users\ACER\Crimson Event Hub\Frontend"
start cmd /k "npm run dev -- --no-cache"

echo.
echo ════════════════════════════════════════════════════════════════════════════════
echo ✅ Cache cleared and servers restarted!
echo.
echo 📝 NEXT STEPS:
echo    1. Wait 5-10 seconds for both terminals to fully start
echo    2. Close ALL browser windows/tabs
echo    3. Clear browser cache (Ctrl+Shift+Delete → "All time" → "Clear data")
echo    4. Open NEW browser window
echo    5. Go to: http://localhost:5173
echo    6. Hard refresh: Ctrl+Shift+R
echo    7. Login and navigate to: Organizer → Event Management → Submit Event
echo    8. Open DevTools (F12) and check Console for category fetch logs
echo.
echo ════════════════════════════════════════════════════════════════════════════════
pause
