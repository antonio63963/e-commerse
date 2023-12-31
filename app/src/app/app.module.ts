import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './shared/main-layout/main-layout.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { HttpClientModule } from '@angular/common/http';
import { QuillModule } from 'ngx-quill';
import { AUTH_INTERCEPTOR } from './shared/interceptors/auth-admin.interceptor';

import { ProductComponent } from './components/product/product.component';
import { LoadingComponent } from './shared/components/loading/loading.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GalleryComponent } from './components/gallery/gallery.component';
import { CartLabelComponent } from './components/cart-label/cart-label.component';

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    MainPageComponent,
    ProductPageComponent,
    CartPageComponent,
    ProductComponent,
    CartLabelComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    QuillModule,
    LoadingComponent,
    BrowserAnimationsModule,
    GalleryComponent
  ],
  providers: [AUTH_INTERCEPTOR],
  bootstrap: [AppComponent],
})
export class AppModule {}
