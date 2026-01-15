# ScaleHub

ScaleHub is a scalable, microservices-based web platform designed to support real-time applications.

## Architecture

- **Auth Service** (Port 5001): Node.js/Express service handling JWT authentication.
- **User Service** (Port 5002): Manages user profiles and data.
- **Communication Service** (Port 5003): Handles communications (email/notifications).
- **API Gateway** (Port 8000): Node.js/Express proxy routing requests to backend services.
- **Frontend** (Port 3000): React + Vite application with Tailwind CSS.
- **Database**: MongoDB instance.

## Prerequisites

- [Docker](https://www.docker.com/products/docker-desktop) installed and running.
- [Node.js](https://nodejs.org/) (optional, for local development).

## How to Run

The entire platform is containerized. You can start all services with a single command.

1.  **Clone the repository** (if you haven't already).
2.  **Start the services**:
    ```bash
    docker-compose up --build
    ```
    This command will:
    - Build the Docker images for all services.
    - Start the MongoDB container.
    - Network them together.

3.  **Access the Application**:
    - **Frontend**: Open [http://localhost:3000](http://localhost:3000) in your browser.
    - **API Gateway**: Accessible at [http://localhost:8000](http://localhost:8000).

## Services Overview

| Service | Local URL | Description |
| :--- | :--- | :--- |
| **Frontend** | `http://localhost:3000` | The user interface. |
| **API Gateway** | `http://localhost:8000` | Routes API requests. |
| **Auth Service** | `http://localhost:5001` | Handles authentication. |
| **User Service** | `http://localhost:5002` | User profile management. |
| **Communication Service** | `http://localhost:5003` | Communication handling. |

## Development

- **Stopping the app**: Press `Ctrl+C` in the terminal where Docker is running.
- **Removing containers**: `docker-compose down`
- **Rebuilding after changes**: `docker-compose up --build`
