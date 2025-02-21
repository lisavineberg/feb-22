# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### TODO

- mortgage application form
- tests
- sorting/filtering mortgage

```
import { useNavigate } from "react-router";

export function LoginPage() {
  let navigate = useNavigate();

  return (
    <>
      <MyHeader />
      <MyLoginForm
        onSuccess={() => {
          navigate("/dashboard");
        }}
      />
      <MyFooter />
    </>
  );
}
```

### DONE

- displaying mortgage products
- prettier/linting/tidied CreateReactApp files
- localized

### QUESTIONS

- how does `x-nesto-candidat` work?

### NOTES

- french translations are just whatever Google suggested
- would spend more time structuring CSS (either modules, tailwind, styled components, etc)
- I randomly picked what "tags" to feature on a mortgage product card, as well as the sorting options ¯\_(ツ)\_/¯
