# Development

## MongoDB

Start a MongoDB instance:

```shell
$ docker run --name mongo-mern-tutorial -p "27017:27017" -d mongo
```

Start a MongoDB toolbox and apply `initDatabase.js` script:

```shell
$ docker run --rm -it -v "${PWD}:/src" --net="host" deviantony/toolbox:mongodb zsh
> mongo /src/mongo/initDatabase.js
```

## Node server

Start the node server:

```shell
$ node webapp.js
```

## Webpack dev server

Start the dev server:

```shell
$ npm run dev
```
