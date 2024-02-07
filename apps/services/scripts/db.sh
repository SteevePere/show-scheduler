#!/bin/bash

# Check if Postgres server is already running on port 5432
if nc -z localhost 5432; then
  echo "Postgres server is already running. Exiting."
  exit 0
fi

# Check if a stopped Postgres container exists
if docker ps -a --filter "status=exited" --filter "name=postgres" | grep -q postgres; then
  echo "Starting the existing stopped Postgres container."
  sudo docker start postgres
else
  # Run a new Postgres container
  echo "Running a new Postgres container."
  sudo docker run --name postgres -e POSTGRES_PASSWORD=root -e POSTGRES_DB=show-scheduler -d -p 5432:5432 postgres
fi

# Wait for a moment to let Postgres start
sleep 2

# Check if the "show-scheduler" database exists in the running Postgres container
if ! sudo docker exec postgres psql -U postgres -lqt | cut -d \| -f 1 | grep -qw show-scheduler; then
  echo "Creating the 'show-scheduler' database in the existing Postgres container."
  sudo docker exec postgres createdb -U postgres show-scheduler
fi

echo "Postgres setup completed."