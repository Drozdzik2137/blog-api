# Blog API

This is an API example describing a blog API.

### Rest API Popular Endpoint Formats

> https://example.com/api/items

> https://api.example.com/v1/items


## Install

    npm install

## Run the app

    node index.js

### Endpoint format for this api

 >  http://localhost:5000/api/

 <br><br>

# User collection [/users]

This is an API example describing a user API.

## Get single User [GET]

### Request

`GET /users/:id`

### Response

1- GET - Get single user - HTTP Response Code: **200**
```javascript
    HTTP/1.1 200
    Content-Type: application/json

    {
        "_id": "64a433c69dd8a9a9f7d876fb",
        "firstName": "Test",
        "lastName": "Test",
        "email": "test@test.pl",
        "articles": [
            "64ad89542c07169e8060c9f0",
            "64ad89872c07169e8060c9f8"
        ],
        "notes": [
            "64ad957a40ccea78f97b3258"
        ],
        "createdAt": "2023-07-04T14:59:18.866Z",
        "role": 1001,
        "isActive": true,
        "__v": 46
    }
```

2- GET - Get single user - HTTP Response Code: **401**
```javascript
    HTTP/1.1 401 Unauthorized
```

3- GET - Get single user - HTTP Response Code: **403**
```javascript
    HTTP/1.1 403 Forbidden
```
4- GET - Get single user - HTTP Response Code: **404**
```javascript
    HTTP/1.1 404
    Content-Type: application/json

    {
        "error": "User not found",
    }
```

5- GET - Get single user - HTTP Response Code: **500**
```javascript
    HTTP/1.1 500
    Content-Type: application/json

    {
        "error": "Failed to fetch user data",
    }
```
<br>

## Get all Users (only accessible by admin) [GET]

### Request

`GET /users/all`

### Response

1- GET - Get all Users - HTTP Response Code: **200**
```javascript
    HTTP/1.1 200
    Content-Type: application/json

    {
        [
            {
                "_id": "64a433c69dd8a9a9f7d876fb",
                "firstName": "Test",
                "lastName": "Test",
                "email": "test@test.pl",
                "articles": [
                    "64ad89542c07169e8060c9f0",
                    "64ad89872c07169e8060c9f8"
                ],
                "notes": [
                    "64ad957a40ccea78f97b3258"
                ],
                "createdAt": "2023-07-04T14:59:18.866Z",
                "role": 1001,
                "isActive": true,
                "__v": 46
            },
            {
                "_id": "64a52f289e4ba92b3586e6b4",
                "firstName": "Test",
                "lastName": "Test",
                "email": "test2@test.pl",
                "articles": [],
                "notes": [],
                "createdAt": "2023-07-05T08:51:52.137Z",
                "role": 1,
                "isActive": true,
                "__v": 0
            }
        ]
    }
```

2- GET - Get all Users - HTTP Response Code: **401**
```javascript
    HTTP/1.1 401 Unauthorized
```

3- GET - Get all Users - HTTP Response Code: **403**
```javascript
    HTTP/1.1 403 Forbidden

    {
        "error": "No authority to perform this operation",
    }

```

4- GET - Get all Users - HTTP Response Code: **500**
```javascript
    HTTP/1.1 500
    Content-Type: application/json

    {
        "error": "Failed to fetch users data",
    }
```
<br>

## Activate User account (only accessible by admin) [PUT]

### Request

`PUT /users/activate/:userId`

### Response

1- PUT - Activate User account - HTTP Response Code: **200**
```javascript
    HTTP/1.1 200
    Content-Type: application/json

    {
        "message": "User account activated"
    }
```

2- GET - Get single user - HTTP Response Code: **401**
```javascript
    HTTP/1.1 401 Unauthorized
```

3- GET - Get single user - HTTP Response Code: **403**
```javascript
    HTTP/1.1 403 Forbidden
    Content-Type: application/json
    {
        "error": "You cannot do this!",
    }
```
4- GET - Get single user - HTTP Response Code: **404**
```javascript
    HTTP/1.1 404
    Content-Type: application/json

    {
        "error": "User not found",
    }
```

