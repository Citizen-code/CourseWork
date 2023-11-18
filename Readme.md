# Маршруты
<details>
<summary><h2>Авторизационный сервер</h2></summary>

Основным маршрутом для сервера авторизации является `/auth`, все запросы к конечным точкам выполняются с его помощью.
***
<details>
<summary><h3>Client</h3></summary>

###  `POST /login/client`
#### Параметры запроса:
| Местоположение | Наименование | Тип      | Является обязательным | Ограничения    |
| -------------- | ------------ | -------- | --------------------- | -------------- |
| `body`         | `email`      | `string` | да                    | нет            |
| `body`         | `password`   | `string` | да                    | макс - 32 сим. |
#### Параметры ответа:
| Наименование   | Тип      | Является опциональным |
| -------------- | -------- | --------------------- |
| `accessToken`  | `string` | нет                   |
| `refreshToken` | `string` | нет                   |
#### Формат запроса
```json
{
    "email":"sjuiqymz9@gmail.com",
    "password":"123"
}
```
#### Формат ответа
```json
{
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjBkNjY1YTAxLTMxOWEtNDU4Yy1iMjg3LTgzM2ExYjE2ZDRkYSIsInR5cGUiOiJlbXBsb3llZSIsImlhdCI6MTcwMDMyNTQ5NiwiZXhwIjoxNzAwMzI3Mjk2fQ.9Q1uFz4-xmP4U3tu-PLvFRvbk2Il1LCMV_7ZAMciAxI",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjBkNjY1YTAxLTMxOWEtNDU4Yy1iMjg3LTgzM2ExYjE2ZDRkYSIsInR5cGUiOiJlbXBsb3llZSIsImlhdCI6MTcwMDMyNTQ5NiwiZXhwIjoxNzAyOTE3NDk2fQ.5COm0ADMS7ZYtHPjw8HpcnPtO7i6lGIt841oel8tr4g"
}
```
***
### `POST /logout/client`
#### Параметры запроса:
| Местоположение | Наименование   | Тип      | Является обязательным | Ограничения |
| -------------- | -------------- | -------- | --------------------- | ----------- |
| `cookie`       | `refreshToken` | `string` | да                    | нет         |
#### Параметры ответа:
| Наименование | Тип      | Является опциональным |
| ------------ | -------- | --------------------- |
| `message`    | `string` | нет                   |
#### Формат ответа
```json
{
    "message": "Успешно"
}
```
***
### `GET /refresh/client`
#### Параметры запроса:
| Местоположение | Наименование   | Тип      | Является обязательным | Ограничения |
| -------------- | -------------- | -------- | --------------------- | ----------- |
| `cookie`       | `refreshToken` | `string` | да                    | нет         |
#### Параметры ответа:
| Наименование   | Тип      | Является опциональным |
| -------------- | -------- | --------------------- |
| `accessToken`  | `string` | нет                   |
| `refreshToken` | `string` | нет                   |
#### Формат ответа
```json
{
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjBkNjY1YTAxLTMxOWEtNDU4Yy1iMjg3LTgzM2ExYjE2ZDRkYSIsInR5cGUiOiJlbXBsb3llZSIsImlhdCI6MTcwMDMyNTQ5NiwiZXhwIjoxNzAwMzI3Mjk2fQ.9Q1uFz4-xmP4U3tu-PLvFRvbk2Il1LCMV_7ZAMciAxI",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjBkNjY1YTAxLTMxOWEtNDU4Yy1iMjg3LTgzM2ExYjE2ZDRkYSIsInR5cGUiOiJlbXBsb3llZSIsImlhdCI6MTcwMDMyNTQ5NiwiZXhwIjoxNzAyOTE3NDk2fQ.5COm0ADMS7ZYtHPjw8HpcnPtO7i6lGIt841oel8tr4g"
}
```
***
### `POST /registration`
#### Параметры запроса:
| Местоположение | Наименование | Тип      | Является обязательным | Ограничения |
| -------------- | ------------ | -------- | --------------------- | ----------- |
| `body`         | `email`      | `string` | да                    | нет         |
| `body`         | `password`   | `string` | да                    | нет         |
| `body`         | `birth_date` | `date`   | да                    | нет         |
| `body`         | `surname`    | `string` | да                    | нет         |
| `body`         | `firstname`  | `string` | да                    | нет         |
| `body`         | `lastname`   | `string` | да                    | нет         |
| `body`         | `phone`      | `string` | да                    | нет         |
#### Параметры ответа:
| Наименование   | Тип      | Является опциональным |
| -------------- | -------- | --------------------- |
| `accessToken`  | `string` | нет                   |
| `refreshToken` | `string` | нет                   |
#### Формат ответа
```json
{
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjBkNjY1YTAxLTMxOWEtNDU4Yy1iMjg3LTgzM2ExYjE2ZDRkYSIsInR5cGUiOiJlbXBsb3llZSIsImlhdCI6MTcwMDMyNTQ5NiwiZXhwIjoxNzAwMzI3Mjk2fQ.9Q1uFz4-xmP4U3tu-PLvFRvbk2Il1LCMV_7ZAMciAxI",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjBkNjY1YTAxLTMxOWEtNDU4Yy1iMjg3LTgzM2ExYjE2ZDRkYSIsInR5cGUiOiJlbXBsb3llZSIsImlhdCI6MTcwMDMyNTQ5NiwiZXhwIjoxNzAyOTE3NDk2fQ.5COm0ADMS7ZYtHPjw8HpcnPtO7i6lGIt841oel8tr4g"
}
```
***
</details>
<details>
<summary><h3>Employee</h3></summary>

