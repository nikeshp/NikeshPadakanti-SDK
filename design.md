# External Libraries

- isomorphic-unfetch - this library is used mainly for the fetch method which calls api. This helps to use this sdk for both client side(Browser based) and Nodejs.

# Design

Used Typescript to create SDK

## Build

Compiled TypeScript to below bundles using `microbundle` package. (bundle types is defined package.json)

- index.js - for common js
- index.m.js - for module ASM
- index.umd.js - for UMD type

## Building URL

For building URL for pagination, filtering and sorting. Used method chanining.
Example:

```js
client
  .getMovies()
  .limit(3)
  .page(1)
  .matching("fieldName", "value")
  .call()
  .then((response) => {
    console.log(response);
  });
```

## Classes

- Base - base class takes the bearer token and base url as input.
- Resource - Resource class implements all methods thats related to pagination, sort and filters
- Movies - class calls resource class with generic Movie type and returns the instance.
