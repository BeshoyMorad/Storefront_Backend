# Storefront_Backend

Second Project of Udacity Scholarship Advanced Full-Stack Web Development

CREATE USER full_stack_user WITH PASSWORD '123';
CREATE DATABASE store_front;
\c store_front
GRANT ALL PRIVILEGES ON DATABASE store_front TO full_stack_user;

CREATE DATABASE store_front_test;
\c store_front_test
GRANT ALL PRIVILEGES ON DATABASE store_front_test TO full_stack_user;
