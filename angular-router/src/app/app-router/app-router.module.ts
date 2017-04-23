import { ServersComponent } from './../servers/servers.component';
import { UsersComponent } from './../users/users.component';
import { HomeComponent } from './../home/home.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule, Router } from '@angular/router';
import { UserComponent } from '../users/user/user.component';
import { EditServerComponent } from '../servers/edit-server/edit-server.component';
import { ServerComponent } from '../servers/server/server.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { AuthGuardService } from '../auth-guard.service';
import { CanDeactivateGuardService } from '../servers/edit-server/can-deactivate-guard.service';
import { ErrorPageComponent } from '../error-page/error-page.component';
import { ServerResolverService } from '../servers/server/server-resolver.service';

const appRouters: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'users', component: UsersComponent, children: [
      { path: ':id/:name', component: UserComponent },
    ]
  },
  {
    path: 'servers',
    // canActivate: [AuthGuardService],
    canActivateChild: [AuthGuardService],
    component: ServersComponent,
    children: [
      // { path: 'not-found', component: PageNotFoundComponent },
      { path: ':id', component: ServerComponent, resolve: { server: ServerResolverService } },
      { path: ':id/edit', component: EditServerComponent, canDeactivate: [CanDeactivateGuardService] },
      // { path: '**', redirectTo: 'not-found' }
    ]
  },
  // { path: 'not-found', component: PageNotFoundComponent },
  { path: 'not-found', component: ErrorPageComponent, data: { message: 'Page not found!' } },
  { path: '**', redirectTo: 'not-found' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRouters, { useHash: true })
  ],
  declarations: [],
  exports: [RouterModule]
})
export class AppRouterModule { }
