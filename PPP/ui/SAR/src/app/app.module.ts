import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddTableComponent } from './components/table/add-table/add-table.component';
import { ListTableComponent } from './components/table/list-table/list-table.component';
import { AddProductComponent } from './components/product/add-product/add-product.component';
import { ListProductComponent } from './components/product/list-product/list-product.component';
import { AddMenuComponent } from './components/menu/add-menu/add-menu.component';
import { ListMenuComponent } from './components/menu/list-menu/list-menu.component';
import { AddSectionComponent } from './components/section/add-section/add-section.component';
import { ListSectionComponent } from './components/section/list-section/list-section.component';
import { ListOrderComponent } from './components/order/list-order/list-order.component';
import { AddOrderComponent } from './components/order/add-order/add-order.component';

import { ListFilterPipeLocation } from './services/listerfilterLocation.service';
import { ListFilterPipeName } from './services/listerfilterName.service';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AppComponent,
    AddTableComponent,
    ListTableComponent,
    AddProductComponent,
    ListProductComponent,
    AddMenuComponent,
    ListMenuComponent,
    ListFilterPipeLocation,
    ListFilterPipeName,
    AddSectionComponent,
    ListSectionComponent,
    AddOrderComponent,
    ListOrderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
