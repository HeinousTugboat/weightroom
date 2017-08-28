# Weightroom

This is a pet project of mine, still very much a work in process. It is both a front-end and a back-end for a weightlifting tracking app. It uses Node, Express and PostgreSQL on the backend for an API and to serve the pages, and it serves Pug, Sass and compiled TypeScript for the pages. This project serves two main purposes for me, first to get more experience actually building a functional app, most importantly I wanted to get the hang of building a front-end *without* using a framework, and secondly, getting used to working with the back-end and learning all the ins and outs of that. My plan is to continue adding pieces to this as I can, and learning more about Angular and Data Structures and APIs along the way.

## Structure
* src: where all the code lives..
    * api: the code that handles all /api/ calls, it's mostly a passthrough layer to the database code.
    * db: all the actual db code. Uses pg-promise.
    * models: the basic typings. They're separated out as I use them in both sides.
    * weightroom: the actual front-end code. This will need to be compiled into the ../../public folder before it's useful. It uses its own TSConfig separate from the Backend code. I have separate tasks set up in VS Code to compile the browser and, if desired, the server.
* stylesheets: where the SCSS is pulled from. It's live transpiled, so no CSS files floating around.
* views: the raw pug files that Express serves. Individual pages are in views, and then templates and partials are in deeper folders.
