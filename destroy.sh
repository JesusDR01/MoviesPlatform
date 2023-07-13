#!/bin/bash

cd backend

docker compose down

cd ../frontend 

docker rmi frontend --force  

