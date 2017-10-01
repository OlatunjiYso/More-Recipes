
/* OOP Model for Recipes.
 */
class Recipes {
  constructor (chef, title, ingredients, description) {
    this.chef = chef;
    this.title = title;
    this.ingredients = ingredients;
    this.description = description;
    this.noOfFavorites = 0 ;
    this.reviews = [];
    this.views = 0;
  }

  makeFavorite() {
    this.noOfFavorites += 1;
  }

  postReview(opinion) {
    this.reviews.push(opinion);
  }

  update(title, ingredients, description) {
    this.title = title ;
    this.ingredients = ingredients;
    this.description = description ;
  }
}

export default Recipes;
