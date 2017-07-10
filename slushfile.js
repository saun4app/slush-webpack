var gulp = require("gulp");
var conflict = require("gulp-conflict");
var template = require("gulp-template");
var rename = require("gulp-rename");
var inquirer = require("inquirer");
var _ = require("underscore.string");
var gitconfig = require("git-config");

gulp.task("default", function() {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What's your app name?",
        default: getNameProposal()
      },
      {
        type: "input",
        name: "version",
        message: "What's your app version?",
        default: "0.0.0"
      },
      {
        type: "input",
        name: "description",
        message: "What's your app description?",
        default: "A javascript application."
      },
      {
        type: "input",
        name: "author",
        message: "Who's your app author?",
        default: getAuthorProposal(gitconfig.sync())
      },
      {
        type: "input",
        name: "license",
        message: "What's your app license?",
        default: "MIT"
      }
    ])
    .then(function(answers) {
      return gulp
        .src([__dirname + "/template/**/*"])
        .pipe(
          template({
            name: "loteweb",
            version: "0.0.0",
            description: "A javascript application.",
            author: "Ignacio Picun <picunignacio@gmail.com>",
            license: "MIT"
          })
        )
        .on("error", console.error.bind(console))
        .pipe(
          rename(function(file) {
            if (file.basename[0] === "_") {
              file.basename = "." + file.basename.slice(1);
            }
          })
        )
        .on("error", console.error.bind(console))
        .pipe(conflict("./"))
        .on("error", console.error.bind(console))
        .pipe(gulp.dest("./"))
        .on("error", console.error.bind(console));
    });
});

function getNameProposal() {
  var path = require("path");
  try {
    return require(path.join(process.cwd(), "package.json")).name;
  } catch (e) {
    return path.basename(process.cwd());
  }
}

function getAuthorProposal(config) {
  return `${config.user.name} <${config.user.email}>`;
}
