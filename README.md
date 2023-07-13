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
<br><br>

# Article collection [/articles]

This is an API example describing a article API.

## Get public Articles [GET]

### Request

`GET /articles`

### Response

1- GET - Get public Articles - HTTP Response Code: **200**
```javascript
    HTTP/1.1 200
    Content-Type: application/json

    {
        [
            {
                "_id": "64ad89872c07169e8060c9f8",
                "title": "Test Title",
                "description": "Test Desc",
                "thumbnail": [
                    {
                        "url": "uploads\\thumbnail\\1689094535188.jpg",
                        "_id": "64ad89872c07169e8060c9f9"
                    },
                    {
                        "url": "uploads\\thumbnail\\1689097073530.jpg",
                        "_id": "64ad9371f587ff9592ade175"
                    }
                ],
                "createdAt": "2023-07-11T16:55:35.206Z"
            }
        ]
    }
```

2- GET - Get public Articles - HTTP Response Code: **500**
```javascript
    HTTP/1.1 500
    Content-Type: application/json

    {
        "error": "Failed to fetch articles",
    }
```
<br>

## Get public Article [GET]

### Request

`GET /articles/:id`

### Response

1- GET - Get public Article - HTTP Response Code: **200**
```javascript
    HTTP/1.1 200
    Content-Type: application/json

    {
        "_id": "64ad89872c07169e8060c9f8",
        "title": "Test Title",
        "description": "Test Desc",
        "content": "Test Content",
        "thumbnail": [
            {
                "url": "uploads\\thumbnail\\1689094535188.jpg",
                "_id": "64ad89872c07169e8060c9f9"
            },
            {
                "url": "uploads\\thumbnail\\1689097073530.jpg",
                "_id": "64ad9371f587ff9592ade175"
            }
        ],
        "images": [
            {
                "url": "uploads\\gallery\\2023-07-11\\1689094535187.jpg",
                "_id": "64ad89872c07169e8060c9fa"
            }
        ],
        "links": [
            "test 2"
        ],
        "createdAt": "2023-07-11T16:55:35.206Z",
        "isPublic": true,
        "userId": "64a433c69dd8a9a9f7d876fb",
        "__v": 3
    }
```

2- GET -  Get public Article - HTTP Response Code: **404**
```javascript
    HTTP/1.1 404 Not Found
```

3- GET - Get public Article - HTTP Response Code: **500**
```javascript
    HTTP/1.1 500
    Content-Type: application/json

    {
        "error": "Failed to fetch article",
    }
```
<br>

## Get all Articles (only accessible by admin) [GET]

### Request

`GET /articles/admin`

### Response

1- GET - Get all Articles (only accessible by admin) - HTTP Response Code: **200**
```javascript
    HTTP/1.1 200
    Content-Type: application/json

    {
        [
            {
                "_id": "64ad89872c07169e8060c9f8",
                "title": "Test Title",
                "description": "Test Desc",
                "thumbnail": [
                    {
                        "url": "uploads\\thumbnail\\1689094535188.jpg",
                        "_id": "64ad89872c07169e8060c9f9"
                    },
                    {
                        "url": "uploads\\thumbnail\\1689097073530.jpg",
                        "_id": "64ad9371f587ff9592ade175"
                    }
                ],
                "createdAt": "2023-07-11T16:55:35.206Z"
            }
        ]
    }
```

2- GET - Get all Articles (only accessible by admin) - HTTP Response Code: **403**
```javascript
    HTTP/1.1 403 Forbidden
```

3- GET - Get all Articles (only accessible by admin) - HTTP Response Code: **500**
```javascript
    HTTP/1.1 500
    Content-Type: application/json

    {
        "error": "Failed to fetch articles",
    }
```
<br>

## Get single Article (also private - only accessible by admin) [GET]

### Request

`GET /articles/:id`

### Response

