# Musixmatch - Who sings?

This is a music-based quiz game I built as per requirements provided by [Musixmatch](https://www.musixmatch.com/)

[Demo](https://react-ws.vercel.app/)

## User journey

The user has to log his name to register an account and start the game.
His/Her account is stored in the browser `localStorage`, which is a convenient compromise to persist without a DB, since `localStorage` expires only when the user deletes it manually. It survives tab change an browser close and opening.

The user can play as many games as he/she wants, and everytime a game finishes, the scores is saved inside the user's account. It is then used to update the user's personal scores table and the global high scores table.

## Technologies used

Here are the technologies being used

- [Next.js](https://nextjs.org/) as the core framework
- [React](https://react.dev/) as the rendering library
- [React DOM](https://github.com/facebook/react/tree/main/packages/react-dom): this is the `React` package that acts as a bridge between `React` itself and the `DOM`, so it makes possibile to render `React` components into a web page's [DOM](https://www.w3.org/TR/WD-DOM/introduction.html) by using `React`'s own `virtual DOM` and diffing algorithm
- [Redux Tooklit](https://redux-toolkit.js.org/) as the main tool to store a global state object across the entire application
- [Typescript](https://www.typescriptlang.org/) as the safety layer above JavaScript, to ensure less errors during development
- [Css modules](https://github.com/css-modules/css-modules) as the main tool to develop modular style with unique component-centered classes
- [Jest](https://jestjs.io/) as the main unit test framework
- [Musixmatch Developer API](https://developer.musixmatch.com/) as the main source of data

### Run locally

1. Run `npm i`to install all the dependencies
2. Once installted, you can run `npm run dev` to start the local server on `http://localhost`. The default port used will be 3000, otherwise another if it is already occupied by another process
3. Other useful commands:
   - create a production build (useful to check for any error before creating a commit): `npm run build`
   - run unit tests (written in [Jest](https://jestjs.io/)): `npm run test`
