#!/bin/bash

# Build the Docker image
docker build -t vmb-app .

# Install Lightsail plugin (if not already installed)
sudo curl "https://s3.us-west-2.amazonaws.com/lightsailctl/latest/linux-amd64/lightsailctl" -o "/usr/local/bin/lightsailctl"
sudo chmod +x /usr/local/bin/lightsailctl

# Push to Lightsail container service
aws lightsail push-container-image \
  --service-name vmb-service \
  --label vmb-app \
  --image vmb-app:latest

# Deploy using the container JSON file
aws lightsail create-container-service-deployment \
  --service-name vmb-service \
  --containers file://lightsail-container.json \
  --public-endpoint file://lightsail-container.json
