import { Injectable, EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Injectable()
export class ShoppingListService {
  ingredientChanged = new EventEmitter<Ingredient[]>();
  startedEditing = new EventEmitter<number>();
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ];

  constructor() { }

  getIngredients(): Ingredient[] {
    return this.ingredients.slice();
    // return this.ingredients;
  }

  /**
   * getIngredient
   */
  public getIngredient(index: number): Ingredient {
    return this.ingredients[index];
  }

  // called in shopping list inner
  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientChanged.emit(this.ingredients.slice());
  }

  /**
   * addIngredients
   * called by recipe service
   */
  public addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    // this.ingredientChanged.emit(this.ingredients.slice());
  }

  /**
   * updateIngredient
   */
  public updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.ingredientChanged.emit(this.ingredients.slice());
  }

  /**
   * deleteIngredient
   */
  public deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientChanged.emit(this.ingredients.slice());
  }

}
