# Cricket Live

This project is a full-stack web application that provides live cricket scores and match details using a live cricket API. It consists of a backend built with Node.js and Express, and a frontend built with React.

## Project Structure

```
cricket-live
├── backend                # Backend application
│   ├── src
│   │   ├── server.ts     # Entry point for the backend application
│   │   ├── routes        # Contains route definitions
│   │   │   └── cricket.ts # Routes related to cricket data
│   │   ├── controllers   # Contains request handlers
│   │   │   └── cricketController.ts # Handles cricket data requests
│   │   ├── middleware     # Middleware functions
│   │   │   └── errorHandler.ts # Error handling middleware
│   │   └── types         # TypeScript types and interfaces
│   │       └── index.ts  # Type definitions
│   ├── package.json      # Backend dependencies and scripts
│   ├── tsconfig.json     # TypeScript configuration for the backend
│   └── .env.example      # Environment variable template
├── frontend               # Frontend application
│   ├── src
│   │   ├── components     # React components
│   │   │   ├── Header.tsx # Header component
│   │   │   ├── MatchCard.tsx # Component for displaying match info
│   │   │   └── ScoreBoard.tsx # Component for displaying scores
│   │   ├── pages          # React pages
│   │   │   ├── Home.tsx   # Home page displaying live matches
│   │   │   └── MatchDetail.tsx # Page for match details
│   │   ├── services       # API interaction functions
│   │   │   └── api.ts     # Functions for fetching data from the backend
│   │   ├── App.tsx        # Main application component
│   │   └── index.tsx      # Entry point for the frontend application
│   ├── package.json       # Frontend dependencies and scripts
│   └── tsconfig.json      # TypeScript configuration for the frontend
├── .gitignore             # Git ignore file
├── docker-compose.yml      # Docker configuration for the application
└── README.md              # Project documentation
```

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm (Node package manager)
- Docker (optional, for containerized deployment)

### Installation

1. Clone the repository:

   ```
   git clone <repository-url>
   cd cricket-live
   ```

2. Install backend dependencies:

   ```
   cd backend
   npm install
   ```

3. Install frontend dependencies:

   ```
   cd ../frontend
   npm install
   ```

### Configuration

1. Create a `.env` file in the `backend` directory based on the `.env.example` file and set your environment variables.

### Running the Application

1. Start the backend server:

   ```
   cd backend
   npm start
   ```

2. Start the frontend application:

   ```
   cd ../frontend
   npm start
   ```

3. Open your browser and navigate to `http://localhost:3000` to view the application.

### Deployment

You can deploy the application using Docker. Ensure you have Docker installed and then run:

```
docker-compose up --build
```

This will build and start both the backend and frontend services in containers.

## Usage

- The home page displays a list of live cricket matches.
- Click on a match to view detailed information and live scores.

## Contributing

Feel free to submit issues or pull requests for improvements or bug fixes. 

## License

This project is licensed under the MIT License.