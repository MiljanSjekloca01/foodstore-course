import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';
import { CartPageComponent } from './components/pages/cart-page/cart-page.component';
import { CheckoutPageComponent } from './components/pages/checkout-page/checkout-page.component';
import { FoodPageComponent } from './components/pages/food-page/food-page.component';
import { HomeComponent } from './components/pages/home/home.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { RegisterPageComponent } from './components/pages/register-page/register-page.component';

const routes: Routes = [
  { path: "search/:searchTerm",component:HomeComponent },
  { path: "",component:HomeComponent},
  { path:"food/:id", component: FoodPageComponent},
  { path: "tag/:tag", component: HomeComponent},
  { path: "cart-page",component: CartPageComponent},
  { path: "login",component: LoginPageComponent},
  { path: "register",component: RegisterPageComponent},
  { path: "checkout",component: CheckoutPageComponent,canActivate:[AuthGuard]}
  //canActivate:[AuthGuard]
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  

 }
