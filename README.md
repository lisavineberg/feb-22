# Getting Started with Create React App

~This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).~
Lol, I started with Create React App because that's what I always used to use for little projects, and then realized that CRA was being sunset/no longer maintained, so I moved it to Vite. It's possible there are still some legacy files/code from CRA hanging around but I think I got it all.
You can run locally using `npm start`, or visit the site at `https://lisasmortgageapp.netlify.app/`.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\

The page will reload if you make edits.\
You will also see any lint errors in the console.

### DONE

- displaying mortgage products
- use zod to validate which mortgage products are valid
- able to create an application
- able to view list of applications
- able to edit application
- prettier/linting/tidied CreateReactApp files
- localized
- deployed

### QUESTIONS

- how does `x-nesto-candidat` work?
- token is listed as a required field in the `Application` type but it's not being returned from the application APIs

### NOTES

- french translations are just whatever Google suggested
- would spend more time structuring CSS (either modules, tailwind, styled components, etc)
- I had come up with a decent sorting function for the mortgage products before I implemented zod and realized that there was only one valid product for each, and so sorting isn't really necessary :/
- I randomly picked what "tags" to feature on a mortgage product card, as well as the sorting options ¯\_(ツ)\_/¯
- I made the `ApplicantSchema` fields nullish intentionally to allow you to update part of an application at a time
