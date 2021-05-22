import { Component, OnInit } from '@angular/core';
import { Menu } from 'src/app/model/menu/menu';
import { MenuService } from 'src/app/services/menu/menu.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-list-menu',
  templateUrl: './list-menu.component.html',
  styleUrls: ['./list-menu.component.css']
})
export class ListMenuComponent implements OnInit {

  menuSet: Menu[];
  menuFil: Menu[];
  id_menu : '';
  id_menu_type : '';
  currentMenu = null;
  currentIndex = -1;
  collectionSize: number;
  searchTerm: string;
  closeModal: string;
  msgError = '';

  constructor(private menuService: MenuService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.refreshList();
  }

  triggerModal(content:any, val:Menu) {
    this.currentMenu = val
    this.retrieveMenu(this.currentMenu.id_menu)
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
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
    this.menuFil = this.menuSet.filter((val) => val.name.toLowerCase().includes(value));
    this.collectionSize = this.menuFil.length;
  }

  retrieveMenus(): void {
    this.menuService.getAllMenus()
      .subscribe(
        data => {
          this.menuSet = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  retrieveMenu(val:string): void {
    this.menuService.getMenu(val)
      .subscribe(
        data => {
          this.currentMenu = data;
        },
        error => {
          this.msgError =  error.message +' \n '+ error.error.message;
          console.log(error);
        });
  }

  updateMenu(): void {
   this.menuService.updateMenu(this.currentMenu.id_menu, this.currentMenu)
      .subscribe(
        data => {
          this.refreshList();
        },
        error => {
          console.log(error);
        });
  }

  deleteMenu(val1:string): void {
    this.menuService.deleteMenu(val1)
       .subscribe(
         data => {
           this.refreshList();
         },
         error => {
           console.log(error);
         });
   }

  setActiveMenu(menu : Menu, index : number): void {
    this.currentMenu = menu;
    this.currentIndex = index
  }

  refreshList(): void {
    this.retrieveMenus();
  }
}
