-- Create database (run in psql)
CREATE DATABASE mini_project;

-- Connect to database and create table
\c mini_project

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    age INTEGER CHECK (age >= 0 AND age <= 120)
);