# Node.js, Express & MySQL CRUD Practice

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![EJS](https://img.shields.io/badge/EJS-B4CA65?style=for-the-badge&logo=ejs&logoColor=black)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![Faker](https://img.shields.io/badge/-Faker.js-6CC24A?style=for-the-badge&logo=npm&logoColor=white)

A server-side rendered web application built to practice connecting a **Node.js/Express** backend to a **MySQL** database, generating fake data with **Faker.js**, and performing CRUD-style operations through **EJS** templates.

## Features

* **Home Page (`GET /`)**: Queries the database and displays the total number of users stored in the `user` table (`home.ejs`).
* **View All Users (`GET /user`)**: Fetches every record from the database and renders them in a list (`showusers.ejs`).
* **Edit User Form (`GET /user/:id/edit`)**: Loads a specific user by `id` and shows a form to update the username (`edit.ejs`).
* **Update Username (`PATCH /user/:id`)**: Verifies the password entered in the form against the database; if it matches, the username is updated and the user is redirected to `/user`. Otherwise a "Wrong Password" message is shown. Uses `method-override` to send `PATCH` from an HTML form.
* **Fake Data Generation**: A `getRandomUser()` helper uses `@faker-js/faker` to generate random users (UUID, username, email, password) for seeding the database.

## Database Schema

```sql
create table user (
    id varchar(50) primary key,
    username varchar(50) unique,
    email varchar(50) unique,
    password varchar(50) not null
);
```

## Project Structure

```text
node_sql/
├── views/
│   ├── edit.ejs            # Form template for editing a user's username
│   ├── home.ejs            # Landing page showing the total user count
│   └── showusers.ejs       # Table/list of all users
├── index.js                # Main Express server, DB connection & routes
└── schema.sql              # SQL script to create the user table
```

## Installation & Setup

To run this project locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/mikail-munshi/node_sql.git
   ```

2. **Navigate into the project directory:**
   ```bash
   cd node_sql
   ```

3. **Initialize npm & install dependencies:**
   Since `package.json` is not included in the repository, initialize the project and install the required packages (`express`, `ejs`, `mysql2`, `method-override`, `@faker-js/faker`):
   ```bash
   npm init -y
   npm install express ejs mysql2 method-override @faker-js/faker
   ```

4. **Set up the database:**
   Make sure MySQL is installed and running, then create the database and table:
   ```sql
   CREATE DATABASE delta_app;
   USE delta_app;
   SOURCE schema.sql;
   ```

5. **Configure the connection:**
   Update the credentials in the `mysql.createConnection({...})` block of `index.js` (`host`, `user`, `database`, `password`) to match your local MySQL setup.

6. **(Optional) Seed fake users:**
   Uncomment the `INSERT` query and the loop that calls `getRandomUser()` in `index.js` to insert 100 random users, then run the server once.

7. **Start the server:**
   ```bash
   node index.js
   ```
   *(Note: If you have `nodemon` installed, you can run `nodemon index.js` for automatic server restarts during development.)*

8. **View the application:**
   Open your browser and navigate to `http://localhost:8080` (or the specific port configured in your `index.js` file).

## Project Learnings

Building this project provided hands-on experience with:

* Connecting a Node.js application to a MySQL database using the `mysql2` package.
* Writing SQL queries (`SELECT`, `UPDATE`, `COUNT`) and handling their callbacks and results in Express routes.
* Generating realistic dummy data with `@faker-js/faker` and bulk-inserting it using `INSERT ... VALUES ?`.
* Rendering database results dynamically in EJS templates.
* Using `method-override` to handle `PATCH` requests directly from standard HTML forms.
* Parsing incoming URL-encoded form data (`express.urlencoded({ extended: true })`).
* Passing dynamic route parameters (`req.params`) into database queries.