1- GET - Get single Article (also private - only accessible by admin) - HTTP Response Code: **200**
```javascript
    HTTP/1.1 200
    Content-Type: application/json

    {
        "_id": "64ad89872c07169e8060c9f8",
        "title": "Test Title",
        "description": "Test Desc",
        "content": "Test Content",
        "thumbnail": [
            {
                "url": "uploads\\thumbnail\\1689094535188.jpg",
                "_id": "64ad89872c07169e8060c9f9"
            },
            {
                "url": "uploads\\thumbnail\\1689097073530.jpg",
                "_id": "64ad9371f587ff9592ade175"
            }
        ],
        "images": [
            {
                "url": "uploads\\gallery\\2023-07-11\\1689094535187.jpg",
                "_id": "64ad89872c07169e8060c9fa"
            }
        ],
        "links": [
            "test 2"
        ],
        "createdAt": "2023-07-11T16:55:35.206Z",
        "isPublic": false,
        "userId": "64a433c69dd8a9a9f7d876fb",
        "__v": 3
    }
```

2- GET - Get all Articles (only accessible by admin) - HTTP Response Code: **403**
```javascript
    HTTP/1.1 403 Forbidden
```

3- GET - Get all Articles (only accessible by admin) - HTTP Response Code: **404**
```javascript
    HTTP/1.1 404 Not Found
```

4- GET - Get public Article - HTTP Response Code: **500**
```javascript
    HTTP/1.1 500
    Content-Type: application/json

    {
        "error": "Failed to fetch article",
    }
```
<br>

## Add new Article (only accessible by admin) [POST]

### Request

`POST /articles/new`

### Response

1- POST - Add new Article (only accessible by admin) - HTTP Response Code: **201**
```javascript
    HTTP/1.1 201
    Content-Type: application/json

    {
        "_id": "64ad89872c07169e8060c9f8",
        "title": "Test Title",
        "description": "Test Desc",
        "content": "Test Content",
        "thumbnail": [
            {
                "url": "uploads\\thumbnail\\1689094535188.jpg",
                "_id": "64ad89872c07169e8060c9f9"
            },
            {
                "url": "uploads\\thumbnail\\1689097073530.jpg",
                "_id": "64ad9371f587ff9592ade175"
            }
        ],
        "images": [
            {
                "url": "uploads\\gallery\\2023-07-11\\1689094535187.jpg",
                "_id": "64ad89872c07169e8060c9fa"
            }
        ],
        "links": [
            "test 2"
        ],
        "createdAt": "2023-07-11T16:55:35.206Z",
        "isPublic": false,
        "userId": "64a433c69dd8a9a9f7d876fb",
        "__v": 3
    }
```

2- POST - Add new Article (only accessible by admin) - HTTP Response Code: **400**
```javascript
    HTTP/1.1 400 Bad Request
```

3- POST - Add new Article (only accessible by admin) - HTTP Response Code: **403**
```javascript
    HTTP/1.1 403 Forbidden
```

4- POST - Add new Article (only accessible by admin) - HTTP Response Code: **404**
```javascript
    HTTP/1.1 404 Not Found
```

5- POST - Add new Article (only accessible by admin) - HTTP Response Code: **500**
```javascript
    HTTP/1.1 500
    Content-Type: application/json

    {
        "error": "Failed to add new article",
    }
```
<br>

## Edit Article (only accessible by admin) [PUT]

### Request

`PUT /articles/:id`

### Response

1- PUT - Edit Article (only accessible by admin) - HTTP Response Code: **201**
```javascript
    HTTP/1.1 201
    Content-Type: application/json

    {
        "_id": "64ad89872c07169e8060c9f8",
        "title": "Test Title",
        "description": "Test Desc",
        "content": "Test Content",
        "thumbnail": [
            {
                "url": "uploads\\thumbnail\\1689094535188.jpg",
                "_id": "64ad89872c07169e8060c9f9"
            },
            {
                "url": "uploads\\thumbnail\\1689097073530.jpg",
                "_id": "64ad9371f587ff9592ade175"
            }
        ],
        "images": [
            {
                "url": "uploads\\gallery\\2023-07-11\\1689094535187.jpg",
                "_id": "64ad89872c07169e8060c9fa"
            }
        ],
        "links": [
            "test"
        ],
        "createdAt": "2023-07-11T16:55:35.206Z",
        "isPublic": true,
        "userId": "64a433c69dd8a9a9f7d876fb",
        "__v": 3
    }
```

2- PUT - Edit Article (only accessible by admin) - HTTP Response Code: **400**
```javascript
    HTTP/1.1 400 Bad Request
```

