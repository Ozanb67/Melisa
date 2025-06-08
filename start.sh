#!/bin/bash

# Debug: Print all environment variables
echo "=== Environment Variables ==="
printenv
echo "==========================="

# Set default port if not provided
PORT=${PORT:-5000}

# Validate PORT is a number between 1 and 65535
if ! [[ "$PORT" =~ ^[0-9]+$ ]] || [ "$PORT" -lt 1 ] || [ "$PORT" -gt 65535 ]; then
    echo "ERROR: Invalid PORT '$PORT'. Must be a number between 1 and 65535."
    exit 1
fi

echo "Starting server on port $PORT"
exec gunicorn --bind 0.0.0.0:$PORT app:app
