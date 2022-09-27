# Polygence Coding Challenge

Interview Submission

## Project overview

This project is for tracking spendings in an application.

A spending has the followings properties:

- when it happened
- how much did we spend
- in what currency
- for what/description

This simple web app allows the users to:

- Create a new spending
- List all the spendings
- List all the spendings ordered by amount, date
- List all the spendings filtered by currency

A spending JSON object looks like this:

```json
{
  "id": 1,
  "description": "Mango",
  "amount": 1200,
  "spent_at": "2022-02-23T14:47:20.381Z",
  "currency": "USD"
}
```

## Getting Started

This project is best run using **Node 16.17.x**.

### Backend

To run the backend:

```shell
cd api
npm i
npm run docker:up
npm run migrate
npm start
```

API will listen on http://localhost:5001

### Frontend

To run the frontend:

```shell
cd web
npm i
npm start
```

Application will be accessible on http://localhost:3000

## Linting

To run the lint check in any project

```shell
npm run lint
```

## Testing

For testing the backend, the test database should be set up:

```shell
cd api
npm run docker:up
npm run migrate:test
```

To run the tests in any project:

```shell
npm test
```
