## Local Retail Project - Server

### Routes available

GET:

- /company : get list of all registerd companies
  - params: query (optional): get list of companies which matches the query
- /products: get list of all added products
  - params: query (optional): get list of products which matches the query

POST:

- /company : get list of all registerd companies
  - params: company object (required): register/add company to db
- /products: get list of all added products
  - params: productItems[] (required):add list of productItems to db

The schemas for both Company and Product can be found in schemas folder

### Prerequisites:

- Create a .env file in root directory similar to the .env.sample file and paste the token for dev DB URI