5- GET - Get single user - HTTP Response Code: **500**
```javascript
    HTTP/1.1 500
    Content-Type: application/json

    {
        "error": "Failed to activate user account",
    }
```
<br>

## Deactivate User account (only accessible by admin) [PUT]

### Request

`PUT /users/deactivate/:userId`

### Response

1- PUT - Activate User account - HTTP Response Code: **200**
```javascript
    HTTP/1.1 200
    Content-Type: application/json

    {
        "message": "User account deactivated"
    }
```

2- GET - Get single user - HTTP Response Code: **401**
```javascript
    HTTP/1.1 401 Unauthorized
```

3- GET - Get single user - HTTP Response Code: **403**
```javascript
    HTTP/1.1 403 Forbidden
    Content-Type: application/json
    {
        "error": "You cannot do this!",
    }
```
4- GET - Get single user - HTTP Response Code: **404**
```javascript
    HTTP/1.1 404
    Content-Type: application/json

    {
        "error": "User not found",
    }
```

5- GET - Get single user - HTTP Response Code: **500**
```javascript
    HTTP/1.1 500
    Content-Type: application/json

    {
        "error": "Failed to deactivate user account",
    }
```
<br>

## Change user role (only accessible by admin) [PUT]

### Request

`PUT /users/change-role/:userId`

### Response

1- PUT - Change user role - HTTP Response Code: **200**
```javascript
    HTTP/1.1 200
    Content-Type: application/json

    {
        "message": "User account deactivated"
    }
```

2- GET - Change user role - HTTP Response Code: **401**
```javascript
    HTTP/1.1 401 Unauthorized
```

3- GET - Change user role - HTTP Response Code: **403**
```javascript
    HTTP/1.1 403 Forbidden
    Content-Type: application/json
    {
        "error": "You cannot do this!",
    }
```
4- GET - Change user role - HTTP Response Code: **404**
```javascript
    HTTP/1.1 404
    Content-Type: application/json

    {
        "error": "User not found",
    }
```

5- GET - Change user role - HTTP Response Code: **500**
```javascript
    HTTP/1.1 500
    Content-Type: application/json

    {
        "error": "Failed to change user role",
    }
```
<br><br>

# Note collection [/notes]

This is an API example describing a note API.

## Get user Notes [GET]

### Request

`GET /notes`

### Response

1- GET - Get user Notes - HTTP Response Code: **200**
```javascript
    HTTP/1.1 200
    Content-Type: application/json

    {
        [
            {
                "_id": "64ad957a40ccea78f97b3258",
                "title": "Test Title 2",
                "content": "Test Content 3",
                "createdAt": "2023-07-11T17:46:34.547Z",
                "userId": "64a433c69dd8a9a9f7d876fb",
                "__v": 0
            }
        ]
    }
```

2- GET - Get user Notes - HTTP Response Code: **401**
```javascript
    HTTP/1.1 401 Unauthorized
```

3- GET - Get user Notes - HTTP Response Code: **403**
```javascript
    HTTP/1.1 403 Forbidden
```
4- GET - Get user Notes - HTTP Response Code: **404**
```javascript
    HTTP/1.1 404 Not Found
    Content-Type: application/json

    {
        "error": "Missing user ID",
    }
```

5- GET - Get user Notes - HTTP Response Code: **500**
```javascript
    HTTP/1.1 500
    Content-Type: application/json

    {
        "error": "Failed to get user notes",
    }
```
<br>

## Get single Note [GET]

### Request

`GET /notes/:noteId`

### Response

1- GET - Get single Note - HTTP Response Code: **200**
```javascript
    HTTP/1.1 200
    Content-Type: application/json

    {
        "_id": "64ad957a40ccea78f97b3258",
        "title": "Test Title 2",
        "content": "Test Content 3",
        "createdAt": "2023-07-11T17:46:34.547Z",
        "userId": "64a433c69dd8a9a9f7d876fb",
        "__v": 0
    }
```

