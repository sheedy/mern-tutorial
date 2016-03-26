# Development

Start a MongoDB instance:

```shell
$ docker run --name mongo-mern-tutorial -p "27017:27017" -d mongo
```

Start a MongoDB toolbox and apply `initDatabase.js` script:

```shell
$ docker run --rm -it -v "${PWD}:/src" --net="host" deviantony/toolbox:mongodb zsh
> mongo /src/mongo/initDatabase.js
```
