
# Use the official Python 3.12 base image
FROM python:3.12-slim

# Set the working directory
WORKDIR /app

# Copy app.py to the working directory
COPY app.py /app

# Install dependencies
# psycopg2 requires some system dependencies, so we install them first
RUN apt-get update && \
    apt-get install -y --no-install-recommends gcc libpq-dev && \
    python -m pip install --upgrade pip && \
    pip install flask psycopg2 && \
    apt-get purge -y --auto-remove gcc && \
    rm -rf /var/lib/apt/lists/*

# Expose port 5000 for Flask
EXPOSE 5000

# Set the default command to run the Flask app
CMD ["python", "app.py"]