3- PUT - Edit Article (only accessible by admin) - HTTP Response Code: **403**
```javascript
    HTTP/1.1 403 Forbidden
```

4- PUT - Edit Article (only accessible by admin) - HTTP Response Code: **404**
```javascript
    HTTP/1.1 404 Not Found
```

5- PUT - Edit Article (only accessible by admin) - HTTP Response Code: **500**
```javascript
    HTTP/1.1 500
    Content-Type: application/json

    {
        "error": "Failed to update article",
    }
```
<br>

## Delete Article (only accessible by admin) [DELETE]

### Request

`DELETE /articles/:id`

### Response

1- DELETE - Delete Article (only accessible by admin) - HTTP Response Code: **200**
```javascript
    HTTP/1.1 200
    Content-Type: application/json

    {
        "message": "Article deleted successfully"
    }
```
2- DELETE - Delete Article (only accessible by admin) - HTTP Response Code: **403**
```javascript
    HTTP/1.1 403 Forbidden
```

3- DELETE - Delete Article (only accessible by admin) - HTTP Response Code: **404**
```javascript
    HTTP/1.1 404 Not Found
```

4- DELETE - Delete Article (only accessible by admin) - HTTP Response Code: **500**
```javascript
    HTTP/1.1 500
    Content-Type: application/json

    {
        "error": "Failed to update article",
    }
```
<br>

## Add images to article (only accessible by admin) [POST]

### Request

`POST /articles/:id/images`

### Response

1- POST - Add images to article (only accessible by admin) - HTTP Response Code: **201**
```javascript
    HTTP/1.1 201
    Content-Type: application/json

    {
        "_id": "64ad89872c07169e8060c9f8",
        "title": "Test Title",
        "description": "Test Desc",
        "content": "Test Content",
        "thumbnail": [
            {
                "url": "uploads\\thumbnail\\1689094535188.jpg",
                "_id": "64ad89872c07169e8060c9f9"
            },
            {
                "url": "uploads\\thumbnail\\1689097073530.jpg",
                "_id": "64ad9371f587ff9592ade175"
            }
        ],
        "images": [
            {
                "url": "uploads\\gallery\\2023-07-11\\1689094535187.jpg",
                "_id": "64ad89872c07169e8060c9fa"
            }
        ],
        "links": [
            "test"
        ],
        "createdAt": "2023-07-11T16:55:35.206Z",
        "isPublic": true,
        "userId": "64a433c69dd8a9a9f7d876fb",
        "__v": 3
    }
```

2- POST - Add images to article (only accessible by admin) - HTTP Response Code: **400**
```javascript
    HTTP/1.1 400 Bad Request
```

3- POST - Add images to article (only accessible by admin) - HTTP Response Code: **403**
```javascript
    HTTP/1.1 403 Forbidden
```

4- POST - Add images to article (only accessible by admin) - HTTP Response Code: **404**
```javascript
    HTTP/1.1 404 Not Found
```

5- POST - Add images to article (only accessible by admin) - HTTP Response Code: **500**
```javascript
    HTTP/1.1 500
    Content-Type: application/json

    {
        "error": "Failed to add image to article",
    }
```
<br>

## Delete an image from the Article (only accessible by admin) [DELETE]

### Request

`DELETE /articles/:articleId/images/:imageId`

### Response

1- DELETE - Delete an image from the Article (only accessible by admin) - HTTP Response Code: **200**
```javascript
    HTTP/1.1 200
    Content-Type: application/json

    {
        "_id": "64ad89872c07169e8060c9f8",
        "title": "Test Title",
        "description": "Test Desc",
        "content": "Test Content",
        "thumbnail": [
            {
                "url": "uploads\\thumbnail\\1689094535188.jpg",
                "_id": "64ad89872c07169e8060c9f9"
            },
            {
                "url": "uploads\\thumbnail\\1689097073530.jpg",
                "_id": "64ad9371f587ff9592ade175"
            }
        ],
        "images": [
            {
                "url": "uploads\\gallery\\2023-07-11\\1689094535187.jpg",
                "_id": "64ad89872c07169e8060c9fa"
            }
        ],
        "links": [
            "test"
        ],
        "createdAt": "2023-07-11T16:55:35.206Z",
        "isPublic": true,
        "userId": "64a433c69dd8a9a9f7d876fb",
        "__v": 3
    }
```

