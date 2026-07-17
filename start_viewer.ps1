$ErrorActionPreference = 'Stop'
Set-Location -LiteralPath $PSScriptRoot
$url = 'http://localhost:8000/'
$python = (Get-Command python).Source
$server = Start-Process -FilePath $python -ArgumentList '-m','http.server','8000' -WindowStyle Hidden -PassThru
Start-Sleep -Milliseconds 800
Write-Host "第13回課題ギャラリー: $url"
Write-Host '終了するにはこのウィンドウを閉じてください。'
Start-Process $url
try { Wait-Process -Id $server.Id } finally { if (-not $server.HasExited) { Stop-Process -Id $server.Id } }
