# 배포 준비 스크립트
# 이 스크립트는 데이터 파일을 public 폴더로 복사합니다

$sourceFile = "..\damage_mechanisms.normalized.json"
$destFile = "public\damage_mechanisms.json"

Write-Host "배포 준비 중..." -ForegroundColor Green

if (Test-Path $sourceFile) {
    Copy-Item $sourceFile -Destination $destFile -Force
    Write-Host "✓ 데이터 파일이 public 폴더에 복사되었습니다." -ForegroundColor Green
    Write-Host "  From: $sourceFile" -ForegroundColor Gray
    Write-Host "  To: $destFile" -ForegroundColor Gray
} else {
    Write-Host "✗ 소스 파일을 찾을 수 없습니다: $sourceFile" -ForegroundColor Red
    Write-Host "  현재 위치에서 실행해주세요: dm-app 폴더" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "다음 단계:" -ForegroundColor Cyan
Write-Host "1. git add ." -ForegroundColor Yellow
Write-Host "2. git commit -m 'Prepare for deployment'" -ForegroundColor Yellow
Write-Host "3. git push" -ForegroundColor Yellow
Write-Host "4. Vercel에서 배포!" -ForegroundColor Yellow

