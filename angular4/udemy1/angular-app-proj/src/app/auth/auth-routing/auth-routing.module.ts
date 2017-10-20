import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from '../signup/signup.component';
import { SigninComponent } from '../signin/signin.component';

const authRouting: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: 'signin', component: SigninComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(authRouting)
  ],
  declarations: [],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
