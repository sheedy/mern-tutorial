# Development

## MongoDB

Start a MongoDB instance:

```shell
$ docker run --name mongo-mern-tutorial -p "27017:27017" -d mongo
```

(*Optional*) Start a MongoDB toolbox and apply `initDatabase.js` script:

```shell
$ docker run --rm -it -v "${PWD}:/src" --net="host" deviantony/toolbox:mongodb zsh
> mongo /src/mongo/initDatabase.js
```

## Node server

Babelify the server code (watch mode enabled):

```shell
$ npm run babel
```

In another terminal, start the node server:

```shell
$ npm run node
```

## Webpack dev server

Start the dev server:

```shell
$ npm run dev
```
