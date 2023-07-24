# Who sings?

This is a music-based quiz game I built as per requirements provided by [Musixmatch](https://www.musixmatch.com/)

## User journey

The user has to log his name to register an account and start the game.
His/Her account is stored in the browser `localStorage`, which is a convenient compromise to persist without a DB, since `localStorage` expires only when the user deletes it manually. It survives tab change an browser close and opening.

The can play as many games as he/she wants, and everytime a game finishes, the scores is saved inside the user's account. It is then used to update the user's personal scores table and the global high scores table.

## Technologies used

While building this project I facedd many issues that led to learning experiences.
I am quite grateful for them to be honest, because this time around I wanted to learn by doing and not just following what someone else is doing in a tutorial video.

Here are the technologies being used

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [Redux Tooklit](https://redux-toolkit.js.org/)
- [Typescript](https://www.typescriptlang.org/)
- [Css modules](https://github.com/css-modules/css-modules)

### Dependencies

- `NodeJS` >= 10
- Chrome (or any Chromium based browser, like the new Edge)/Firefox/Safari

### Installing

Run `npm i`

### Executing program

- Run in dev mode (with file watch): `npm run dev`
- Run in production mode - it generates a single build: `npm run build`
- Launch tests: `npm run test`
