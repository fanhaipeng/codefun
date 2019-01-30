$workDir = $args[0]

Set-Location -Path ".\app";
CMD /C "vue build .\src\\App.vue"
Set-Location -Path "..";

Remove-Item -Path $workDir -Force -Recurse
Copy-Item -Path ".\app\dist\" -Destination "$workDir\src\app\dist" -Recurse -Force
New-Item -ItemType Directory -Force -Path "$workdir\src\server\" 
Get-Item -Path @(".\server\*.js", ".\server\*.json") | Copy-Item -Destination "$workDir\src\server\" -Force
Copy-Item -Path ".\web.config" -Destination "$workDir\src\web.config" -Force

Add-Type -Assembly "system.io.compression.filesystem"
[system.io.compression.zipfile]::CreateFromDirectory("$workDir\\src", "$workDir\\deploy.zip")