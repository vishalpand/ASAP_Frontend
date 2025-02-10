import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component'; // Adjust the import based on your file structure
import { YourIdeasComponent } from './pages/your-ideas/your-ideas.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent // Specify the component for the home route
  },

  {
    path: 'ideas',
    component: YourIdeasComponent // Specify the component for the home route
  },
  {
    path: 'login',
    component: LoginComponent // Specify the component for the home route
  },
  // You can add more routes here as needed
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
