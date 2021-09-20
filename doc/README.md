# CoLa Editor - Documentation

Here, you can find the documentation for the CoLa Editor - the backend/API part. For the frontend,
see [here](https://mode.fh-joanneum.at/cola/editor/online-editor/-/tree/develop/doc).

The backend is based on [Node.js](https://nodejs.org/en/) and the [Express-Framework](https://expressjs.com/). It is
developed with [TypeScript](https://www.typescriptlang.org/) and based on
the [templated](https://github.com/Rigbin/express-ts), provided
by [Harald Schwab](mailto:harald.schwab2@fh-joanneum.at)

## Prerequisites

To run/build this application, you need:

* [Node.js](https://nodejs.org/en/)
  * we will recommend the current [LTS](https://nodejs.org/dist/latest-v14.x/)
  * see also [NVM](https://github.com/nvm-sh/nvm#node-version-manager---)
* [npm](https://www.npmjs.com/)
  * comes with Node.js
  * As alternative, you can use [Yarn](https://yarnpkg.com/)

You can also use [Docker](https://www.docker.com/)/[Docker-Compose](https://docs.docker.com/compose/) for development,
as well for Deployment.

### Version Overview

> For detailed Version, see [package.json](../package.json)

* Express 4.17
* ~~Mongoose 5.12~~
* TypeScript 4.4

### Additional Libraries/Packages

In order not to reinvent the wheel we use further libraries

* [Handlebars](https://handlebarsjs.com/) to provide templates for building apps (e.g. PWA)
* [Express-Validation](https://github.com/express-validator/express-validator) for input-validation
* [JSZip](https://stuk.github.io/jszip/) to create ZIP-Files
* [Sharp](https://sharp.pixelplumbing.com/) to do some image-processing

## Installation/Development

1. Clone project: `git clone https://mode.fh-joanneum.at/cola/editor/cola-api-service.git`
2. Install node packages: `npm ci`
3. Start Dev-Server:

* locally: `npm run start:dev`
* ~~docker: `docker-compose -f docker-compose.yml up`~~

<!--
> The project also contains a [MongoDB](https://www.mongodb.com/) database **(Currently not in use!)**. To avoid Error-Messages/Warnings, you can simple run the Database via Docker-Compose and the Development-Server locally.
> ```console
> docker-compose -f docker-compose.yml up database
> npm run start:dev
> ```
-->

### Development

Some custom "Paths" are set up inside of [`tsconfig`](../tsconfig.json). When you add additional custom `paths`, also
extend `_moduleAliases` in [package.json](../package.json).

Testing is prepared via [Jest](https://jestjs.io/). You can add Tests in [`test`](../test/).

## Deployment

For deployment, simple start Docker-Service with `docker-compose.yml`.

```console
docker-compose -f docker-compose.yml up -d
```

To provide Service in public, use Apache or Nginx as reverse proxy. Example:

**cola-api_HTTP.conf**

```apacheconf
<VirtualHost *:80>
	ServerAdmin web@cola-api.com
	ServerName cola-api.com
	DocumentRoot /var/www/cola-api/html

	ErrorLog /var/www/cola-api/logs/error.log
	CustomLog /var/www/cola-api/logs/access.log combined

	RewriteEngine on
	RewriteCond %{SERVER_NAME} =cola-api.com
	RewriteRule ^ https://%{SERVER_NAME}%{REQUEST_URI} [END,NE,R=permanent]
</VirtualHost>
```

**cola-api_HTTP-le-ssl.conf**

```apacheconf
<IfModule mod_ssl.c>
<VirtualHost *:443>
	ServerAdmin web@cola-api.com
	ServerName cola-api.com
	DocumentRoot /var/www/cola-api/html

	ProxyPass / http://127.0.0.1:8605/ timeout=600
	ProxyPassReverse / http://127.0.0.1:8605/
	<Proxy *>
		Order deny,allow
		Allow from all
		ProxyPreserveHost On
	</Proxy>

	ErrorLog /var/www/cola-api/logs/HTTPS_error.log
	CustomLog /var/www/cola-api/logs/HTTPS_access.log combined


  SSLCertificateFile /etc/letsencrypt/live/cola-api.com/fullchain.pem
  SSLCertificateKeyFile /etc/letsencrypt/live/cola-api.com/privkey.pem
  Include /etc/letsencrypt/options-ssl-apache.conf
</VirtualHost>
</IfModule>
```

> See [Let's Encrypt](https://letsencrypt.org/getting-started/)

---

## Project Structure

### `src`

```tree
src
├── app
│   ├── middleware
│   │   ├── cache
│   │   ├── error
│   │   ├── logging
│   │   ├── validation
│   │   └── ws
│   └── routes
│       └── v1
│           ├── explorer
│           └── pwa
├── assets
│   ├── generated
│   │   └── pwa
│   ├── img
│   └── template
│       ├── project-explorer
│       │   ├── Example
│       │   ├── Pong-final
│       │   └── Pong-start
│       └── pwa
├── config
│   └── constants
├── public
└── util
    ├── error
    ├── file
    ├── image
    ├── logger
    ├── request
    ├── response
    ├── script
    ├── serialize
    └── zip
```

#### [`src/app`](../src/app/)

Contains base logic of Express-API and startpoint of Application.

##### [`src/app/middleware`](../src/app/middleware/)

Custom Express-middleware, like

* [Cache-Control](../src/app/middleware/cache/index.ts)
* [Logging](../src/app/middleware/logging/index.ts)
* [Validator](../src/app/middleware/validation/index.ts)

##### [`src/app/routes`](../src/app/routes/)

Route definitions for API.

"Startpoint" is path [`/v1/`](../src/app/routes/v1/v1.router.ts).

> TODO: [Swagger](https://swagger.io/) implementation for automatic API-Documentation. [See](https://blog.logrocket.com/documenting-your-express-api-with-swagger/)

#### [`src/assets`](../src/assets/)

Contains the assets for the API.

Instead of keep all data in database, some like Code-Templates (JavaScript) will be found here inside
of [`assets/template`](../src/assets/template). They will be provided via
Route [`/v1/explorer`](../src/app/routes/v1/explorer/explorer.router.ts).

Also via [`/v1/pwa`](../src/app/routes/v1/pwa/pwa.router.ts) created PWAs (zip) will be stored there. For this creation,
you will also find the [templates](../src/assets/template) there.

#### [`src/config`](../src/config/)

Contains configuration files for the application.

* [Cors Settings](../src/config/cors.settings.ts)
* [Environment Configuration](../src/config/environment.ts)
  * see also [.env](../.env.example)
* [Some Constants](../src/config/constants/router.ts)

#### [`src/util`](../src/util/)

Contains utility/helper files (function, classes, etc.).
