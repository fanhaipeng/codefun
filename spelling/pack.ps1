$workDir = $args[0]
Remove-Item -Path "$workDir\*" -Force -Recurse

Set-Location -Path ".\app";
CMD /C "vue build .\src\\App.vue"
Set-Location -Path "..";

Copy-Item -Path ".\app\dist\" -Destination "$workDir\src\app\dist" -Recurse -Force
New-Item -ItemType Directory -Force -Path "$workdir\src\server\" 
Get-Item -Path @(".\server\*.js", ".\server\*.json") | Copy-Item -Destination "$workDir\src\server\" -Force
Copy-Item -Path ".\web.config" -Destination "$workDir\src\web.config" -Force

Set-Location -Path "$workDir\src\server"
CMD /C "npm i"

Add-Type -Assembly "system.io.compression.filesystem"
$timeStamp = Get-Date -Format "yyyyMMddHHmmss";
[system.io.compression.zipfile]::CreateFromDirectory("$workDir\\src", "$workDir\\deploy$timeStamp.zip")
