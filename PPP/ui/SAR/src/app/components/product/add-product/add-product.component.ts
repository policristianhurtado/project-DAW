import { Section } from './../../../model/menu/section/section';
import { SectionService } from './../../../services/menu/section/section.service';
import { ProductService } from '../../../services/product/Product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product/product';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  product = new Product();
  submitted = false;
  msgError = '';
  sectionSet: Section[];

  constructor(
    private productService: ProductService,
    private sectionService: SectionService) { }

  ngOnInit(): void {
    this.refreshList();
  }

  saveProduct(): void {
    const data = {
      id_product: this.product.id_product,
      name: this.product.name,
      price: this.product.price,
      description: this.product.description,
      stage: "available",
      section_id: this.product.section_id,
    };

    this.productService.createProduct(data)
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

  newProduct() {
    this.submitted = false;
    this.product.name = null;
    this.product.price = null;
    this.product.description = null;
    this.product.stage = null;
    this.product.section_id = null;
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


  refreshList(): void {
    this.retrieveSection();
  }

}
