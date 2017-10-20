import { RecipeDetailComponent } from '../recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from '../recipe-edit/recipe-edit.component';
import { RecipeStartComponent } from '../recipe-start/recipe-start.component';
import { RecipesComponent } from '../recipes.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../../auth/auth-guard.service';

const recipeRoutes: Routes = [
  {
    // tslint:disable-next-line:comment-format
    // path: 'recipes', component: RecipesComponent, children: [ //this is used when not using lazy loading
    // tslint:disable-next-line:comment-format
    path: '', component: RecipesComponent, children: [ //lazy load using
      { path: '', component: RecipeStartComponent },
      { path: 'new', component: RecipeEditComponent, canActivate: [AuthGuardService] },
      { path: ':id', component: RecipeDetailComponent },
      { path: ':id/edit', component: RecipeEditComponent, canActivate: [AuthGuardService] }
    ]
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(recipeRoutes)
  ],
  declarations: [],
  exports: [
    RouterModule
  ]
})
export class RecipesRoutingModule { }
