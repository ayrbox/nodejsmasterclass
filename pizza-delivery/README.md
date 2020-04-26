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

**Data Seeder for Menu**
For menu script is created for seeding data. The script generates pizza menu with options.

```bash
node seeder/index.js
```

> **Warning**: If run twice will generates duplicate items. Only use if menu data folder is empty.

**Token for Testing**

`329467891144628052c50423242ca8d9532a0d57a1385f6134d50ee26a6a42cc` in sample curl script is specificaly generated with
expiry date for 1 year to help easily test.

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

Create token for authenticated login.

```bash
curl --request POST \
  --url http://localhost:8080/tokens \
  --header 'content-type: application/json' \
  --data '{
	"email": "test.user@hotmail.com",
	"password": "Password1!"
}'
```

## Get Token

Get detail about user token. Returns token `id`, user email and expiry time.

```bash
curl --request GET \
  --url 'http://localhost:8080/tokens?token=329467891144628052c50423242ca8d9532a0d57a1385f6134d50ee26a6a42cc' \
  --header 'token: 329467891144628052c50423242ca8d9532a0d57a1385f6134d50ee26a6a42cc'
```

## Update Token (Extend)

Update the token with new expiry time. App has been configure to add +1 hours on expiry time.

```bash
curl --request PUT \
  --url http://localhost:8080/tokens \
  --header 'content-type: application/json' \
  --header 'token: 329467891144628052c50423242ca8d9532a0d57a1385f6134d50ee26a6a42cc' \
  --data '{
	"token": "1d0f03b54f9f8a9a0d01e8977605692d2f20462a7deb183c2ff7dcb0d75cbdcf"
}'
```

## Delete Token (Logout)

Deletes token. This endpoint should be invoked on user logout.

```bash
curl --request DELETE \
  --url 'http://localhost:8080/tokens?token=329467891144628052c50423242ca8d9532a0d57a1385f6134d50ee26a6a42cc' \
  --header 'authorization: Bearer ' \
  --header 'token: 329467891144628052c50423242ca8d9532a0d57a1385f6134d50ee26a6a42cc'
```

## Get Menus

Returns list of pizza menu for users to choose from. Includes name, options and price.

```bash
curl --request GET \
  --url http://localhost:8080/menus \
  --header 'token: 329467891144628052c50423242ca8d9532a0d57a1385f6134d50ee26a6a42cc'
```

## Get Menu

Returns list of menu for given id.

```bash
curl --request GET \
  --url 'http://localhost:8080/menu?id=248h19vhq9djxcjgbzqm' \
  --header 'token: 329467891144628052c50423242ca8d9532a0d57a1385f6134d50ee26a6a42cc'
```

## Add Cart Item

Adds item (pizza) to users cart. There is only one active shopping cart for user.
If cart does not exists app will create new cart.

```bash
curl --request POST \
  --url http://localhost:8080/cartitem \
  --header 'content-type: application/json' \
  --header 'token: 329467891144628052c50423242ca8d9532a0d57a1385f6134d50ee26a6a42cc' \
  --data '{
	"menuId": "3jczp90i49m44xuhhmbk",
	"quantity": 1,
	"size": "large"
}'
```

## Update Cart Item

Update cart item. User can update quantity number for previously added item.

```bash
curl --request PUT \
  --url http://localhost:8080/cartitem \
  --header 'content-type: application/json' \
  --header 'token: 329467891144628052c50423242ca8d9532a0d57a1385f6134d50ee26a6a42cc' \
  --data '{
	"menuId": "3jczp90i49m44xuhhmbk",
	"quantity": 5,
	"size": "large"
}'
```

## Delete Cart Item

Delete previously added cart item. Returns 404 error of item is not already added.

```bash
curl --request DELETE \
  --url http://localhost:8080/cartitem \
  --header 'content-type: application/json' \
  --header 'token: 329467891144628052c50423242ca8d9532a0d57a1385f6134d50ee26a6a42cc' \
  --data '{
	"menuId": "3jczp90i49m44xuhhmbk",
	"size": "large"
}'
```

## Get Cart

Get detail for users' cart. List all items added to cart and total amount to be paid.

```bash
curl --request GET \
  --url http://localhost:8080/cart \
  --header 'token: 329467891144628052c50423242ca8d9532a0d57a1385f6134d50ee26a6a42cc'
```

## Delete Cart

Delete users cart completely.

```bash
curl --request DELETE \
  --url http://localhost:8080/cart \
  --header 'token: 329467891144628052c50423242ca8d9532a0d57a1385f6134d50ee26a6a42cc'
```

## Checkout

Checkout and pay for the shopping cart.

```bash
curl --request POST \
  --url http://localhost:8080/checkout \
  --header 'content-type: application/json' \
  --header 'token: 329467891144628052c50423242ca8d9532a0d57a1385f6134d50ee26a6a42cc' \
  --data '{
	"cardType": "visa",
	"cardNo": "4242424242424243",
	"cvvCode": 393,
	"expiryDate": "23/33"
}'
```

If payment is sucessful, order is created with unique id, delivery information of user,
payment detail and items. Following confirmation email will be send to user.

**Sample Confirmation Email**

```
Order : qlske6rj3pqln1gttor1
--------------------------------------------------------------------------------
Name:                                                          Updated Test User
Phone:                                                                0751345667
Address:                                                 Test Street, London, UK
--------------------------------------------------------------------------------
Items                                                              Qty    Amount
Gourment Pepperoni Pizza (large)............................      2.00     35.00
--------------------------------------------------------------------------------
Total                                                                      35.00
Status:                                                               SUCCESSFUL
```

**Sample Order Details**

```json
{
  "orderId": "8dznwidggx0yd9kna884",
  "delivery": {
    "name": "Sabin Raj Dangol",
    "phone": "0751345667",
    "address": "Test Street, London",
    "email": "sabin.dangol@hotmail.com"
  },
  "items": [
    {
      "menuId": "xpp692vu0m0li2wqq8lv",
      "name": "Doner Pizza",
      "quantity": 2,
      "option": { "name": "large", "description": "15 inches", "price": 17.5 },
      "amount": 35
    }
  ],
  "total": 35,
  "payment": {
    "paymentId": "pi_1GZW60IAF5MWo5YSQ0Xx24VT",
    "paymentMethod": "pm_1GZW60IAF5MWo5YSI1PgJw6l",
    "status": "successful"
  }
}
```
