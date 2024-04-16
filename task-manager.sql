-- Create a database named 'login' if it doesn't exist
CREATE DATABASE IF NOT EXISTS login;

-- Use the 'login' database
USE login;

-- Create a table named 'users' to store user information
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(30) NOT NULL,
    password VARCHAR(15) NOT NULL
);

-- Add unique constraint on email to ensure no duplicate emails
ALTER TABLE users ADD CONSTRAINT unique_email UNIQUE (email);
