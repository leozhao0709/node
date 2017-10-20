import { Response, Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import 'rxjs/Rx';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class DataStorageService {

  constructor(private _http: Http, private _recipeService: RecipeService, private _authService: AuthService) { }

  storeRecipes() {
    const token = this._authService.getToken();
    return this._http.put('https://ng-recipe-book-8e62b.firebaseio.com/recipes.json?auth=' + token, this._recipeService.getRecipes())
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
    const token = this._authService.getToken();

    this._http.get('https://ng-recipe-book-8e62b.firebaseio.com/recipes.json?auth=' + token)
      .subscribe(
      (response: Response) => {
        const recipes: Recipe[] = response.json();
        // console.log(recipes);
        this._recipeService.setRecipes(recipes);
      }
      );
  }
}
