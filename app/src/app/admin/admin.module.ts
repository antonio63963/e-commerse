import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminLayoutComponent } from './shared/admin-layout/admin-layout.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AddPageComponent } from './add-page/add-page.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { OrdersPageComponent } from './orders-page/orders-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { authGuard } from './shared/auth.guard';
import { QuillModule } from 'ngx-quill';
import { Compontents } from '../shared/components/components.module';
import { LoadingComponent } from '../shared/components/loading/loading.component';
import { ProductFormComponent } from './shared/components/product-form/product-form.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LoadingComponent,
    ProductFormComponent,
    RouterModule.forChild([
      {
        path: '',
        component: AdminLayoutComponent,
        children: [
          { path: '', redirectTo: '/admin/login', pathMatch: 'full' },
          { path: 'login', component: LoginPageComponent },
          { path: 'add', component: AddPageComponent, canActivate: [authGuard] },
          { path: 'dashboard', component: DashboardPageComponent, canActivate: [authGuard] },
          { path: 'product/:id/edit', component: EditPageComponent, canActivate: [authGuard] },
          { path: 'orders', component: OrdersPageComponent, canActivate: [authGuard] },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
  declarations: [
    AdminLayoutComponent,
    LoginPageComponent,
    AddPageComponent,
    DashboardPageComponent,
    EditPageComponent,
    OrdersPageComponent,

  ],
})
export class AppModule {}
