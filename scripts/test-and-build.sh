#!/bin/bash

# Exit on any error
set -e

# Load environment variables from .env.production
if [ -f .env.production ]; then
  export $(cat .env.production | grep -v '^#' | xargs)
fi

# Run tests
echo "Running tests..."
npm test

# If tests pass, build Docker image
if [ $? -eq 0 ]; then
  echo "Tests passed! Building Docker image..."
  docker build \
    --build-arg NEXT_PUBLIC_SECRET=${NEXT_PUBLIC_SECRET:-default_value} \
    -t test-next-app:latest \
    .
  
  echo "Docker image built successfully!"
else
  echo "Tests failed! Docker image will not be built."
  exit 1
fi 