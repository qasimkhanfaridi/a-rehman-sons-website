# Automated 1-Click Deployment to Cloudflare Pages
Write-Host "======================================" -ForegroundColor Cyan
Write-Host " Building and Deploying A. Rehman & Sons " -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan

$RepoDir = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $RepoDir

Write-Host "`n[1/2] Packaging site into /dist..." -ForegroundColor Yellow
node build.js

if ($LASTEXITCODE -ne 0) {
    Write-Host "Build failed! Please check errors." -ForegroundColor Red
    exit 1
}

Write-Host "`n[2/2] Deploying to Cloudflare Pages (global CDN, PK edge)..." -ForegroundColor Yellow
npx wrangler@3 pages deploy dist --project-name=arschemicals --branch=main

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n======================================" -ForegroundColor Green
    Write-Host " SUCCESS! Site is live at:" -ForegroundColor Green
    Write-Host " https://arschemicals.com" -ForegroundColor Green
    Write-Host " https://main.arschemicals.pages.dev" -ForegroundColor Green
    Write-Host "======================================" -ForegroundColor Green
} else {
    Write-Host "`nDeployment failed. Run: npx wrangler login" -ForegroundColor Red
    exit 1
}
