# Recipe App - Docker Deployment

## Prerequisites
- Docker Desktop installed
- Docker Compose installed

## Quick Start

1. **Clone the repository:**
   ```bash
   git clone https://github.com/bbeys/RecipeApp.git
   cd RecipeApp
   ```

2. **Start the application:**
   ```bash
   docker-compose up -d
   ```

3. **Access the application:**
   - Open browser: http://localhost:3000
   - MySQL database will be automatically initialized with sample data

4. **Stop the application:**
   ```bash
   docker-compose down
   ```

## Login Credentials

**Admin Account:**
- Email: priya@example.com
- Password: adminpass

**User Accounts:**
- sara@example.com / sarapass
- john.doe@example.com / password
- jane.smith@example.com / password

## Architecture

- **Backend:** Node.js with Express.js
- **Database:** MySQL 8.0
- **Template Engine:** Pug
- **Architecture:** MVC with OOP principles

## Services

- **app:** Node.js application (Port 3000)
- **mysql:** MySQL database (Port 3306)

## Features

- User authentication (login/logout)
- Role-based access (Admin/User)
- Recipe browsing with filters
- CRUD operations for recipes (Admin)
- Favorite recipes management (Users)
- User profile management

## Development

To run in development mode:
```bash
npm install
node app.js
```

Make sure MySQL is running locally with the Recipio database imported.
