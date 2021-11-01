# url-shortener

![URL Shortener Screenshot](https://github.com/zachstence/url-shortener/blob/main/screenshot.png)

## Table of Contents
* [Demo](#demo)
* [Running Locally](#running-locally)
    * [Using `npm` Scripts](#using-npm-scripts)
    * [Using the `Makefile`](#using-the-makefile)
* [Technology](#technology)
    * [UI](#technology)
    * [Server](#technology)
* [Architecture](#architecture)
    * [UI](#architecture)
    * [Server](#architecture)
* [Next Steps](#next-steps)

## Demo
You can access a live demo of the app deployed on GitHub pages at [zachstence.github.io/url-shortener](https://zachstence.github.io/url-shortener). You are able to shorten any URL you like and then use the shortened URL to be redirected. However, since the server is deployed to Heroku, the database storing the URLs will be wiped every time the Heroku dyno sleeps (after being inactive for 1 hour), or when I deploy new changes. Even so, the deployed app is a great proof-of-concept.

The shortened URLs will look like `zachstence.github.io/url-shortener/#/abc123`. Obviously this is not a very short URL, but the thought behind this project is that it could be deployed behind a much shorter domain name (e.g. bit.ly or goo.gl) and the app would fulfill its purpose.

## Running Locally
### Using `npm` Scripts
First, clone the repository
```sh
$ git clone https://github.com/zachstence/url-shortener.git && cd url-shortener
```

This project contains two parts, the UI and the server. Both need to be running in order to use the app.

To run the server, first build the code, then start the server.
```sh
$ cd server
$ npm run build
$ npm run start
```

To run the UI, simply start it using the CRA script.
```sh
$ cd ui
$ npm run start
```

Last, to access the app navigate to [http://localhost:8080/](http://localhost:8080) in your browser.

### Using the `Makefile`
First, clone the repository
```sh
$ git clone https://github.com/zachstence/url-shortener.git && cd url-shortener
```

To install dependencies in both the UI and server, run
```sh
$ make setup
```

To run tests in both the UI and server, run
```sh
$ make test
```

To run both the UI and the server, execute these two commands in separate terminal instances.
```sh
$ make server
$ make ui
```

## Technology
### UI
The UI uses the Create React App [TypeScript Template](https://create-react-app.dev/docs/adding-typescript/) for the project framework, [node-sass](https://www.npmjs.com/package/node-sass) to compile SCSS to CSS, and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) for testing.

### Server
The server uses [Express](https://expressjs.com/) to power a REST service, and [node-json-db](https://github.com/Belphemur/node-json-db) as a very simple proof-of-concept database to hold the shortened URLs.

## Architecture
### UI
The functionality of the app is split into two components
* [`Shorten/`](ui/src/components/Shorten/Shorten.tsx) - Handles user interaction and sending a `POST` request to shorten a URL.
* [`Redirect/`](ui/src/components/Redirect/Redirect.tsx) - Redirects the user from a shortened URL (`.../######`) to a long URL retrieved from the server based on the 6-digit alphanumeric ID.

### Server
The database is managed through Express server endpoints defined in [`app.ts`](server/src/app.ts). The endpoints service requests by interacting with the [`Database`](server/src/Database.ts) class. I chose to abstract `node-json-db` behind [`Database`](server/src/Database.ts) so that the server could be scaled up with a larger database easily by changing the implementation.

The JSON database holds URLs in an object where 6-digit alphanumeric IDs map to URLs.
```json
{
    "SHwNsi": "https://www.github.com/zachstence",
    "R0yeUf": "https://www.linkedin.com/in/zachary-stence/",
    "LNQn2D": "https://github.com/SprocketBot/sprocket-ui",
}
```

---------

## Next Steps
* Style Redirect loading
* Copy button for shortened link
* Continuous gradient across input and button
* Deploy to GitHub pages (where to deploy server?)