2- DELETE - Delete an image from the Article (only accessible by admin) - HTTP Response Code: **400**
```javascript
    HTTP/1.1 400 Bad Request
```

3- DELETE - Delete an image from the Article (only accessible by admin) - HTTP Response Code: **403**
```javascript
    HTTP/1.1 403 Forbidden
```

4- DELETE - Delete an image from the Article (only accessible by admin) - HTTP Response Code: **404**
```javascript
    HTTP/1.1 404 Not Found
```

5- DELETE - Delete an image from the Article (only accessible by admin) - HTTP Response Code: **500**
```javascript
    HTTP/1.1 500
    Content-Type: application/json

    {
        "error": "Failed to remove image from article",
    }
```
<br>

## Add thumbnail to article (only accessible by admin) [POST]

### Request

`POST /articles/:id/thumbnail`

### Response

1- POST - Add thumbnail to article (only accessible by admin) - HTTP Response Code: **201**
```javascript
    HTTP/1.1 201
    Content-Type: application/json

    {
        "_id": "64ad89872c07169e8060c9f8",
        "title": "Test Title",
        "description": "Test Desc",
        "content": "Test Content",
        "thumbnail": [
            {
                "url": "uploads\\thumbnail\\1689094535188.jpg",
                "_id": "64ad89872c07169e8060c9f9"
            },
            {
                "url": "uploads\\thumbnail\\1689097073530.jpg",
                "_id": "64ad9371f587ff9592ade175"
            }
        ],
        "images": [
            {
                "url": "uploads\\gallery\\2023-07-11\\1689094535187.jpg",
                "_id": "64ad89872c07169e8060c9fa"
            }
        ],
        "links": [
            "test"
        ],
        "createdAt": "2023-07-11T16:55:35.206Z",
        "isPublic": true,
        "userId": "64a433c69dd8a9a9f7d876fb",
        "__v": 3
    }
```

2- POST - Add thumbnail to article (only accessible by admin) - HTTP Response Code: **400**
```javascript
    HTTP/1.1 400 Bad Request
```

3- POST - Add thumbnail to article (only accessible by admin) - HTTP Response Code: **403**
```javascript
    HTTP/1.1 403 Forbidden
```

4- POST - Add thumbnail to article (only accessible by admin) - HTTP Response Code: **404**
```javascript
    HTTP/1.1 404 Not Found
```

5- POST - Add thumbnail to article (only accessible by admin) - HTTP Response Code: **500**
```javascript
    HTTP/1.1 500
    Content-Type: application/json

    {
        "error": "Failed to add thumbnail to article",
    }
```
<br>

## Delete an thumbnail from the Article (only accessible by admin) [DELETE]

### Request

`DELETE /articles/:articleId/thumbnail/:thumbnailId`

### Response

1- DELETE - Delete an thumbnail from the Article (only accessible by admin) - HTTP Response Code: **200**
```javascript
    HTTP/1.1 200
    Content-Type: application/json

    {
        "_id": "64ad89872c07169e8060c9f8",
        "title": "Test Title",
        "description": "Test Desc",
        "content": "Test Content",
        "thumbnail": [
            {
                "url": "uploads\\thumbnail\\1689094535188.jpg",
                "_id": "64ad89872c07169e8060c9f9"
            },
            {
                "url": "uploads\\thumbnail\\1689097073530.jpg",
                "_id": "64ad9371f587ff9592ade175"
            }
        ],
        "images": [
            {
                "url": "uploads\\gallery\\2023-07-11\\1689094535187.jpg",
                "_id": "64ad89872c07169e8060c9fa"
            }
        ],
        "links": [
            "test"
        ],
        "createdAt": "2023-07-11T16:55:35.206Z",
        "isPublic": true,
        "userId": "64a433c69dd8a9a9f7d876fb",
        "__v": 3
    }
```

2- DELETE - Delete an thumbnail from the Article (only accessible by admin) - HTTP Response Code: **400**
```javascript
    HTTP/1.1 400 Bad Request
```

