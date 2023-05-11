import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbCarouselModule, NgbModule, NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CartComponent } from './components/cart/cart.component';
import { CategoryComponent } from './components/category/category.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PaymentComponent } from './components/payment/payment.component';
import { ProductComponent } from './components/product/product.component';
import { RegisterComponent } from './components/register/register.component';
import { AccountInfoComponent } from './components/account-info/account-info.component';
import { SidebarAccountComponent } from './components/sidebar-account/sidebar-account.component';
import { OrderComponent } from './components/order/order.component';
import { AddressComponent } from './components/address/address.component';
import { AddressUpdateComponent } from './components/address-update/address-update.component';
import { ShippingComponent } from './components/shipping/shipping.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { ReviewComponent } from './components/review/review.component';
import { PaymentInfoComponent } from './components/payment-info/payment-info.component';
import { AssessmentComponent } from './components/assessment/assessment.component';
import { SearchComponent } from './components/search/search.component';
import { AssessmentModalComponent } from './components/assessment-modal/assessment-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent,
    LoginComponent,
    RegisterComponent,
    ProductComponent,
    PaymentComponent,
    CartComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    PageNotFoundComponent,
    AccountInfoComponent,
    SidebarAccountComponent,
    OrderComponent,
    AddressComponent,
    AddressUpdateComponent,
    ShippingComponent,
    OrderDetailComponent,
    ReviewComponent,
    PaymentInfoComponent,
    AssessmentComponent,
    SearchComponent,
    AssessmentModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgbModule,
    NgxPaginationModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right'
    }),
    BrowserAnimationsModule,
    NgbRatingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
