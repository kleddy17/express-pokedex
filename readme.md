# Express Pokedex

Working with databases, especially through ORMs, can present quite a learning curve. We'll start by incorporating one database model into an application to save favorite Pokemon.

#### Backstory: Pokemon

If you're not familiar with Pokemon, Pokemon is a franchise/universe created by Satoshi Tajiri in 1995. It's a famous franchise in both the US and Japan. Fun facts:

- Pokemon is short for "Pocket Monsters"
- The Pokemon universe extends to games, trading cards, and TV
- [The Pokemon Company](https://en.wikipedia.org/wiki/The_Pok%C3%A9mon_Company) is headquartered in Bellevue, WA.

## Getting Started

We'll be using an existing application that uses the [PokeAPI](http://pokeapi.co/), a Pokemon API that allows us to get a list of Pokemon.

- Fork and clone this repository
- Run `npm install` to install dependencies
  - Use `nodemon` to start the server

#### Read the Code

- After setup, **STOP**. You're using an existing application, so make sure to read the code and ensure what the application does. Answer these questions you may want to ask yourself:

  - How does the app retrieve a list of Pokemon?
  KRISTI'S COMMENT
 // The app retrieves the list of Pokemon from the API of 'http://pokeapi.co/api/v2/pokemon/', and then it is named as the variable pokemonUrl//

  - How many Pokemon does the API call retrieve? Why that many?
  KRISTI'S COMMENT
  // The pokemon API call retrieves 151 pokemon. The programmer used slice to take only 151 pokemon from the data array results we get from the API.//


  - What are the routes defined in the application?
  KRISTI'S COMMENT
  // 
  1. Index/Home route has a list of pokemon with an option to favorite a pokemon/get route. 
  2. A get route in the controller pokemon.js, that takes you the favorited pokemon page, shows the pokemons sent to the database you created.  
  3. A post route that recieves the favorited pokemon and saves it to the database.
  //

  - Think about adding a Pokemon to your favorites.


    - How will this data be submitted?
    KRISTI'S COMMENT
    // The data is submitted on the home page when the user click on the add to favorites button. The add to favorites button is linked to the index.ejs file which hold the form. 

    - What will you have to do to save this data to a database?
    I have to create a db, 
    - What will you have to do to display favorite Pokemon?

## User Stories

- As a user, I want to select my favorite Pokemon and add them to a list of favorites.
- As a user, once I add a Pokemon to my list of favorites, I want to be redirected to my favorites page.

## Requirements

#### Part 1: Setup Database

Your first step will be to create a SQL database for your application. Recall the process:

1. Use `npm` to install the required modules for postgres and sequelize: `pg` and `sequelize`
2. Make sure your Postgres server is running (check for the elephant).
3. Run `sequelize init` to initialize Sequelize.
4. Update your newly created `config/config.json` file as we did in class. This means changing the credentials, updating the SQL flavor, and changing the database name to `pokedex`.
5. Run `sequelize db:create` to create your database inside of Postgres

#### Part 2: Create your Pokemon Model and Table

Our data model needs only one attribute: `name`.

1. Use the `sequelize model:create` command to make the `pokemon` model. This creates both the model JS and the migration JS files.
2. Use the `sequelize db:migrate` command to apply the migrations.
3. Confirm that your `database` and `model` are inside Postgres using the `terminal` or `Postico`

> Write this in the `node db-test.js` file.

```js
// Make sure to require your models in the files where they will be used.
const db = require("./models");

db.pokemon
  .create({
    name: "Pikachu",
  })
  .then(function (poke) {
    console.log("Created: ", poke.name);
  });

db.pokemon.findAll().then(function (poke) {
  console.log("Found: ", poke.name);
});
```

Test by running the file: `node db-test.js`.

#### Part 3: Integrating the database with the app

You'll want to add functionality to the following routes by incorporating the `pokemon` table you created.

- `GET /pokemon`
  - View: `views/pokemon/index.ejs`
  - Purpose: Retrieve all favorited Pokemon and display them on the page
  - What sequelize function will do this for us? 

  KRISTI'S COMMENT
  // db.pokemon.findAll()//
- `POST /pokemon`
  - The form for adding is already included on the main index page
  - View: none (redirect to `/pokemon`)
  - Purpose: Creates a new Pokemon and redirects back to `/pokemon`
  - What is the sequelize function we use here?

  KRISTI'S COMMENT
  // db.pokemon.create(req.body)//

#### Part 4: Display more info on each Pokemon

Add a route `GET /pokemon/:id` that renders a `show` page with information about the Pokemon with the corresponding row `id`.
KRISTI'S COMMENT
// This is achieved in my router.get(/:idx) route. To actually see the traits of a specific pokemon you have to go to localhost:3000/pokemon/1 or whatever number up to 151 to see each specific pokemon. I went to the array of response.data and picked diffrent data to display each trait. ///

- You can get detailed information about a Pokemon by passing the Pokemon's name to PokeAPI. You can retrieve images, abilities, stats, and moves through the API.
- Example: http://pokeapi.co/api/v2/pokemon/bulbasaur/

Check out the result of the pokemon API calls (or see the [doc page](http://pokeapi.co/)) for ideas on what data you could show. Show at least 4 pieces of data (e.g. attacks, habitat, etc.)

#### Part 5: Styling

When finished with the above, style the application more to your liking with CSS.

KRISTI'S COMMENTS
// I made my div smaller so that the don't take up the entire page. I also added a background image. //

## API Limits

You might notice the API doesn't return all the data it has at once. It has a
default limit of 20. That means if it has a list of 150 (or more) Pokemon it
will only return 20 at a time, by default.

<http://pokeapi.co/api/v2/pokemon/>

The API has a way to get around this limit. You can pass a different limit in
the query string. The limit allows you to ask the API to return more than it's
default amount.

Remember, query strings are parameters passed in the URL after a question mark
and separated with ampersands. They look like this:

```
http://mapwebsite.com/?lat=40.284&long=110.133&zoom=12
```

This is a URL. It consists of four parts:

1. the _protocol_ is `http://`
2. the _domain_ is `mapwebsite.com`
3. the _path_ is `/` (the root path)
4. the _query string_ is `?lat=40.284&long=110.133`

The query string is like a JavaScript object. There's keys and values.
This query string has three keys and values:

| Key  | Value   |
| ---- | ------- |
| lat  | 40.284  |
| long | 110.133 |
| zoom | 12      |

The Pokemon API is configured to read all sorts of keys and values from
the query string. Perhaps the most useful one we'll use is `limit`. Specifying
smaller or larger limits tells the server to send back more or less data.

Specify a limit of just one to see the first item in the list:
`<http://pokeapi.co/api/v2/pokemon?limit=1>`

Or, specify a limit of 151 to see all 151 pokemon!
`<http://pokeapi.co/api/v2/pokemon?limit=151>`

## Bonuses

- Add the ability to DELETE Pokemon from the favorites list.
- Rethink the `pokemon` table. Instead of it being a list of favorites, have it be a list of pokemon the user owns. What columns should the table have? `nickname`, `level`, etc... How would this change the app?

---

## Licensing

1. All content is licensed under a CC-BY-NC-SA 4.0 license.
2. All software code is licensed under GNU GPLv3. For commercial use or alternative licensing, please contact legal@ga.co.
