import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartPageComponent } from './components/pages/cart-page/cart-page.component';
import { FoodPageComponent } from './components/pages/food-page/food-page.component';
import { HomeComponent } from './components/pages/home/home.component';

const routes: Routes = [
  { path: "search/:searchTerm",component:HomeComponent },
  { path: "",component:HomeComponent},
  { path:"food/:id", component: FoodPageComponent},
  { path: "tag/:tag", component: HomeComponent},
  { path: "cart-page",component: CartPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  

 }
