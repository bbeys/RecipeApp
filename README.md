# Recipio

A recipe management application built with Node.js, Express, MySQL, and Docker.

## Features

- 🔐 **User Authentication**: Login system with admin and user roles
- 🍳 **Recipe Management**: Full CRUD operations (Create, Read, Update, Delete)
- 🔍 **Search & Filter**: Search recipes by ingredients, dietary preferences, meal type, cuisine, and prep time
- ⭐ **Favorites**: Users can save their favorite recipes
- 👨‍💼 **Admin Panel**: Manage recipes and users
- 🐳 **Docker Deployment**: Containerized application with MySQL database

## Technologies

- **Backend**: Node.js 18, Express 5.1.0
- **Database**: MySQL 8.0
- **Template Engine**: Pug 3.0.3
- **Deployment**: Docker & Docker Compose
- **Architecture**: MVC + OOP pattern

## Getting Started

### Prerequisites

- Docker Desktop installed
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/bbeys/RecipeApp.git
cd RecipeApp
```

2. Start with Docker Compose:
```bash
docker-compose up -d
```

3. Access the application:
- App: http://localhost:3000
- MySQL: localhost:3307

### Demo Accounts

**Admin Account:**
- Email: priya@example.com
- Password: adminpass

**User Account:**
- Email: sara@example.com
- Password: sarapass

## Project Structure

```
recipe-app/
├── app.js                 # Main application entry
├── docker-compose.yml     # Docker services configuration
├── Dockerfile            # Node.js container setup
├── Recipio.sql           # Database schema & sample data
├── app/views/            # Pug templates
├── controllers/          # Route controllers
├── models/              # Data models (Recipe, User)
├── routes/              # Express routes
├── services/            # Database connection
└── static/              # CSS and JS files
```

## Sprint 4 Features

✅ Docker deployment with MySQL container
✅ Full CRUD operations for recipes
✅ Dropdown selections with pre-selected values
✅ Form validation and error handling
✅ User-friendly UI with responsive design

## Author

Beyza - MSc Software Development 2

## License

This project is part of academic coursework.
