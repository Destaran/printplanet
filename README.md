# PrintPlanet: The Simplest Factorio Calculator

PrintPlanet aims to combine the perks of all available calculators and even more: simple, configurable, accurate and transparent while feature rich. Most of the calculators are overcomplicated, or if not, they are not so useable. I would like to provide a calculator to my fellow engineers, that can be utilized for any challenge Factorio can bring for new players and veterans alike. The project is in beta right now, so many functionalities like saving calculations to your profile is not available yet.

### Try it out the demo [here](https://print-planet-js.vercel.app/)!

![](https://i.imgur.com/zmlWDFt.png)

# Tech Stack:

- Firebase backend for user auth and user data storage
- React running on Vite with React Router
- Redux Toolkit for advanced state management with reselect for selector reusability
- styled for flexible and convinient CSS

![](https://i.imgur.com/hWkZOHZ.png)

# Features:

- Calculate any item's required resources and machines in vanilla Factorio
- Transparent and simple UI / Fluid and easy UX
- Use any machine configuration that is available in-game
- Quick and flexible way of calculating with hotkeys and macros

![](https://i.imgur.com/yDPlM5L.png)

# Roadmap:

## Backend:

- Finish TypeScript migration
- Switching from Firestore to Express.js, later Nest.js
- Automated server-side data scraping for mods with Python

## Frontend:

- Adding energy consumption and pollution data
- Ability to save your calculations to your profile
- Calculation browser: share your calculations and browse others'
- Attachable and viewable blueprints
- Compatibility with all mods
