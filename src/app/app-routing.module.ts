import { AddProductsComponent } from './components/products/add-products/add-products.component';
import { ProductsComponent } from './components/products/products.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from "@angular/core";
import {Routes, RouterModule } from "@angular/router";
import { SignupComponent } from './components/signup/signup.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';





const routes : Routes=[
  {path:"" , component : HomeComponent},
  {path:"dashboard", children :
    [
        {path:"" , component : DashboardComponent },
        {path:"book" ,children :
          [
           {path:"",component : ProductsComponent},
            {path:"add" ,  component : AddProductsComponent}
          ] },
    ]
  ,
  canActivate : [AuthGuard] },

  {path:"side",component : SidebarComponent},
  {path:"**" , component:ErrorPageComponent}


] ;


@NgModule({
  imports : [RouterModule.forRoot(routes)],
  exports : [RouterModule]
})
export class AppRoutingModule{}
