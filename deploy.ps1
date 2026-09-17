# Build locally, then push to GitHub to deploy via GitHub Pages Actions
Write-Host "======================================" -ForegroundColor Cyan
Write-Host " A. Rehman & Sons — GitHub Pages Deploy " -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan

$RepoDir = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $RepoDir

Write-Host "`n[1/1] Building site into /dist (same as CI)..." -ForegroundColor Yellow
node build.js

if ($LASTEXITCODE -ne 0) {
    Write-Host "Build failed! Fix errors before pushing." -ForegroundColor Red
    exit 1
}

Write-Host "`nBuild OK. To publish, commit and push to main:" -ForegroundColor Green
Write-Host "  git add ." -ForegroundColor White
Write-Host "  git commit -m `"Describe your update`"" -ForegroundColor White
Write-Host "  git push origin main" -ForegroundColor White
Write-Host "`nLive site: https://arschemicals.com (after GitHub Actions finishes)" -ForegroundColor Green
