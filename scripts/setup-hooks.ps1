# PowerShell script to configure Git hooks for this repository
# Run this after cloning the repository to enable pre-push hooks

Write-Host "Setting up Git hooks..." -ForegroundColor Cyan

# Configure Git to use the .githooks directory
git config core.hooksPath .githooks

Write-Host "✅ Git hooks configured successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "The following hooks are now active:"
Write-Host "  - pre-push: Runs frontend build before pushing"
Write-Host ""
Write-Host "To bypass hooks temporarily, use: git push --no-verify"