### `POST /login/employee`
#### Параметры запроса:
| Местоположение | Наименование | Тип      | Является обязательным | Ограничения    |
| -------------- | ------------ | -------- | --------------------- | -------------- |
| `body`         | `login`      | `string` | да                    | нет            |
| `body`         | `password`   | `string` | да                    | макс - 32 сим. |
#### Параметры ответа:
| Наименование   | Тип      | Является опциональным |
| -------------- | -------- | --------------------- |
| `accessToken`  | `string` | нет                   |
| `refreshToken` | `string` | нет                   |
#### Формат запроса
```json
{
    "login":"Bogdanova",
    "password":"123"
}
```
#### Формат ответа
```json
{
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjBkNjY1YTAxLTMxOWEtNDU4Yy1iMjg3LTgzM2ExYjE2ZDRkYSIsInR5cGUiOiJlbXBsb3llZSIsImlhdCI6MTcwMDMyNTQ5NiwiZXhwIjoxNzAwMzI3Mjk2fQ.9Q1uFz4-xmP4U3tu-PLvFRvbk2Il1LCMV_7ZAMciAxI",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjBkNjY1YTAxLTMxOWEtNDU4Yy1iMjg3LTgzM2ExYjE2ZDRkYSIsInR5cGUiOiJlbXBsb3llZSIsImlhdCI6MTcwMDMyNTQ5NiwiZXhwIjoxNzAyOTE3NDk2fQ.5COm0ADMS7ZYtHPjw8HpcnPtO7i6lGIt841oel8tr4g"
}
```
***
### `POST /logout/employee`
#### Параметры запроса:
| Местоположение | Наименование   | Тип      | Является обязательным | Ограничения |
| -------------- | -------------- | -------- | --------------------- | ----------- |
| `cookie`       | `refreshToken` | `string` | да                    | нет         |
#### Параметры ответа:
| Наименование | Тип      | Является опциональным |
| ------------ | -------- | --------------------- |
| `message`    | `string` | нет                   |
#### Формат ответа
```json
{
    "message": "Успешно"
}
```
***
### `GET /refresh/employee`
#### Параметры запроса:
| Местоположение | Наименование   | Тип      | Является обязательным | Ограничения |
| -------------- | -------------- | -------- | --------------------- | ----------- |
| `cookie`       | `refreshToken` | `string` | да                    | нет         |
#### Параметры ответа:
| Наименование   | Тип      | Является опциональным |
| -------------- | -------- | --------------------- |
| `accessToken`  | `string` | нет                   |
| `refreshToken` | `string` | нет                   |
#### Формат ответа
```json
{
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjBkNjY1YTAxLTMxOWEtNDU4Yy1iMjg3LTgzM2ExYjE2ZDRkYSIsInR5cGUiOiJlbXBsb3llZSIsImlhdCI6MTcwMDMyNTQ5NiwiZXhwIjoxNzAwMzI3Mjk2fQ.9Q1uFz4-xmP4U3tu-PLvFRvbk2Il1LCMV_7ZAMciAxI",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjBkNjY1YTAxLTMxOWEtNDU4Yy1iMjg3LTgzM2ExYjE2ZDRkYSIsInR5cGUiOiJlbXBsb3llZSIsImlhdCI6MTcwMDMyNTQ5NiwiZXhwIjoxNzAyOTE3NDk2fQ.5COm0ADMS7ZYtHPjw8HpcnPtO7i6lGIt841oel8tr4g"
}
```
***
</details>

