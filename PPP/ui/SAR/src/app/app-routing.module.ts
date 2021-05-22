import { ListOrderComponent } from './components/order/list-order/list-order.component';
import { AddOrderComponent } from './components/order/add-order/add-order.component';
import { AddSectionComponent } from './components/section/add-section/add-section.component';
import { ListSectionComponent } from './components/section/list-section/list-section.component';
import { AddMenuComponent } from './components/menu/add-menu/add-menu.component';
import { ListMenuComponent } from './components/menu/list-menu/list-menu.component';
import { AddProductComponent } from './components/product/add-product/add-product.component';
import { ListProductComponent } from './components/product/list-product/list-product.component';
import { AddTableComponent } from './components/table/add-table/add-table.component';
import { ListTableComponent } from './components/table/list-table/list-table.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: 'pets', pathMatch: 'full' },
  { path: 'list_table', component: ListTableComponent },
  { path: 'add_table', component: AddTableComponent },
  { path: 'list_product', component: ListProductComponent },
  { path: 'add_product', component: AddProductComponent },
  { path: 'list_menu', component: ListMenuComponent },
  { path: 'add_menu', component: AddMenuComponent },
  { path: 'list_section', component: ListSectionComponent },
  { path: 'add_section', component: AddSectionComponent },
  { path: 'add_order', component: AddOrderComponent },
  { path: 'list_order', component: ListOrderComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
