import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TestComponent } from './components/test/test.component';
import { CreateSkullComponent } from './components/dashboard/dialogs/create-skull/create-skull.component';
import { SharedSkullComponent } from './components/dashboard/shared-skull/shared-skull.component';
//import { ShareSkullComponent } from './components/dashboard/dialogs/share-skull/share-skull.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'skull/:idSkull',
    component:SharedSkullComponent
  },
  {
    path: 'createSkull',
    component: CreateSkullComponent
  }
  ,
/*   {
    path: 'test',
    component: TestComponent
  } */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
