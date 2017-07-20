# slush-webpack

> A [slush](http://slushjs.github.io) generator to scaffold a simple SPA application template with [karma](https://karma-runner.github.io) and [tape](https://github.com/substack/tape) for unit testing, serve for production and [webpack](https://webpack.js.org/) for development and building.

## Installation

Install `gulp`, `slush` and `slush-webpack` globally:

```bash
npm install -g gulp
npm install -g slush
npm install -g slush-webpack
```


## Usage

### Create a new project folder and install packages:

You will now be prompted to give some information to scaffold your application.

```bash
mkdir my-app
cd my-app
slush webpack
npm install
```

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
npm run build
```

Now you have a `./dist` folder with all your scripts and stylesheets concatenated and minified.

#### Production serve

To serve the app in production you can run the script:

```bash
npm start
```

Now you have a production server serving your app from the `./dist` folder in port 5000.

## License

MIT
