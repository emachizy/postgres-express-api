# User Management API

A RESTful API built with Node.js and Express for CRUD operations on user data, using PostgreSQL as the database. Features input validation and centralized error handling for robustness and reliability.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Example Requests](#example-requests)
- [Error Handling](#error-handling)
- [File Structure](#file-structure)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)
- [Notes](#notes)

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/user-management-api.git
   cd user-management-api
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

   **Dependencies:**

   - `express` – Web server and routing
   - `pg` – PostgreSQL client
   - `dotenv` – Environment variable management

3. **Set up environment variables:**

   - Create a `.env` file in the root directory:
     ```
     DB_USER=your_db_user
     DB_HOST=your_db_host
     DB_NAME=your_db_name
     DB_PASSWORD=your_db_password
     DB_PORT=your_db_port
     PORT=3000  # Optional, defaults to 3000
     ```

4. **Set up the database:**
   - Ensure PostgreSQL is installed and running.
   - Create a database and a `users` table:
     ```sql
     CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL
     );
     ```

## Usage

- **Start the server:**
  ```bash
  node index.js
  ```
  Or, if a start script is defined:
  ```bash
  npm start
  ```
- The server runs on the port specified in the `PORT` environment variable (default: 3000).
- Use tools like `curl` or Postman to interact with the API.

## API Endpoints

| Method | Endpoint     | Description         | Request Body                              |
| ------ | ------------ | ------------------- | ----------------------------------------- |
| GET    | `/users`     | Retrieve all users  | None                                      |
| GET    | `/users/:id` | Retrieve user by ID | None                                      |
| POST   | `/users`     | Create a new user   | `{ "name": "string", "email": "string" }` |
| PUT    | `/users/:id` | Update a user by ID | `{ "name": "string", "email": "string" }` |
| DELETE | `/users/:id` | Delete a user by ID | None                                      |

## Example Requests

- **Get all users:**

  ```bash
  curl -X GET http://localhost:3000/users
  ```

- **Create a new user:**

  ```bash
  curl -X POST http://localhost:3000/users \
     -H "Content-Type: application/json" \
     -d '{"name": "John Doe", "email": "john@example.com"}'
  ```

- **Update a user:**

  ```bash
  curl -X PUT http://localhost:3000/users/1 \
     -H "Content-Type: application/json" \
     -d '{"name": "Jane Doe", "email": "jane@example.com"}'
  ```

- **Delete a user:**
  ```bash
  curl -X DELETE http://localhost:3000/users/1
  ```

## Error Handling

- **Validation Errors:** 400 status if name or email is missing or invalid.
- **Duplicate Email:** 409 status if the email already exists.
- **Invalid ID:** 400 status for invalid ID formats.
- **Not Found:** 404 status if a user or endpoint is not found.
- **Server Errors:** 500 status for unexpected errors.

## File Structure

```
index.js                  # Main entry point
routes/users.js           # User-related routes
controllers/users.js      # User operation logic
middlewares/validation.js # Input validation middleware
middlewares/errorHandler.js # Centralized error handling
config/db.js              # PostgreSQL connection config
```

## Contributing

- Fork the repository.
- Create a new branch for your changes.
- Submit a pull request with a clear description.

Please follow best practices for Node.js and Express development.

## License

Licensed under the MIT License. See [LICENSE.md](LICENSE.md) for details.

## Contact

For questions or feedback, contact [@Emachi_s](https://x.com/Emachi_s) on X.

## Notes

- This is a basic implementation; consider adding authentication, logging, or advanced error handling for production.
- Ensure `package.json` includes all dependencies.
- Verify PostgreSQL is configured with correct credentials and schema before running the application.er Management API
