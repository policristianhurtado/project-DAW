import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/model/order/order';
import { OrderService } from 'src/app/services/order/order.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { Product } from 'src/app/model/product/product';
import { Person } from 'src/app/model/person/person';
import { Table } from 'src/app/model/table/table';
import { ProductService } from 'src/app/services/product/Product.service';
import { PersonService } from 'src/app/services/person/person.service';
import { TableService } from 'src/app/services/table/table.service';

@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrls: ['./list-order.component.css']
})
export class ListOrderComponent implements OnInit {

  orderSet: Order[];
  orderFil: Order[];
  productSet: Product[];
  customerSet: Person[];
  tableSet: Table[];
  id_order : '';
  id_order_type : '';
  currentOrder = null;
  currentState = null;
  currentIndex = -1;
  collectionSize: number;
  searchTerm: string;
  closeModal: string;
  msgError = '';

  constructor(
    private orderService: OrderService,
    private productService: ProductService,
    private personService: PersonService,
    private tableService: TableService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.refreshList();
  }

  triggerModal(content:any, val:Order) {
    this.currentOrder = val
    this.retrieveOrder(this.currentOrder.id_order)
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
      this.closeModal = `Closed with: ${res}`;
    }, (res) => {
      this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
    });
  }

  triggerModalState(content:any, val:Order) {
    this.currentState = val
    this.retrieveOrder(this.currentState.id_order)
    this.modalService.open(content, {ariaLabelledBy: 'modal-state'}).result.then((res) => {
      this.closeModal = `Closed with: ${res}`;
    }, (res) => {
      this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
    });
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  search(value: string): void {
    this.orderFil = this.orderSet.filter((val) => val.note.toLowerCase().includes(value));
    this.collectionSize = this.orderFil.length;
  }

  retrieveOrders(): void {
    this.orderService.getAllOrders()
      .subscribe(
        data => {
          this.orderSet = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  retrieveOrder(val:string): void {
    this.orderService.getOrder(val)
      .subscribe(
        data => {
          this.currentOrder = data;
        },
        error => {
          this.msgError =  error.message +' \n '+ error.error.message;
          console.log(error);
        });
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

  updateOrder(): void {
   this.orderService.updateOrder(this.currentOrder.id_order, this.currentOrder)
      .subscribe(
        data => {
          this.refreshList();
        },
        error => {
          console.log(error);
        });
  }

  deleteOrder(val1:string): void {
    this.orderService.deleteOrder(val1)
       .subscribe(
         data => {
           this.refreshList();
         },
         error => {
           console.log(error);
         });
   }

   stateOrder(): void {
    this.orderService.stateOrder(this.currentState.id_order, this.currentState)
       .subscribe(
         data => {
           this.refreshList();
         },
         error => {
           console.log(error);
         });
   }

  setActiveOrder(order : Order, index : number): void {
    this.currentOrder = order;
    this.currentIndex = index
  }

  refreshList(): void {
    this.retrieveOrders();
    this.retrievePersons();
    this.retrieveProducts();
    this.retrieveTables();
  }
}
