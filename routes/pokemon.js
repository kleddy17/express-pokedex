const express = require('express');
const db = require('../models');
const { response } = require('express');
const router = express.Router();
const axios = require('axios');

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  // TODO: Get all records from the DB and render to view
  db.pokemon.findAll()
  .then(pokemon =>{
    res.render('index', {pokemon: pokemon, showButton:false})
  })
  
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  // TODO: Get form data and add a new record to DB
  db.pokemon.create(req.body)
  .then(createdFav=>{
    res.redirect('/pokemon')
  })
  
});


router.get('/:idx', (req, res)=> {
  let pokemonIndex=req.params.idx
  const pokemonUrl = `http://pokeapi.co/api/v2/pokemon/${pokemonIndex}`
  axios.get(pokemonUrl)
  .then(response=>{
    console.log(pokemonIndex)
    res.render('show', {pokemonIndex: response.data} )
  })
})



router.delete('/:idx' ,(req, res)=>{
    db.pokemon.destroy({
    where:{id:req.params.idx}
  })
  .then(numRowsDeleted=>{
    console.log('&&&&', numRowsDeleted)
    res.redirect('/pokemon')
  })
  .catch(err=>{
    res.send(err)
  })
})



module.exports = router;
