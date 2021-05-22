import { SectionService } from '../../../services/menu/section/section.service';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product/product';
import { ProductService } from 'src/app/services/product/product.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Section } from 'src/app/model/menu/section/section';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {

  productSet: Product[];
  sectionSet: Section[];
  productFil: Product[];
  id_product: '';
  id_product_type: '';
  currentProduct = null;
  currentIndex = -1;
  collectionSize: number;
  searchTerm: string;
  closeModal: string;
  msgError = '';

  constructor(
    private productService: ProductService,
    private modalService: NgbModal,
    private sectionService: SectionService) { }

  ngOnInit(): void {
    this.refreshList();
  }

  triggerModal(content: any, val: Product) {
    this.currentProduct = val
    this.retrieveProduct(this.currentProduct.id_product)
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((res) => {
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
      return `with: ${reason}`;
    }
  }

  search(value: string): void {
    this.productFil = this.productSet.filter((val) => val.name.toLowerCase().includes(value));
    this.collectionSize = this.productFil.length;
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

  retrieveSection(): void {
    this.sectionService.getAllSections()
      .subscribe(
        data => {
          this.sectionSet = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
  /*
    retrieveProductTypes(): void {
      this.productService.getAllProductType()
        .subscribe(
          data => {
            this.productTypeSet = data;
            console.log(data);
          },
          error => {
            console.log(error);
          });
    }
  */
  retrieveProduct(val: string): void {
    this.productService.getProduct(val)
      .subscribe(
        data => {
          this.currentProduct = data;
        },
        error => {
          this.msgError = error.message + ' \n ' + error.error.message;
          console.log(error);
        });
  }

  updateProduct(): void {
    this.productService.updateProduct(this.currentProduct.id_product, this.currentProduct)
      .subscribe(
        data => {
          this.refreshList();
        },
        error => {
          console.log(error);
        });
  }

  deleteProduct(val1: string): void {
    this.productService.deleteProduct(val1)
      .subscribe(
        data => {
          this.refreshList();
        },
        error => {
          console.log(error);
        });
  }

  setActiveProduct(product: Product, index: number): void {
    this.currentProduct = product;
    this.currentIndex = index
  }

  refreshList(): void {
    this.retrieveProducts();
    this.retrieveSection();
  }
}
