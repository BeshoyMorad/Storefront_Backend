# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

| Action | Endpoint | Method |
| ----- | ---- | ---- |
| Index | /api/products | GET |
| Show | /api/products/:id | GET |
| Create | /api/products | POST |
| Top 5 most popular products | /api/top_five_products | GET |
| Products by category (args: product category) | /api/products/:category | GET |

#### Users
| Action | Endpoint | Method |
| ----- | ---- | ---- |
| Index [token required] | /api/users | GET |
| Show [token required] | /api/users/:id | GET |
| Create [token required] | /api/users | POST |

#### Orders

| Action | Endpoint | Method |
| ----- | ---- | ---- |
| Current Order by user (args: user id)[token required] | /api/orders/:user_id | GET |
| Completed Orders by user (args: user id)[token required] | /api/completed-orders/:user_id | GET |

## Data Shapes

| Table | Data | Primary Key |
| ----- | ---- | ----------- |
| products | id: number, name: varchar, price: number, category: varchar | id |
| users | id: number, firstName: varchar, lastName: varchar, password: varchar | id |
| orders | id: number, user_id: number [foreign key to users table], status: varchar | id |
| orders_products | product_id: number [foreign key to products table], order_id: number [foreign key to orders table], quantity: number | (product_id, order_id) |

#### Product

- id
- name
- price
- [OPTIONAL] category

#### User

- id
- firstName
- lastName
- password

#### Orders

- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)
