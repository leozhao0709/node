import { ShoppingListService } from './../shopping-list/shopping-list.service';
import { Ingredient } from './../shared/ingredient.model';
import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {

  recipesChanged = new EventEmitter<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(
      'Tasty Schnitzel',
      'A super-tasty Schnitzel - just awesome!',
      'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
      [
        new Ingredient('Meat', 1),
        new Ingredient('French Fries', 20)
      ]),
    new Recipe(
      'Big Fat Burger',
      'What else you need to say?',
      'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
      [
        new Ingredient('Buns', 2),
        new Ingredient('Meat', 1)
      ])
  ];

  // private recipes: Recipe[] = [
  //   {
  //     name: 'Tasty Schnitzel',
  //     description: 'A super-tasty Schnitzel - just awesome!',
  //     imagePath: 'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
  //     ingredients: [
  //       // new Ingredient('Meat', 1),
  //       // new Ingredient('French Fries', 20)
  //       {
  //         name: 'Meat',
  //         amount: 1
  //       },
  //       {
  //         name: 'French Fries',
  //         amount: 20
  //       }
  //     ]
  //   },
  //   {
  //     name: 'Big Fat Burger',
  //     description: 'What else you need to say?',
  //     imagePath: 'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
  //     ingredients: [
  //       // new Ingredient('Buns', 2),
  //       // new Ingredient('Meat', 1)
  //       {
  //         name: 'Buns',
  //         amount: 2
  //       },
  //       {
  //         name: 'Meat',
  //         amount: 1
  //       }
  //     ]
  //   }
  // ];

  constructor(private _shoppingListService: ShoppingListService) { }

  /**
   * setRecipes
   */
  public setRecipes(recipes: Recipe[]) {
    console.log(this.recipes.slice());
    this.recipes = recipes;
    console.log(this.recipes.slice());
    this.recipesChanged.emit(this.recipes.slice());
  }

	/**
   * getRecipes
   */
  public getRecipes() {
    return this.recipes.slice();
  }

  /**
   * addIngredientsToShoppingList
   */
  public addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this._shoppingListService.addIngredients(ingredients);
  }

  /**
   * getRecipe
   */
  public getRecipe(id: number) {
    return this.recipes[id];
  }

  /**
   * addRecipe
   */
  public addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.emit(this.recipes.slice());
  }

  /**
   * updateRecipe
   */
  public updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.emit(this.recipes.slice());
  }

  /**
   * deleteRecipe
   */
  public deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.emit(this.recipes.slice());
  }
}
