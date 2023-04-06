# the-one-api.dev Movies SDK

https://the-one-api.dev/ is a API for The Lord of the Rings Triology. There are lot of end points available see [docs here](https://the-one-api.dev/documentation). How ever this repo has sdk implementation for only Movies end point. And also written in a way this can be extended to other apis also.

# Requirements

- Node.js v >= 19
- Create an account at [here](https://the-one-api.dev/) and get the bearer token.

# Installation

For installing use below command

`npm install @nikeshp/nikeshpadakanti-sdk`

# Build

- For Production build run below command

```bash
npm run build
```

- For Dev build which also watching on the source files

```bash
npm run dev
```

# Usage

## Initialization

```js
import Lotr from "nikeshpadakanti-sdk";

const client = new Lotr({
  bearerToken: "G3xGE1Q1Vrm2e1aRc2B_",
});
```

## Example 1

```js
client.getMovies().then((response) => {
  console.log(response);
});
```

## Example 1 pagination

```js
client
  .getMovies()
  .limit(3)
  .page(1)
  .call()
  .then((response) => {
    console.log(response);
  });
```

## Example 1 filtering

```js
client
  .getMovies()
  .matching("name", "The Two Towers")
  .call()
  .then((response) => {
    console.log(response);
  });
```

# Filtering Methods Supported

- matching
  ```js
      // usage
      matching(key:string , value:string)
  ```
- notMatching
  ```js
      // usage
      notMatching(key:string , value:string)
  ```
- including
  ```js
      // usage
      including(key:string , value:string[])
  ```
- excluding
  ```js
      // usage
      excluding(key:string , value:string[])
  ```
- filterByRegex
  ```js
      // usage
      filterByRegex(key:string , value:string)
  ```
- filterByMeasures
  ```js
      // usage
      filterByMeasures(key:string , operator: ">" | "<" | ">=" | "<=" | "=", value:number)
  ```
