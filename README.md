# Who sings?

This is a music-based quiz game I built as per requirements provided by [Musixmatch](https://www.musixmatch.com/)

## User journey

The user has to log his name to register an account and start the game.
His/Her account is stored in the browser `localStorage`, which is a convenient compromise to persist without a DB, since `localStorage` expires only when the user deletes it manually. It survives tab change an browser close and opening.

The user can play as many games as he/she wants, and everytime a game finishes, the scores is saved inside the user's account. It is then used to update the user's personal scores table and the global high scores table.

## Technologies used

Here are the technologies being used

- [Next.js](https://nextjs.org/) as the core framework
- [React](https://react.dev/) as the rendering library
- [Redux Tooklit](https://redux-toolkit.js.org/) as the main tool to store a global state object across the entire application
- [Typescript](https://www.typescriptlang.org/) as the safety layer above JavaScript, to ensure less errors during development
- [Css modules](https://github.com/css-modules/css-modules) as the main tool to develop modular style with unique component-centered classes
- [Jest](https://jestjs.io/) as the main unit test framework
- [Musixmatch Developer API](https://developer.musixmatch.com/) as the main source of data

### Dependencies

- `NodeJS` >= 10
- Chrome (or any Chromium based browser, like the new Edge)/Firefox/Safari

### Installing

Run `npm i`

### Executing program

- Run in dev mode (with file watch): `npm run dev`
- Run in production mode - it generates a single build: `npm run build`
- Launch tests: `npm run test`
