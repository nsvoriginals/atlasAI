# AtlasAI



## 🚀 Overview

AtlasAI is a comprehensive career advancement platform that started as an automated interview question generator and has expanded to include ATS tracking, resume building, and a complete job portal. Powered by Groq API for LLM-based tasks, AtlasAI helps job seekers prepare for interviews, optimize their resumes, and track applications while assisting employers in finding the right talent.

## ✨ Features

- **Interview Preparation**
  - AI-generated interview questions tailored to specific roles
  - Mock interview simulations with real-time feedback
  - Industry-specific question banks

- **Resume Building**
  - ATS-optimized resume templates
  - Content suggestions based on job descriptions
  - Keyword optimization for higher match rates

- **ATS Tracking**
  - Application status monitoring
  - Automated follow-up reminders
  - Performance analytics across applications

- **Job Portal**
  - Intelligent job matching
  - Employer dashboards
  - Candidate profiles

## 🛠️ Tech Stack

### Frontend
- React.js
- Jotai (state management)
- React Router DOM
- Framer Motion & GSAP (animations)
- Tailwind CSS

### Backend
- FastAPI
- PostgreSQL
- SQLAlchemy ORM
- Groq API integration
- JWT authentication

### DevOps
- Docker
- Docker Compose
- CI/CD pipelines

## 📋 Prerequisites

- Node.js (v18+)
- Python (v3.9+)
- Docker and Docker Compose
- Groq API key

## 🚀 Getting Started

### Clone the Repository

```bash
git clone https://github.com/yourusername/atlas-ai.git
cd atlas-ai
```

### Environment Configuration

1. Create environment files:

```bash
# In the root directory
cp .env.example .env

# Configure environment variables
nano .env
```

2. Set up your environment variables:

```
# API Keys
GROQ_API_KEY=your_groq_api_key

# Database Configuration
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_secure_password
POSTGRES_DB=atlasai
POSTGRES_HOST=postgres

# JWT Configuration
JWT_SECRET=your_jwt_secret
JWT_ALGORITHM=HS256
JWT_EXPIRATION=3600

# Frontend Configuration
REACT_APP_API_URL=http://localhost:8000
```

### Using the Quick Start Script

We've created a wrapper script to simplify running all services:

```bash
# Make the script executable
chmod +x run.sh

# Start all services in development mode
./run.sh dev

# Start all services in production mode
./run.sh prod
```

### Manual Setup

#### Start with Docker Compose

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f
```

#### Frontend Development (without Docker)

```bash
cd frontend
npm install
npm start
```

#### Backend Development (without Docker)

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

## 📁 Project Structure

```
atlas-ai/
├── .github/            # GitHub workflows and templates
├── .gitignore          # Git ignore file
├── docker-compose.yml  # Docker Compose configuration
├── run.sh              # Wrapper script to run all services
├── backend/            # FastAPI backend
│   ├── app/
│   │   ├── api/        # API endpoints
│   │   ├── core/       # Core configurations
│   │   ├── db/         # Database models and migrations
│   │   ├── schemas/    # Pydantic schemas
│   │   ├── services/   # Business logic
│   │   └── main.py     # Application entry point
│   ├── requirements.txt
│   └── Dockerfile
├── frontend/           # React frontend
│   ├── public/
│   ├── src/
│   │   ├── assets/     # Static assets
│   │   ├── components/ # React components
│   │   ├── context/    # React context
│   │   ├── hooks/      # Custom hooks
│   │   ├── pages/      # Page components
│   │   ├── services/   # API services
│   │   ├── store/      # Jotai state management
│   │   ├── styles/     # Global styles
│   │   ├── utils/      # Utility functions
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── Dockerfile
└── README.md           # This file
```

## 🔧 Configuration Options

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `GROQ_API_KEY` | API key for Groq API | - |
| `POSTGRES_USER` | PostgreSQL username | `postgres` |
| `POSTGRES_PASSWORD` | PostgreSQL password | - |
| `POSTGRES_DB` | PostgreSQL database name | `atlasai` |
| `POSTGRES_HOST` | PostgreSQL host | `postgres` |
| `JWT_SECRET` | Secret key for JWT | - |
| `JWT_ALGORITHM` | Algorithm for JWT | `HS256` |
| `JWT_EXPIRATION` | JWT expiration in seconds | `3600` |

## 🧪 Testing

```bash
# Backend tests
cd backend
pytest

# Frontend tests
cd frontend
npm test
```

## 🚀 Deployment

### Production Deployment

1. Build and deploy using Docker Compose:

```bash
docker-compose -f docker-compose.prod.yml up -d
```

2. Or use the wrapper script:

```bash
./run.sh prod
```

### Scaling

AtlasAI is designed to scale horizontally. For larger deployments, consider:

- Using Kubernetes for container orchestration
- Implementing Redis for caching
- Setting up a load balancer
- Optimizing database queries with indexes

## 📈 Monitoring

- Health endpoints are available at `/health`
- Prometheus metrics can be accessed at `/metrics`

## 🔐 Security

- All endpoints are secured with JWT authentication
- Passwords are hashed using bcrypt
- API rate limiting is implemented
- CORS is configured for frontend domains only

## 📄 API Documentation

API documentation is available at `/docs` or `/redoc` when the server is running.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- [Sheshi Vardhan](https://github.com/nsvoriginals) - Project Lead & Full Stack Developer

- [Jayanth](https://github.com/nsvoriginals) - Backend Developer

- [Mohan Vamsi](https://github.com/nsvoriginals) - ML Developer
- [Pruthvidhar Reddy](https://github.com/nsvoriginals) - Frontend Developer

- [Syanthan](https://github.com/nsvoriginals)  - UI/UX

## 🙏 Acknowledgements

- [Groq](https://groq.com/) for their powerful API
- Open source community for various libraries and tools
- All contributors who have helped shape this project

---


---



Made with ❤️ by the AtlasAI Team