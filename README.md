<p align="center">
  <a href="https://fuelfinance.me/" target="blank"><img src="https://images.crunchbase.com/image/upload/c_pad,h_256,w_256,f_auto,q_auto:eco,dpr_1/i6nvaapuwaslmlak1h5f" width="200" alt="Nest Logo" /></a>
</p>


## Description

This is a back-end assignment for position Full-stack developer in Fuel finance. Back end application was written with [Nest](https://github.com/nestjs/nest), [Typeorm](https://typeorm.io/), [MySQL](https://www.mysql.com/).

## Task

As an input you are given a CSV file with financial transactions. Your goal is to
upload the file with transactions using http, parse and store them in a database.
CSV file has the following structure: date | sum | source | description.The
application must have a report route that will return grouped transactions for
the user. The report should return the data in the following format: `[{source:
‘name’, data: [{date: ‘month+year’, total:‘’ }]}]`, where the total is the sum of
sums for a selected month and source. By default it should return grouped data
for all dates and sources.

## Solution
- [x] Upload csv file with defined schema: ` date | sum | source | description`
- [x] Data from csv saved in MySQL DB: `Incomes`
- [x] Generating report according to defined schema: `[{source:
  ‘name’, data: [{date: ‘month+year’, total:‘’ }]}]`
- [x] By default it returns grouped data
  for all dates and sources. 
- [x] By setting filters `source` and/or `date` it returns grouped data
    according to provided filters.
- [x] The app requires user to be authenticated first. by using `email` and `password`.
- [x] Additionally, the app was dockerized for simpler starting. 

# How to use:

1. Signup with email and password (this will logging you automatically). This will return access token
```bash 
curl --location 'http://localhost:3030/auth/signup' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "a@b.c", // Or any other credentials
    "password": "qwerty"
}'
````
2. Upload file (rewrite curl --location 'http://localhost:3030/incomes/' \
   --header 'Authorization: ••••••' with access token):
```bash
curl --location 'http://localhost:3030/incomes/upload' \
--header 'Authorization: Bearer ••••••' \
--form 'file=@"[path to the file]/input.csv"'
```
3. Generate report (rewrite curl --location 'http://localhost:3030/incomes/' \
   --header 'Authorization: ••••••' with access token):
```bash
curl --location 'http://localhost:3030/incomes/report' \
--header 'Authorization: Bearer ••••••'
```
# Run app with Docker [Recommended]

This app can be run using Docker for easier environment setup.

## Prerequisites
You should have installed:

- Docker
- Docker Compose

## Running the app

To start the containers:

```bash
docker compose up
```

# Run app without Docker
## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Stay in touch

- Author - [Andrii Nadosha](https://www.linkedin.com/in/andrii-nadosha/)
- Medium - [https://medium.com](https://medium.com/@andrey.nadosha)

