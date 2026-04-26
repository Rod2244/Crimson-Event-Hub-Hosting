# ════════════════════════════════════════════════════════════════════════════════
# AUTOMATIC CACHE CLEAR & RESTART SCRIPT (PowerShell)
# ════════════════════════════════════════════════════════════════════════════════

Write-Host "`n🔧 STARTING AUTOMATIC CACHE CLEAR & RESTART...`n" -ForegroundColor Cyan

# Step 1: Kill all node processes
Write-Host "⏹️  Killing all Node.js processes..." -ForegroundColor Yellow
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
Get-Process npm -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
Start-Sleep -Seconds 2
Write-Host "✅ Processes killed" -ForegroundColor Green

# Step 2: Delete Vite cache
Write-Host "`n🗑️  Deleting Vite cache..." -ForegroundColor Yellow
$frontendPath = "c:\Users\ACER\Crimson Event Hub\Frontend"

@(".vite", "dist", "node_modules\.vite") | ForEach-Object {
    $fullPath = Join-Path $frontendPath $_
    if (Test-Path $fullPath) {
        Remove-Item $fullPath -Recurse -Force -ErrorAction SilentlyContinue
        Write-Host "   Deleted: $_" -ForegroundColor Green
    }
}

Write-Host "✅ Vite cache deleted" -ForegroundColor Green

# Step 3: Restart Backend
Write-Host "`n🚀 Starting Backend server..." -ForegroundColor Cyan
$backendPath = "c:\Users\ACER\Crimson Event Hub\Backend"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$backendPath'; npm start"
Start-Sleep -Seconds 5

# Step 4: Restart Frontend
Write-Host "`n🚀 Starting Frontend dev server..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$frontendPath'; npm run dev -- --no-cache"

Write-Host "`n════════════════════════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "✅ Cache cleared and servers restarted!" -ForegroundColor Green
Write-Host "`n📝 NEXT STEPS:" -ForegroundColor Yellow
Write-Host "   1. Wait 5-10 seconds for both terminals to fully start"
Write-Host "   2. Close ALL browser windows/tabs"
Write-Host "   3. Clear browser cache (Ctrl+Shift+Delete → 'All time' → 'Clear data')"
Write-Host "   4. Open NEW browser window"
Write-Host "   5. Go to: http://localhost:5173"
Write-Host "   6. Hard refresh: Ctrl+Shift+R"
Write-Host "   7. Login and navigate to: Organizer → Event Management → Submit Event"
Write-Host "   8. Open DevTools (F12) and check Console for category fetch logs"
Write-Host "`n════════════════════════════════════════════════════════════════════════════════`n" -ForegroundColor Cyan

Read-Host "Press Enter to exit"