### `GET /validate`
#### Параметры запроса:
| Местоположение | Наименование    | Тип      | Является обязательным | Ограничения |
| -------------- | --------------- | -------- | --------------------- | ----------- |
| `header`       | `Authorization` | `string` | да                    | нет         |
#### Параметры ответа:
| Наименование | Тип      | Является опциональным |
| ------------ | -------- | --------------------- |
| `id`         | `UUID`   | нет                   |
| `type`       | `string` | нет                   |
| `iat`        | `number` | нет                   |
| `exp`        | `number` | нет                   |
#### Формат ответа
```json
{
    "id": "037953d6-aee4-45fd-8aef-f8596f15f1f0",
    "type": "client",
    "iat": 1700328790,
    "exp": 1700330590
}
```
</details>
<details>
<summary><h2>Api</h2></summary>

Основным маршрутом для api является `/api`, все запросы к конечным точкам выполняются с его помощью.
***
<details>
<summary><h3>Client</h3></summary>

### `GET /client`
#### Доступен: `['employee']`
#### Параметры запроса:
| Местоположение | Наименование | Тип       | Является обязательным | Ограничения |
| -------------- | ------------ | --------- | --------------------- | ----------- |
| `query`        | `include`    | `boolean` | нет                   | нет         |
| `query`        | `pagination` | `boolean` | нет                   | нет         |
| `query`        | `page`       | `number`  | нет                   | нет         |
#### Параметры ответа:
| Наименование   | Тип      | Является опциональным |
| -------------- | -------- | --------------------- |
| `accessToken`  | `string` | нет                   |
| `refreshToken` | `string` | нет                   |
#### Формат запроса
```json
{
    "email":"sjuiqymz9@gmail.com",
    "password":"123"
}
```
#### Формат ответа
```json
{
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjBkNjY1YTAxLTMxOWEtNDU4Yy1iMjg3LTgzM2ExYjE2ZDRkYSIsInR5cGUiOiJlbXBsb3llZSIsImlhdCI6MTcwMDMyNTQ5NiwiZXhwIjoxNzAwMzI3Mjk2fQ.9Q1uFz4-xmP4U3tu-PLvFRvbk2Il1LCMV_7ZAMciAxI",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjBkNjY1YTAxLTMxOWEtNDU4Yy1iMjg3LTgzM2ExYjE2ZDRkYSIsInR5cGUiOiJlbXBsb3llZSIsImlhdCI6MTcwMDMyNTQ5NiwiZXhwIjoxNzAyOTE3NDk2fQ.5COm0ADMS7ZYtHPjw8HpcnPtO7i6lGIt841oel8tr4g"
}
```
</details>
<details>
<summary><h3>Service</h3></summary>

</details>
<details>
<summary><h3>Order</h3></summary>

</details>
<details>
<summary><h3></h3></summary>

</details>
</details>

### `/`
#### Параметры запроса:
#### Доступен: `['employee']`
| Местоположение | Наименование | Тип      | Является обязательным | Ограничения    |
| -------------- | ------------ | -------- | --------------------- | -------------- |
#### Параметры ответа:
| Наименование   | Тип      | Является опциональным |
| -------------- | -------- | --------------------- |
#### Формат запроса
```json
```
#### Формат ответа
```json
```