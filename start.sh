#!/bin/bash

# Define colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to print status messages
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Navigate to the project root directory (adjust if needed)
# PROJECT_ROOT=$(dirname "$(readlink -f "$0")")
# cd "$PROJECT_ROOT"

# Check for Python installation
if ! command -v python3 &> /dev/null; then
    print_error "Python 3 is not installed. Please install Python 3 first."
    exit 1
fi

# Check for Docker and Docker Compose
if ! command -v docker &> /dev/null; then
    print_error "Docker is not installed. Please install Docker first."
    exit 1
fi

if ! command -v docker compose &> /dev/null && ! command -v docker-compose &> /dev/null && [ ! -x backend/docker-compose ]; then

    print_error "Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Step 1: Create or activate Python virtual environment
print_status "Setting up Python virtual environment..."
if [ ! -d "venv" ]; then
    python3 -m venv venv
    if [ $? -ne 0 ]; then
        print_error "Failed to create virtual environment"
        exit 1
    fi
    print_success "Virtual environment created"
else
    print_status "Virtual environment already exists"
fi

# Activate virtual environment
print_status "Activating virtual environment..."
source venv/bin/activate
if [ $? -ne 0 ]; then
    print_error "Failed to activate virtual environment"
    exit 1
fi
print_success "Virtual environment activated"

# Step 2: Install backend requirements
print_status "Installing backend requirements..."
if [ -f "backend/requirements.txt" ]; then
    pip install -r backend/requirements.txt
    if [ $? -ne 0 ]; then
        print_error "Failed to install backend requirements"
        exit 1
    fi
    print_success "Backend requirements installed"
else
    print_error "backend/requirements.txt not found"
    exit 1
fi

# Step 3: Download spaCy models
print_status "Downloading spaCy models..."
python -m spacy download en_core_web_sm
if [ $? -ne 0 ]; then
    print_error "Failed to download spaCy models"
    exit 1
fi
print_success "spaCy models downloaded"

# Step 4: Start Docker Compose in detached mode
print_status "Starting Docker Compose in detached mode..."
if [ -f "docker-compose.yml" ]; then
    # Try the newer syntax first, fallback to older if needed
   if command -v docker compose &> /dev/null; then
    docker compose up -d
elif command -v docker-compose &> /dev/null; then
    docker-compose up -d
elif [ -x backend/docker-compose ]; then
    backend/docker-compose up -d
else
    print_error "Docker Compose could not be started"
    exit 1
fi

    
    if [ $? -ne 0 ]; then
        print_error "Failed to start Docker Compose"
        exit 1
    fi
    print_success "Docker Compose started"
else
    print_error "docker-compose.yml not found"
    exit 1
fi

# Step 5: Start the backend with Uvicorn in background
print_status "Starting backend with Uvicorn..."
cd backend || {
    print_error "Backend directory not found"
    exit 1
}

# Start backend in background
nohup uvicorn app:app --port 8080 > backend.log 2>&1 &
BACKEND_PID=$!
if [ $? -ne 0 ]; then
    print_error "Failed to start backend"
    exit 1
fi
print_success "Backend started with PID: $BACKEND_PID"
cd ..

# Step 6: Install frontend dependencies
print_status "Installing frontend dependencies..."
cd frontend || {
    print_error "Frontend directory not found"
    exit 1
}
npm install
if [ $? -ne 0 ]; then
    print_error "Failed to install frontend dependencies"
    exit 1
fi
print_success "Frontend dependencies installed"

# Step 7: Start the frontend with npm
print_status "Starting frontend development server..."
npm run dev

# Cleanup on exit
print_status "Cleaning up processes..."
kill $BACKEND_PID
deactivate
cd ..

print_success "All services have been stopped"