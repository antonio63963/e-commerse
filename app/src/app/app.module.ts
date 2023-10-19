import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './shared/main-layout/main-layout.component';
import { MainPageComponent } from './main-page/main-page.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { AdminLayoutComponent } from './admin/shared/admin-layout/admin-layout.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { QuillModule } from 'ngx-quill';
import { AUTH_INTERCEPTOR, AuthInterceptor } from './shared/interceptors/auth-admin.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    MainPageComponent,
    ProductPageComponent,
    CartPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    QuillModule
  ],
  providers: [AUTH_INTERCEPTOR],
  bootstrap: [AppComponent]
})
export class AppModule { }
