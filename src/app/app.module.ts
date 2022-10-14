
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from './app-routing.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { MaterialModule } from './shared/material/material.module';
import {MatSliderModule} from '@angular/material/slider';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SignupComponent } from './components/signup/signup.component'
import { NgxUiLoaderModule , NgxUiLoaderConfig , SPINNER , PB_DIRECTION} from 'ngx-ui-loader';
import { LoginComponent } from './components/login/login.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ProductsComponent } from './components/products/products.component';
import { AddProductsComponent } from './components/products/add-products/add-products.component';



const ngxUiLoaderConfig : NgxUiLoaderConfig = {
  text:"Loading...",
  textColor:"#FFFFFF",
  textPosition:"center-center",
  pbColor:"blue",
  bgsColor:"blue",
  fgsType : SPINNER.threeStrings,
  pbDirection:PB_DIRECTION.leftToRight, // hadi hiya  li kat b9a  t3mar l for latban b7al kat charga
  pbThickness : 5
}
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    SignupComponent,
    LoginComponent,
    ForgotPasswordComponent,
    ErrorPageComponent,
    DashboardComponent,
    SidebarComponent,
    ProductsComponent,
    AddProductsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    FlexLayoutModule,
    MaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatSliderModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig)

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
