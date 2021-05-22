import { TableService } from './../../../services/table/table.service';
import { PersonService } from './../../../services/person/person.service';
import { Table } from 'src/app/model/table/table';
import { Person } from 'src/app/model/person/person';
import { ProductService } from 'src/app/services/product/product.service';
import { Product } from 'src/app/model/product/product';
import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/model/order/order';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css']
})
export class AddOrderComponent implements OnInit {

  order = new Order();
  submitted = false;
  msgError = '';
  productSet: Product[];
  customerSet: Person[];
  tableSet: Table[];

  constructor(
    private orderService: OrderService,
    private productService: ProductService,
    private personService: PersonService,
    private tableService: TableService) { }

  ngOnInit(): void {
    this.refreshList();
  }

  saveOrder(): void {
    const data = {
      id_order: this.order.id_order,
      customer_id: this.order.customer_id,
      table_id: this.order.table_id,
      product_id: this.order.product_id,
      note: this.order.note,
      stage: "to_do",
    };

    this.orderService.createOrder(data)
      .subscribe(
        response => {
          this.submitted=true;
          console.log(response);
        },
        error => {
          this.msgError  = error.message +' \n '+ error.error.message;
          console.log(error);
        });
      }

  newOrder() {
    this.submitted = false;
    this.order.id_order = null;
    this.order.customer_id = null;
    this.order.table_id = null;
    this.order.product_id = null;
    this.order.note = null;
  }

  retrieveProducts(): void {
    this.productService.getAllProducts()
      .subscribe(
        data => {
          this.productSet = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  retrieveTables(): void {
    this.tableService.getAllTables()
      .subscribe(
        data => {
          this.tableSet = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  retrievePersons(): void {
    this.personService.getAllPersons()
      .subscribe(
        data => {
          this.customerSet = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  refreshList(): void {
    this.retrievePersons();
    this.retrieveTables();
    this.retrieveProducts();
  }
}
