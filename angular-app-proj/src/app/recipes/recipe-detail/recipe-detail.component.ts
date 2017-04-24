import { Params, ActivatedRoute } from '@angular/router';
import { RecipeService } from './../recipe.service';
import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {

  recipe: Recipe;
  id: number;

  constructor(private _recipeService: RecipeService, private _route: ActivatedRoute) { }

  ngOnInit() {
    this._route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.recipe = this._recipeService.getRecipe(this.id);
      }
    );
  }

  onAddToShoppingList() {
    this._recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }
}
