# Library Management System

This is a simple library management system built with Node.js and MySQL database. It allows users to manage books, borrowers, borrowing process, and generate analytical reports.

## Prerequisites

Make sure you have the following installed on your machine:

- Node.js
- MySQL

## Installation

1. Clone the repository:
```
git clone https://github.com/hagar-khaled99/library-management.git
```
2.Install dependencies
```
npm install
```
## Database Setup

1. Make sure you have MySQL installed and running on your machine.

2. Create a MySQL database for the application.

3. Configure the database connection in `config/config.json` file.

4. Run Sequelize migrations to create database tables:
```
npx sequelize-cli db:migrate
```
5.Optionally, seed the database with sample data:
```
npx sequelize-cli db:seed:all
```
Start the Node.js server:
```
npm start
```
The server should now be running on `http://localhost:7000`.
## Endpoints
you can use this collection for endpoints
https://drive.google.com/file/d/1XP8kbevhNaP5FtJk-pM_UKpx06hTVWu_/view?usp=sharing

## Using the Application

1. Use the provided endpoints to perform CRUD operations on books and borrowers.
2. Borrow and return books using the borrowing endpoints.
3. Generate analytical reports by accessing the appropriate endpoint.
4. Explore the application functionalities through the provided API collection.

 ## Database Schema
![Screenshot (269)](https://github.com/hagar-khaled99/library-management/assets/164077914/00cc821b-e658-4923-af3a-342c62f2769b)

