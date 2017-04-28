import { Response, Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';
import { Recipe } from '../recipes/recipe.model';

@Injectable()
export class DataStorageService {

  constructor(private _http: Http, private _recipeService: RecipeService) { }

  storeRecipes() {
    return this._http.put('https://ng-recipe-book-8e62b.firebaseio.com/recipes.json', this._recipeService.getRecipes())
      .map(
      (response: Response) => {
        return response.json();
      }
      )
      .catch(
      (error: Response) => {
        console.log(error);
        // return Observable.throw(error);
        throw error;
      })
      ;
  }

  getRecipes() {
    this._http.get('https://ng-recipe-book-8e62b.firebaseio.com/recipes.json')
      .subscribe(
      (response: Response) => {
        const recipes: Recipe[] = response.json();
        // console.log(recipes);
        this._recipeService.setRecipes(recipes);
      }
      );
  }
}
