# Pocket Memory: A gallery App

Your one-stop solution for organizing and storing memories!

# How to run this project?

First, clone the repository,

```
git clone https://github.com/mrinjamul/pocket-memory
```

```
cd pocket-memory
```

Install npm packages,

```
npm install
```

Copy environment file,

```
cp .env{.example,}
```

Fill the environment files with the required values.

To run the backend server,

```
npm run dev
```

Now, Install the frontend npm packages

```
cd ui && npm install
```

Copy environment file,

```
cp .env{.example,}
```

Run the frontend,

```
npm run dev
```

# API documentations

## Authentication Endpoints

### Sign Up

- **Method:** POST
- **Endpoint:** /auth/signup
- **Description:** Register a new user.
- **Request Body:**

  - `name`: (string): Full name
  - `username` (string, required): Username of the user.
  - `email` (string, required): Email address of the user.
  - `password` (string, required): Password for the user account.

  Example,

```
{
	"name":"Injamul M.",
	"username":"injamul",
	"email":"injamul@example.com",
	"password":"password"
}
```

- **Response:**
  - `status`: (boolean): status of the request
  - `data`(object): return the user data (object).

### Login

- **Method:** POST
- **Endpoint:** /auth/login
- **Description:** Log in an existing user.
- **Request Body:**
  - `username` (string, required): Username of the user.
  - `email`: (string): Email of the user.
  - `password` (string, required): Password for the user account.

Example,

```
{
	"username":"injamul",
	"password":"password"
}
```

- **Response:**
  - `status`: (boolean): status of the request
  - `token` (string): JWT token for authenticated access.
  - `data`(object): return the user data (object).

### Logout

- **Method:** GET
- **Endpoint:** /auth/logout
- **Description:** Log out the currently authenticated user.
- **Response:**
  - `status`: (boolean): status of the request
  - `` (string): JWT token for authenticated access.
  - `message`(string): response with message.

## User Endpoints

### Get User by Username

- **Method:** GET
- **Endpoint:** /api/v1/user/:username
- **Description:** Retrieve user details by username.
- **Parameters:**
  - `username` (string, required): Username of the user.
- **Response:**

  - `status`: (boolean): status of the request
  - `data`: (object) User object containing username, email, etc.

### Upload Avatar

- **Method:** POST
- **Endpoint:** /api/v1/avatar/upload
- **Description:** Upload a new avatar for the currently authenticated user.
- **Request Body:** Form Data
  - `avatar` (file, required): Avatar image file.
- **Authorization Header:** Bearer Token

### Get Avatar by File Name

- **Method:** GET
- **Endpoint:** /api/v1/avatar/:file
- **Description:** Retrieve the avatar image file by its filename.
- **Parameters:**
  - `file` (string, required): Name of the avatar image file.

## Picture Endpoints

### Upload Picture

- **Method:** POST
- **Endpoint:** /api/v1/picture/upload
- **Description:** Upload a new picture.
- **Request Body:** Form Data
  - `picture` (file, required): Picture image file.
- **Authorization Header:** Bearer Token

### Get All Pictures

- **Method:** GET
- **Endpoint:** /api/v1/picture
- **Description:** Retrieve all pictures.
- **Response:**
  - Array of picture objects.

### Get Pictures by User

- **Method:** GET
- **Endpoint:** /api/v1/picture/u/:username
- **Description:** Retrieve pictures uploaded by a specific user.
- **Parameters:**
  - `username` (string, required): Username of the user.
- **Response:**
  - Array of picture objects.

### Get Picture by File Name

- **Method:** GET
- **Endpoint:** /api/v1/picture/:file
- **Description:** Retrieve a picture by its filename.
- **Parameters:**
  - `file` (string, required): Name of the picture file.

### Update Picture

- **Method:** POST
- **Endpoint:** /api/v1/picture/:id
- **Description:** Update a picture by its ID.
- **Parameters:**
  - `id` (string, required): ID of the picture.
- **Request Body:**
  - Updated picture data.
- **Response:**
  - Updated picture data.
- **Authorization Header:** Bearer Token

### Delete Picture

- **Method:** DELETE
- **Endpoint:** /api/v1/picture/:id
- **Description:** Delete a picture by its ID.
- **Parameters:**
  - `id` (string, required): ID of the picture.
- **Response:**
  - Deleted picture data.
- **Authorization Header:** Bearer Token

## Copyright

Injamul Mohammad Mollah (c) 2024 mrinjamul(at)gmail(dot).com
