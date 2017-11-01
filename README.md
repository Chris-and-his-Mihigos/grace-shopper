# Notes for Ben

There are 4 things we wanted to address:
1) (Christian Sadi): I made a video thing and I know I need to refactor it, but I'm having trouble understanding exactly how the css works.
---referenced in clients/components/home - line 25
2) (Entire Group): With the goal of persisting our cart, are there some best practices that we can start from? Is there a reference page we can look at for dealing with our sessionId's?
---referenced in server/db/models/order - at the top
3) (Christian Mihigo): Should we create a current cart state key:value pair? This also relates to Question 2 above.
---referenced in client/store/orders - line 19
4) (Patrick): When eager loading the users via our products model, are we creating a potential security issue? Does the user's password also get eager loaded? Is there a way to avoid that or protect the user's password?
---referenced in server/api/products.js - line 6


# Grace Shopper Project

This is a 4-man team project to create an e-commerce website as students of Fullstack Academy. We've decided to sell vinyl records.

## Running this code in development

`npm run start-dev` will make great things happen!

If you want to run the server and/or webpack separately, you can also `npm run start-server` and `npm run build-client`.

## Contribution guide

The contribution process is...

1. Make an issue (or multiple issues) in this project's waffle on waffle.io
2. Code the feature/bug-fix on your local repo
3. Get it code reviewed by someone on the team, address any comments
4. Merge into master (with merge commit)
5. Sent a message on slack that you have merged with a brief description of the merge

### Linter Guide

* This project uses the AirBnB Style Guide for ESLint

### Commit message guide

[See here](https://seesparkbox.com/foundry/semantic_commit_messages)