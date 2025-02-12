<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Connect pgadmin4 using docker

To add a `pgAdmin` container to your `docker-compose.yml` file, follow these steps:

---

### **Step 1: Update `docker-compose.yml`**

Add a new service for `pgAdmin` alongside your existing PostgreSQL configuration. Here’s an example:

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:15
    container_name: postgres
    restart: always
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: your_password
      POSTGRES_DB: your_database
    ports:
      - '5432:5432'
    volumes:
      - postgres_data:/var/lib/postgresql/data

  pgadmin:
    image: dpage/pgadmin4
    container_name: pgadmin
    restart: always
    environment:
      PGADMIN_DEFAULT_EMAIL: admin@example.com
      PGADMIN_DEFAULT_PASSWORD: admin_password
    ports:
      - '8080:80'
    depends_on:
      - postgres

volumes:
  postgres_data:
```

---

### **Step 2: Start the Services**

Run the following command to start both the PostgreSQL and pgAdmin services:

```bash
docker-compose up -d
```

---

### **Step 3: Access pgAdmin**

1. Open your web browser and navigate to `http://localhost:8080`.
2. Log in using the credentials provided in the `PGADMIN_DEFAULT_EMAIL` and `PGADMIN_DEFAULT_PASSWORD` environment variables from your `docker-compose.yml` file.

---

### **Step 4: Connect pgAdmin to PostgreSQL**

1. Once logged in, click on "Add New Server."
2. Enter the following details:
   - **Name**: Any name for your server (e.g., `Postgres`).
3. Go to the **Connection** tab and provide:

   - **Host**: `postgres` (this should match the service name in your `docker-compose.yml` file).
   - **Port**: `5432`.
   - **Username**: `POSTGRES_USER` from the `postgres` service environment variables (e.g., `postgres`).
   - **Password**: `POSTGRES_PASSWORD` from the `postgres` service environment variables (e.g., `your_password`).

4. Save the configuration. You should now see the PostgreSQL database in the pgAdmin interface.

---

### **Additional Notes**

- Make sure `postgres` and `pgadmin` services are on the same Docker network (default is fine when defined in the same `docker-compose.yml`).
- Replace `your_password` and `your_database` with your desired credentials and database name.

This setup should allow you to manage your PostgreSQL database with pgAdmin!
