#!/bin/bash

# Set default port if not provided
PORT=${PORT:-5000}

echo "Starting server on port $PORT"
exec gunicorn --bind 0.0.0.0:$PORT app:app
