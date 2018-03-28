#!/usr/bin/env node
const program = require('commander');
const clear = require('clear');
const emojic = require("emojic")

const entropayApi = require('./lib/entropay-api');

let ERRORS = [];

program
  .version('1.0')
  .option('-e, --email [value]', 'Specify an email address')
  .option('-u --username [value]', 'Specify a username')
  .option('-p, --password [value]', 'Specify a password')
  .parse(process.argv);

if(!program.email || !program.username || !program.password ) {
    ERRORS.push("Please provide valid email or username or password");
}

if(ERRORS.length > 0) {
    clear();
    console.log(ERRORS.join("\n"));
    return;
}

entropayApi.signup(program.username, program.email, program.password)
.then(email => {
    console.log(emojic.whiteCheckMark + "\nAccount created");
})
.catch(error => {
    console.log(emojic.x + `\nAn error occured: ${error}`);
    return;
});