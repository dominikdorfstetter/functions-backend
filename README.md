# Sample Backend for firebase functions

This is a backend for todo items that a registered user can create, update and delete.

## What is in it?
It shows what database & auth triggers can do and some side effects are also implemented.

## Architecture

Everything is bundled together in the /functions/index.ts.

### Auth-Triggers

/functions/user/index.ts

### TODO Rest-Endpoint

/functions/todo/index.ts

I've implemented a single rest endpoint that triggers on **POST**, **PUT** and **DELETE**.
