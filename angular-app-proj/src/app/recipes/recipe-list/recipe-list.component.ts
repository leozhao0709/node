import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {
  @Output()
  recipeWasSelected = new EventEmitter<Recipe>();

  recipes: Recipe[] = [
    new Recipe('test recipe', 'This is a simply test', 'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg'),
    new Recipe('Another test recipe', 'This is a simply test', 'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg')
  ];

  constructor() { }

  ngOnInit() {
  }

  /**
   * onRecipeSelected
   */
  public onRecipeSelected(recipe: Recipe) {
    this.recipeWasSelected.emit(recipe);
  }
}
