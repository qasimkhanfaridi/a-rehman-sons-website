# Automated 1-Click Deployment to Cloudflare Pages
Write-Host "======================================" -ForegroundColor Cyan
Write-Host " Building and Deploying A. Rehman & Sons " -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan

$RepoDir = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $RepoDir

Write-Host "`n[1/2] Packaging clean website files into /dist..." -ForegroundColor Yellow
node build.js

if ($LASTEXITCODE -ne 0) {
    Write-Host "Build failed! Please check errors." -ForegroundColor Red
    exit 1
}

Write-Host "`n[2/2] Deploying /dist to Cloudflare Pages (Production)..." -ForegroundColor Yellow
npx wrangler@3 pages deploy dist --project-name=a-rehman-sons --branch=main

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n======================================" -ForegroundColor Green
    Write-Host " SUCCESS! Website is live at: " -ForegroundColor Green
    Write-Host " https://a-rehman-sons.pages.dev " -ForegroundColor Green
    Write-Host " https://main.a-rehman-sons.pages.dev " -ForegroundColor Green
    Write-Host "======================================" -ForegroundColor Green
} else {
    Write-Host "`nDeployment error encountered." -ForegroundColor Red
}
