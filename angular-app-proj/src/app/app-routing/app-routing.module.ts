import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingListComponent } from '../shopping-list/shopping-list.component';
import { HomeComponent } from '../core/home/home.component';

const appRoutes: Routes = [
  // { path: '', redirectTo: 'recipes', pathMatch: 'full' },
  { path: '', component: HomeComponent },
  // tslint:disable-next-line:max-line-length
  { path: 'recipes', loadChildren: '../recipes/recipes.module#RecipesModule' }, // this is lazy load, if not using lazy loading, then please add Recipe module in appModule
  { path: 'shopping-list', component: ShoppingListComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })
  ],
  declarations: [],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
