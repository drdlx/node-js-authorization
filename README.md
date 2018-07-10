# nodejs-authorization token app
A simple app that returns token based on Mongo-DB with users

# database structure
| Field | Description |
| ------ | ------ |
| Username | User's name |
| Password | Password hashed with bcryptjs library |

**hashing parameters**
```bcrypt.hashSync(req.body.password, 8)```

# Register
```/api/register``` registers user in database

**request structure**
| Field | Description |
| ------ | ------ |
| Username | User's name |
| Password | User's password |

# Autorization
```/api/auth/me```checks user's token

**request structure**
| Field | Description |
| ------ | ------ |
| x-access-token | User's token |

#Logging in
```/api/auth/login``` logins via username and password returns token to user

**request structure**
| Field | Description |
| ------ | ------ |
| Username | User's name |
| Password | Password |

# Logging out
```/api/auth/logout``` destroys user's token
Nothing else is required in this request