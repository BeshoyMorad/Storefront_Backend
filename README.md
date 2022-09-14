# Storefront_Backend

Second Project of Udacity Scholarship Advanced Full-Stack Web Development

## 📙 About

- Simple api for storefront that can provide the frontend with:
- - users info
- - products info
- - orders for each user and the products within that order

## 💻 Features

- Can request to view the data of all users, orders and products
- Can order any product [add it to the cart]
- Can request to view the products within a specific order
- Passwords are encrypted and for each request there is authentication required

## List of scripts

- npm run build

  > Compile the typescript files

- npm run dev

  > Run the server in development mode [typescript]

- npm run prod

  > Run the server in production mode [javascript]

- npm run watch

  > Starting compilation in watch mode then run the server

- npm run up:test

  > Run the migration up in the test environment

- npm run down:test

  > Run the migration down in the test environment

- npm run up:dev

  > Run the migration up in the development environment

- npm run down:dev

  > Run the migration down in the development environment

- npm run test
  > Test the models and endpoints using jasmine

## Setup and run

- Have to setup and connect to the database

> psql postgres
>
> CREATE USER full_stack_user WITH PASSWORD '123';
>
> CREATE DATABASE store_front;
>
> \c store_front
>
> GRANT ALL PRIVILEGES ON DATABASE store_front TO full_stack_user;
>
> \q
>
> CREATE DATABASE store_front_test;
>
> \c store_front_test
>
> GRANT ALL PRIVILEGES ON DATABASE store_front_test TO full_stack_user;

- Need to create a file ".env" with the following

> POSTGRES_HOST=127.0.0.1
>
> POSTGRES_PORT=5432
>
> POSTGRES_DB=store_front
>
> POSTGRES_TEST_DB=store_front_test
>
> POSTGRES_USER=full_stack_user
>
> POSTGRES_PASSWORD=123
>
> PORT=3000
>
> ENV=dev
>
> BCRYPT_PASSWORD=i-am-a-snake
>
> SALT_ROUNDS=10
>
> TOKEN_SECRET=beshoythebeaver

- Have to install all the needed packages using "npm install"

- Need to create the database using script "npm run up:dev"

- Then we are good to run the server and start testing using script "npm run dev" or "npm run prod"
