# deep-note
> Infinite-depth folder and note taking application


## Local Development
> `npm run watch`

#### `webpack.config.js`

make sure the `target` port (e.g., `3000`) is the same as `PORT` defined in the `.env` 
```js
proxy: {
    '/api': {
        target: `http://localhost:3000`,
        ...
    }
},
```

## Migrations
> `npm run migrate [up|down|create] [options]` 