# Bun Fullstack Setup

This repository provides a fullstack boilerplate powered by [Bun](https://bun.sh/), featuring Docker support for streamlined setup. The frontend resides in the `/client` folder, while the backend API is located in `/api`.

## Features

- **Bun**: Fast JavaScript runtime for server-side and tooling.
- **React**: Modern frontend framework for building user interfaces.
- **Hono**: Fast, lightweight web framework for the backend API.
- **PostgreSQL**: Robust relational database for data persistence.
- **Fullstack**: Includes both backend (`/api`) and frontend (`/client`) setup.
- **Modern Tooling**: Uses Bun for package management, scripts, and development server.
- **Dockerized**: Simple containerized development.

## Prerequisites

- [Bun](https://bun.sh/docs/installation) installed globally (for local development).
- [Docker](https://www.docker.com/get-started) installed (recommended for all environments).
- [PostgreSQL](https://www.postgresql.org/) Database server running in docker.
- Git (for cloning the repository).

## Installation

### Using Docker (Recommended)

```sh
git clone https://github.com/your-username/bun-setup.git
cd your-repo-name
docker compose up --build
```

### Local Development (without Docker)

```sh
git clone https://github.com/your-username/bun-setup.git
cd your-repo-name
bun install
```

## Usage

### Development

- **With Docker:**  
  The app will be available after running `docker compose up --build`.

- **Without Docker:**  
  ```sh
  bun run dev
  ```

### Production

- **With Docker:**  
  Todo

- **Without Docker:**  
  ```sh
  bun run build
  bun run start
  ```

## Project Structure

- `/app/src/client` - React frontend application source code.
- `/app/src/api` - Hono backend API source code.
- `/app/public` - Static assets.
- `package.json` - Project metadata and scripts.
- `docker-compose.yml` - Docker configuration with PostgreSQL database.
- `Dockerfile` - Container configuration for the application.

## Tech Stack

- **Runtime**: Bun - Fast JavaScript runtime
- **Frontend**: React 19 with TypeScript
- **Backend**: Hono - Fast web framework
- **Database**: PostgreSQL
- **Containerization**: Docker & Docker Compose
- **Development**: Hot Module Replacement (HMR) support

## Scripts

- `dev`: Start the development server.
- `build`: Build the project for production.
- `start`: Start the production server.

## License

MIT
