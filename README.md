# slush-webpack

> A [slush](http://slushjs.github.io) generator to scaffold a simple SPA application template with [karma](https://karma-runner.github.io) and [tape](https://github.com/substack/tape) for unit testing, serve for production and [webpack](https://webpack.js.org/) for development and building.

## Installation

Install `slush-webpack` globally:

```bash
npm install -g slush-webpack
```

Remember to install `slush` globally as well, if you haven't already:

```bash
npm install -g slush
```

## Usage

Create a new folder for your project:

```bash
mkdir my-app
```

Run the generator from within the new folder:

```bash
cd my-app

slush webpack
```

You will now be prompted to give some information to scaffold your application.

### Project structure

The project structure will look like this:

```
my-app/
├── .editorconfig
├── .gitignore                         # See "Gulpfile" below
├── karma.conf.js
├── package.json
├── README.md
├── webpack.config.js
└── src                                     # Source directory
│   ├── assets                              # Assets to be imported and bundled with webpack
│   │        └── .gitkeep
│   ├── index.html                          # The index.html / app layout template
│   └── main.js     
└── test                                    # Test directory
    └── main.js                             # All files inside test .js are [tape](https://github.com/substack/tape) tests run with karma.
```

### Scripts

#### Development

To start developing in your new generated project run:

```bash
npm run dev
```

Then head to `http://localhost:8080` in your browser.

The `dev` tasks starts webpack-dev-server with hot module replacement enabled

#### Tests

To run tests run:

```bash
npm test
```

#### Production ready build - a.k.a. dist

To make the app ready for deploy to production run:

```bash
npm run dist
```

Now you have a `./dist` folder with all your scripts and stylesheets concatenated and minified.

#### Production serve

To serve the app in production you can run the script:

```bash
npm start
```

Now you have a production server serving your app in the port 5000.

## License

MIT
