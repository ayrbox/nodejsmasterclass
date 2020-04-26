# Homework Assignment 2

Pizza Delivery Company API.

In terminal, use following command.

```shell
$ node ./index.js
```

To run in debug mode, use following command.

```shell
$ NODE_DEBUG=app:* node ./index.js
```

By default, app will listen in `localhost:8080`.

## Create User (Register)

Create or register new user. Users are identified email so no duplicate registration is allowed.  
Return users data crated.

| Path     | Method | Secure |
| -------- | ------ | ------ |
| `/users` | POST   | false  |

```bash
curl --request POST \
  --url http://localhost:8080/users/ \
  --header 'content-type: application/json' \
  --data '{
	"email": "test.user@hotmail.com",
	"name": "Test User",
	"phone": "0751345667",
	"address": "Test Street, London",
	"password": "Password1!"
}'
```

## Get User

Get user account information. User must have valid token to get data.  
Returns users account data.

| Path     | Method | Secure |
| -------- | ------ | ------ |
| `/users` | GET    | true   |

```bash
curl --request GET \
  --url 'http://localhost:8080/users/?email=test.user%40hotmail.com' \
  --header 'token: 329467891144628052c50423242ca8d9532a0d57a1385f6134d50ee26a6a42cc'
```

## Update Account

Update user account information.  
Returns updated account information.

| Path     | Method | Secure |
| -------- | ------ | ------ |
| `/users` | PUT    | true   |

```bash
curl --request PUT \
  --url http://localhost:8080/users/ \
  --header 'content-type: application/json' \
  --header 'token: 329467891144628052c50423242ca8d9532a0d57a1385f6134d50ee26a6a42cc' \
  --data '{
	"name": "Updated Test User",
	"phone": "0751345667",
	"address": "Test Street, London, UK"
}'
```

## Delete Account

Delete user account permanently. This will not delete orders and token that has been created for user.

| Path     | Method | Secure |
| -------- | ------ | ------ |
| `/users` | DELETE | true   |

```bash
curl --request DELETE \
  --url 'http://localhost:8080/users?email=test.user%40hotmail.com' \
  --header 'token: 329467891144628052c50423242ca8d9532a0d57a1385f6134d50ee26a6a42cc'
```

> NOTE: If you invoke delete, you will need to create user again.

## Create Token (Login)

Create and user token.

## Get Token

## Update Token (Extend)

## Delete Token (Logout)

## Get Menus

## Get Menu

## Add Cart Item

## Update Cart Item

## Delete Cart Item

## Get Cart

## Delete Cart

## Checkout

## Data Seeder for Menu

## Token for Testing
