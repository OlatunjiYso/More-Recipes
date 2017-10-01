import express from 'express';
import Recipes from '../Model/recipeModels';

const router = express.Router();


router.get('/', (req, res) => {
  res.send('All is working fine');
});

const allRecipes = [];
// Get all recipes handler
router.get('/recipes', (req, res) => {
  if (allRecipes.length === 0) {
    res.json({ message: 'No recipes found' })
  }
  else {
    res.json(allRecipes);
  }
});

// Add recipes handler
router.post('/recipes', (req, res) => {
  const newRecipe = new Recipes(req.body.chef,
    req.body.title, req.body.ingredients, req.body.description)
allRecipes.push(newRecipe)
res.json({ message: 'You have sucessfully added a new recipe' })
}); // end of add recipe handler.

// Modify recipes
router.put('/recipes/:recipeTitle', (req, res) => {
  let found = 0;
  for (let recipe of allRecipes) {
    if (recipe.title === req.params.recipeTitle) {
       recipe.update( req.body.title, req.body.ingredients, req.body.description);
       found += 1;
    }
  }

  if (found > 0) {
    res.json({ message: 'Recipe was modified' })
  }
  else {
    res.json({ message: 'Recipe not found' })
  }
});

// Deleting recipes
router.delete('/recipes/:recipeTitle', (req, res) => {
  let found = 0;
  for (let recipe of allRecipes) {
    if (recipe.title == req.params.recipeTitle) {
       allRecipes.pop(recipe);
       found += 1;
    }
  }

  if (found > 0) {
    res.json({ message: 'Recipe was deleted' })
  }
  else {
    res.json({ message: 'Recipe not found' })
  }
});

//Adding review to recipes...
router.post('/recipes/:recipeTitle', (req, res) => {
  let found = 0;
  for (let recipe of allRecipes) {
    if (recipe.title === req.params.recipeTitle) {
       recipe.postReview(req.body.opinion);
      found += 1;
    }
  }

  if (found > 0) {
    res.json({ message: 'Review has been posted' })
  }
  else {
    res.json({ message: 'Recipe not found' })
  }
});

// finding most favourited recipe...
router.get('/recipes/mostfavorited', (req, res, next)=> {
  const highestFavouriteCount = 0;
  let mostFavorited = {};
  for(let recipe of allRecipes) {
    if(recipe.noOfFavorites > highestFavouriteCount) {
      mostFavorited = recipe;
    }
  }
  res.json(mostFavorited);
});

// to vote up
  router.post('/recipes/makeFavorite/:recipeTitle', (req, res, next)=> {
  let found = 0;
    for (let recipe of allRecipes) {
      if (recipe.title === req.params.recipeTitle) {
         recipe.makeFavorite();
         found += 1;
    }
  }

  if (found > 0) {
    res.json({ message: 'Reaction has been recorded' })
  }
  else {
    res.json({ message: 'Recipe not found' })
  }
})



export default router;