3- DELETE - Delete an thumbnail from the Article (only accessible by admin) - HTTP Response Code: **403**
```javascript
    HTTP/1.1 403 Forbidden
```

4- DELETE - Delete an thumbnail from the Article (only accessible by admin) - HTTP Response Code: **404**
```javascript
    HTTP/1.1 404 Not Found
```

5- DELETE - Delete an thumbnail from the Article (only accessible by admin) - HTTP Response Code: **500**
```javascript
    HTTP/1.1 500
    Content-Type: application/json

    {
        "error": "Failed to remove thumbnail from article",
    }
```
<br>

## Change article to public (only accessible by admin) [PUT]

### Request

`PUT /articles/:id/public`

### Response

1- PUT - Change article to public (only accessible by admin) - HTTP Response Code: **201**
```javascript
    HTTP/1.1 201
    Content-Type: application/json

    {
        "_id": "64ad89872c07169e8060c9f8",
        "title": "Test Title",
        "description": "Test Desc",
        "content": "Test Content",
        "thumbnail": [
            {
                "url": "uploads\\thumbnail\\1689094535188.jpg",
                "_id": "64ad89872c07169e8060c9f9"
            },
            {
                "url": "uploads\\thumbnail\\1689097073530.jpg",
                "_id": "64ad9371f587ff9592ade175"
            }
        ],
        "images": [
            {
                "url": "uploads\\gallery\\2023-07-11\\1689094535187.jpg",
                "_id": "64ad89872c07169e8060c9fa"
            }
        ],
        "links": [
            "test"
        ],
        "createdAt": "2023-07-11T16:55:35.206Z",
        "isPublic": true,
        "userId": "64a433c69dd8a9a9f7d876fb",
        "__v": 3
    }
```

2- PUT - Change article to public (only accessible by admin) - HTTP Response Code: **400**
```javascript
    HTTP/1.1 400 Bad Request
```

3- PUT - Change article to public (only accessible by admin) - HTTP Response Code: **403**
```javascript
    HTTP/1.1 403 Forbidden
```

4- PUT - Change article to public (only accessible by admin) - HTTP Response Code: **404**
```javascript
    HTTP/1.1 404 Not Found
```

5- PUT - Change article to public (only accessible by admin) - HTTP Response Code: **500**
```javascript
    HTTP/1.1 500
    Content-Type: application/json

    {
        "error": "Failed to change article to public",
    }
```
<br>

## Change article to private (only accessible by admin) [PUT]

### Request

`PUT /articles/:id/private`

### Response

1- PUT - Change article to private (only accessible by admin) - HTTP Response Code: **201**
```javascript
    HTTP/1.1 201
    Content-Type: application/json

    {
        "_id": "64ad89872c07169e8060c9f8",
        "title": "Test Title",
        "description": "Test Desc",
        "content": "Test Content",
        "thumbnail": [
            {
                "url": "uploads\\thumbnail\\1689094535188.jpg",
                "_id": "64ad89872c07169e8060c9f9"
            },
            {
                "url": "uploads\\thumbnail\\1689097073530.jpg",
                "_id": "64ad9371f587ff9592ade175"
            }
        ],
        "images": [
            {
                "url": "uploads\\gallery\\2023-07-11\\1689094535187.jpg",
                "_id": "64ad89872c07169e8060c9fa"
            }
        ],
        "links": [
            "test"
        ],
        "createdAt": "2023-07-11T16:55:35.206Z",
        "isPublic": false,
        "userId": "64a433c69dd8a9a9f7d876fb",
        "__v": 3
    }
```

2- PUT - Change article to private (only accessible by admin) - HTTP Response Code: **400**
```javascript
    HTTP/1.1 400 Bad Request
```

3- PUT - Change article to private (only accessible by admin) - HTTP Response Code: **403**
```javascript
    HTTP/1.1 403 Forbidden
```

4- PUT - Change article to private (only accessible by admin) - HTTP Response Code: **404**
```javascript
    HTTP/1.1 404 Not Found
```

5- PUT - Change article to private (only accessible by admin) - HTTP Response Code: **500**
```javascript
    HTTP/1.1 500
    Content-Type: application/json

    {
        "error": "Failed to change article to private",
    }
```
<br>

