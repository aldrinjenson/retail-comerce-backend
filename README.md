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
- /register : register user
  - req.body: username, name(comapany name), phoneNo, locality, pinCode, district, state, password
- /login : login user
  - req.body: username, password

The schemas for both Company and Product can be found in schemas folder

### Prerequisites:

- Create a .env file in root directory similar to the .env.sample file and paste the token for dev DB URI and TOKEN_SECRET
