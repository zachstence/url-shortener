# url-shortener

[![wakatime](https://wakatime.com/badge/user/2a0a4013-ea89-43b7-99d9-1a215b4c34d0/project/b6cbcf08-5f83-451a-96e6-441673068aac.svg)](https://wakatime.com/badge/user/2a0a4013-ea89-43b7-99d9-1a215b4c34d0/project/b6cbcf08-5f83-451a-96e6-441673068aac)

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

In [`index.tsx`](ui/src/index.tsx), I made the decision to use `HashRouter` so that the app would work when deployed on GitHub pages. This could easily be swapped out for `BrowserRouter` if this app was deployed somewhere else.

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

## Testing
The app almost fully covered with tests.

Server
| File         | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s |
|--------------|---------|----------|---------|---------|-------------------|
| All files    |    98.5 |       60 |     100 |     100 |                   |
|  Database.ts |     100 |      100 |     100 |     100 |                   |
|  app.ts      |   96.55 |    33.33 |     100 |     100 | 7-14              |
|  util.ts     |     100 |      100 |     100 |     100 |                   |

UI
File                     | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
-------------------------|---------|----------|---------|---------|-------------------
All files                |      98 |       75 |     100 |   97.91 |                   
 src                     |       0 |      100 |     100 |       0 |                   
  index.tsx              |       0 |      100 |     100 |       0 | 6                 
 src/App                 |     100 |      100 |     100 |     100 |                   
  App.tsx                |     100 |      100 |     100 |     100 |                   
 src/api                 |     100 |       50 |     100 |     100 |                   
  api.ts                 |     100 |       50 |     100 |     100 | 3                 
 src/components/Redirect |     100 |      100 |     100 |     100 |                   
  Redirect.tsx           |     100 |      100 |     100 |     100 |                   
 src/components/Shorten  |     100 |       75 |     100 |     100 |                   
  Shorten.tsx            |     100 |       75 |     100 |     100 | 17-33             

* [`app.ts 7-14`](server/src/app.ts#L7) is uncovered because it is config for the server and not business logic. I could have refactored the code to make it testable, but chose not to for this proof-of-concept.
* [`index.tsx 6`](ui/src/index.tsx#L6) is uncovered because it is config for UI and not business logic. If that code was incorrect, the app would not render.
* [`api.ts 3`](ui/src/api/api.ts#L3) is uncovered because it is config for API and not business logic. I could have refactored the code to make it testable, but chose not to for this proof-of-concept.
* [`Shorten.tsx 17-33`](ui/src/components/Shorten/Shorten.tsx) is uncovered by mistake (I think). My tests do exercise typing in the input and clicking the button.

---------

## Next Steps
* Style Redirect loading
* Copy button for shortened link
* Continuous gradient across input and button