2- GET - Get user Notes - HTTP Response Code: **401**
```javascript
    HTTP/1.1 401 Unauthorized
```

3- GET - Get user Notes - HTTP Response Code: **403**
```javascript
    HTTP/1.1 403 Forbidden
```
4- GET - Get user Notes - HTTP Response Code: **404**
```javascript
    HTTP/1.1 404 Not Found
    Content-Type: application/json
    
    {
        "error": "Note not found",
    }
```

5- GET - Get user Notes - HTTP Response Code: **500**
```javascript
    HTTP/1.1 500
    Content-Type: application/json

    {
        "error": "Failed to get note",
    }
```
<br>

## Add new note [POST]

### Request

`POST /notes/new`

### Response

1- POST - Add new note - HTTP Response Code: **201**
```javascript
    HTTP/1.1 201
    Content-Type: application/json

    {
        "_id": "64ad957a40ccea78f97b3258",
        "title": "Test Title 2",
        "content": "Test Content 3",
        "createdAt": "2023-07-11T17:46:34.547Z",
        "userId": "64a433c69dd8a9a9f7d876fb",
        "__v": 0
    }
```

2- POST - Add new note - HTTP Response Code: **401**
```javascript
    HTTP/1.1 401 Unauthorized
```

3- POST - Add new note - HTTP Response Code: **403**
```javascript
    HTTP/1.1 403 Forbidden
```
4- POST - Add new note - HTTP Response Code: **404**
```javascript
    HTTP/1.1 404 Not Found
    Content-Type: application/json
    
    {
        "error": "Missing userId or note data!",
    }
```

5- POST - Add new note - HTTP Response Code: **500**
```javascript
    HTTP/1.1 500
    Content-Type: application/json

    {
        "error": "Failed to create note",
    }
```
<br>

## Edit note [PUT]

### Request

`PUT /notes/:noteId`

### Response

1- PUT - Edit note - HTTP Response Code: **201**
```javascript
    HTTP/1.1 201
    Content-Type: application/json

    {
        "_id": "64ad957a40ccea78f97b3258",
        "title": "Test Title 2",
        "content": "Test Content 3",
        "createdAt": "2023-07-11T17:46:34.547Z",
        "userId": "64a433c69dd8a9a9f7d876fb",
        "__v": 0
    }
```

2- PUT - Edit note - HTTP Response Code: **401**
```javascript
    HTTP/1.1 401 Unauthorized
```

3- PUT - Edit note - HTTP Response Code: **403**
```javascript
    HTTP/1.1 403 Forbidden
```
4- PUT - Edit note - HTTP Response Code: **404**
```javascript
    HTTP/1.1 404 Not Found
    Content-Type: application/json
    
    {
        "error": "Missing title or content!",
    }
```

5- PUT - Edit note - HTTP Response Code: **500**
```javascript
    HTTP/1.1 500
    Content-Type: application/json

    {
        "error": "Failed to update note",
    }
```
<br>

## Delete note [DELETE]

### Request

`DELETE /notes/:noteId`

### Response

1- DELETE - Delete note - HTTP Response Code: **200**
```javascript
    HTTP/1.1 200
    Content-Type: application/json

    {
        "_id": "64ad957a40ccea78f97b3258",
        "title": "Test Title 2",
        "content": "Test Content 3",
        "createdAt": "2023-07-11T17:46:34.547Z",
        "userId": "64a433c69dd8a9a9f7d876fb",
        "__v": 0
    }
```

2- DELETE - Delete note - HTTP Response Code: **401**
```javascript
    HTTP/1.1 401 Unauthorized
```

3- DELETE - Delete note - HTTP Response Code: **403**
```javascript
    HTTP/1.1 403 Forbidden
```
4- DELETE - Delete note - HTTP Response Code: **404**
```javascript
    HTTP/1.1 404 Not Found
    Content-Type: application/json
    
    {
        "error": "Note not found",
    }
```

5- DELETE - Delete note - HTTP Response Code: **500**
```javascript
    HTTP/1.1 500
    Content-Type: application/json

    {
        "error": "Failed to delete note",
    }
```
<br>