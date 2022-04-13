# CoLa VCL API

Node.js/Express based ReST API for [CoLa](https://cola.fh-joanneum.at/) project.  
Especially for the [Online Editor](https://mode.fh-joanneum.at/cola/editor/online-editor).

~~Based on [ts-ws-template](https://github.com/Rigbin/ts-ws-template)~~  
Rewrite, based on [express-ts](https://github.com/Rigbin/express-ts)

by [Harald Schwab](mailto:harald.schwab2@fh-joanneum.at)

For full documentation, see [here](./doc/).

## About

API/Backend for [VCL Frontend](https://mode.fh-joanneum.at/cola/vcl/frontend).

**Planned features:**

* TODO...

## Prerequisites

When developing locally, you need [Node.js](https://nodejs.org/en/), we recommend the current (
09.2021) [LTS 14.x](https://nodejs.org/dist/latest-v14.x/).

A useful tool to manage different versions of Node.js locally would be [NVM](https://github.com/nvm-sh/nvm).

Clone this repository and install node packages using `npm`.

```console
git clone https://mode.fh-joanneum.at/cola/vcl/api-service
cd api-service
npm ci --silent
```

Now, you can run the local development server.

```console
npm run start:dev
```

To build the project, run `npm run build` or take a look into the [Docker](#docker) section.

Because [linting](.eslintrc.json) is set to force UNIX linebreak style, on windows run:

```console
git config --local core.autocrlf false
```

to avoid errors.

## Configuration

See [.env.example](.env.example) for custom configuration. Create a copy `cp .env.example .env` and setup your
configuration.

| Name | Description | Default |
| ---- | ----------- | ------- |
| SERVICE_PORT | Port, where service is listening | 8605 |
| NODE_ENV | Set environment for application | `development` |
| MONGO_HOST | database url/hostname for MongoDB, should not be set when using `docker-compose` | *empty* |

<!--| MONGO_USER | MongoDB (admin) user | *empty* |
| MONGO_PASS | MongoDB (admin) user password | *empty* |
| MONGO_DB | MongoDB database name | *empty* |
| MONGO_PORT | MongoDB database port | 27017 | -->

---

### Docker

> I would recommend to directly use [`docker-compose`](#mongodb).

1. Build docker image

  ```console
  docker build --no-cache -t "vcl-api-service" .
  ```

2. Run docker container

  ```console
  docker container run -it -d -p 8605:8605 --name vcl-api-service vcl-api-service
  ```

Check log-output

```console
docker container logs -f vcl-api-service
```

Stop container

```console
docker container stop vcl-api-service
```

## Testing

We're using [Jest](https://jestjs.io/) for testing, you can find some example tests inside of [test](./test). With the
help of [supertest](https://www.npmjs.com/package/supertest) we also can do some [End2End-Testing](./test/e2e) without
the need of a separate running node-server.

Run tests locally

```console
npm test
```

Run tests in watching mode

```console
npm run test:watch
```

Run tests with coverage (you can find the coverage report in [test/coverage](./test/coverage)).

```console
npm run test:coverage
```

## Documentation and Contribution rules

Use [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/#summary) specification for commit messages.

```
<type>([optional scope]): <description>

[optional body]

[optional footer(s)]
```

**Types**:

* `fix`: a bugfix (add Issue number as scope, e.g. `fix(#13): ...`)
* `feat`: a new feature
* `BREAKING CHANGE`: a breaking change
* `docs`: documentation only
* ...

---

## Useful links

* [root-less Docker](https://docs.docker.com/engine/security/rootless/)
* [Docker Compose](https://docs.docker.com/compose/)
* [TypeScript](https://www.typescriptlang.org/)
* [Node.js](https://nodejs.org/en/)
* [Express](https://expressjs.com/)
* [Jest](https://jestjs.io/)
