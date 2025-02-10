# Create directory for lightsailctl if it doesn't exist
$lightsailPath = "C:\Program Files\Amazon\AWSCLIV2"
if (-not (Test-Path $lightsailPath)) {
    New-Item -ItemType Directory -Path $lightsailPath -Force
}

# Download lightsailctl
$url = "https://s3.us-west-2.amazonaws.com/lightsailctl/latest/windows-amd64/lightsailctl.exe"
$output = Join-Path $lightsailPath "lightsailctl.exe"
Invoke-WebRequest -Uri $url -OutFile $output

# Configure AWS CLI for Mumbai region
aws configure set default.region ap-south-1

Write-Host "Lightsail Control plugin has been installed and AWS region has been set to ap-south-1 (Mumbai)"
Write-Host "You can now proceed with deployment commands"
