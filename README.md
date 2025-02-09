# VMB (Vehicle Management Backend)

## Prerequisites
- Node.js 18 or higher
- npm or yarn
- Docker Desktop (optional, for Docker setup)
- Git

## Local Setup

### Option 1: Traditional Setup

1. Clone the repository
```bash
git clone https://github.com/your-username/vmb.git
cd vmb
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
# Create a .env file in the root directory
cp .env.example .env

# Add the following variables to .env
JWT_SECRET=your_jwt_secret_key
```

4. Run the application
```bash
# Development mode
npm run start:dev

# Production mode
npm run build
npm run start:prod
```

### Option 2: Docker Setup

1. Clone the repository
```bash
git clone https://github.com/your-username/vmb.git
cd vmb
```

2. Set up environment variables
```bash
# Create a .env file in the root directory
cp .env.example .env

# Add the following variables to .env
JWT_SECRET=your_jwt_secret_key
```

3. Run with Docker Compose
```bash
docker-compose up
```

Or build and run the Docker container manually:
```bash
docker build -t vmb-app .
docker run -p 3000:3000 vmb-app
```

## API Documentation
Once the application is running, you can access the Swagger documentation at:
```
http://localhost:3000/api
```

## Available Endpoints

### Authentication
- POST /auth/register - Register a new user
- POST /auth/login - Login user

### Users (Protected Routes)
- GET /users - Get all users
- GET /users/:id - Get user by ID
- PATCH /users/:id - Update user
- DELETE /users/:id - Delete user
- GET /users/profile - Get current user profile

## Testing
```bash
# Run unit tests
npm run test

# Run e2e tests
npm run test:e2e

# Run test coverage
npm run test:cov
```

## Development Guidelines

### Git Workflow
1. Create a new branch for your feature
```bash
git checkout -b feature/your-feature-name
```

2. Make your changes and commit
```bash
git add .
git commit -m "Description of your changes"
```

3. Push your branch and create a Pull Request
```bash
git push origin feature/your-feature-name
```

### Code Style
- Follow the existing code style
- Use TypeScript features appropriately
- Add comments for complex logic
- Keep functions small and focused

## Troubleshooting

### Common Issues

1. Port 3000 already in use
```bash
# Kill the process using port 3000
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

2. Database connection issues
- Ensure your database credentials are correct in .env
- Check if your database server is running

3. JWT token issues
- Ensure JWT_SECRET is properly set in .env
- Check if the token is properly formatted in requests: `Bearer <token>`

### Getting Help
If you encounter any issues:
1. Check the troubleshooting section above
2. Look for similar issues in the GitHub repository
3. Create a new issue with:
   - Description of the problem
   - Steps to reproduce
   - Expected vs actual behavior
   - Environment details

## Contributing
1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License
[Add your license information here]