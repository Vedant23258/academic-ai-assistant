#!/bin/bash
set -e

echo "Building academic-ai-assistant..."

cd frontend

echo "Installing dependencies..."
npm install

echo "Building frontend..."
npm run build

echo "Build complete!"
