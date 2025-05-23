import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './home/register/register.component';
import { StoreComponent } from './store/store.component';
import { MainPageComponent } from './main-page/main-page.component';
import { CartComponent } from './cart/cart.component';
import { AccountComponent } from './account/account.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactComponent } from './contact/contact.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { AddProductsComponent } from './add-products/add-products.component';
import { GetMessagesComponent } from './get-messages/get-messages.component';
import { OrdersComponent } from './orders/orders.component';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
    {path:"***", redirectTo: 'home', pathMatch: 'full' },
    {path:'home', component: HomeComponent}, 
    {path: 'register', component: RegisterComponent},
    {
        path: 'mainPage',
        component: MainPageComponent,
        canActivate: [authGuard] ,
        children: [
          { path: 'store', component: StoreComponent },
          { path: 'cart', component: CartComponent },
          { path: 'account', component: AccountComponent },
          { path: 'aboutUs', component: AboutUsComponent },
          { path: 'contact', component: ContactComponent },
          { path: 'purchase', component: PurchaseComponent },
          { path: 'details', component: ProductDetailsComponent },
          { path: 'add', component: AddProductsComponent },
          { path: 'getMessages', component: GetMessagesComponent },
          { path: 'orders', component: OrdersComponent }
        ]
    }
    
];
