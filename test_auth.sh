#!/bin/bash

echo "Testing Mind Map Generator Login"
echo "================================"

# Test signup first
echo "1. Testing signup..."
signup_response=$(curl -s -X POST http://127.0.0.1:8000/api/register/ \
  -H "Content-Type: application/json" \
  -d '{"username": "testuser2", "email": "test2@example.com", "password": "testpass123"}')

echo "Signup response: $signup_response"

# Test login
echo -e "\n2. Testing login..."
login_response=$(curl -s -X POST http://127.0.0.1:8000/api/login/ \
  -H "Content-Type: application/json" \
  -d '{"username": "testuser2", "password": "testpass123"}' \
  -c cookies.txt \
  -w "HTTP Status: %{http_code}\n")

echo "Login response: $login_response"

# Test from frontend origin with CORS
echo -e "\n3. Testing with CORS headers (simulating frontend)..."
cors_response=$(curl -s -X POST http://127.0.0.1:8000/api/login/ \
  -H "Content-Type: application/json" \
  -H "Origin: http://localhost:5173" \
  -d '{"username": "testuser2", "password": "testpass123"}' \
  -c cookies.txt \
  -w "HTTP Status: %{http_code}\n")

echo "CORS response: $cors_response"

echo -e "\n4. Testing profile endpoint with session..."
profile_response=$(curl -s -X GET http://127.0.0.1:8000/api/profile/ \
  -H "Origin: http://localhost:5173" \
  -b cookies.txt \
  -w "HTTP Status: %{http_code}\n")

echo "Profile response: $profile_response"
