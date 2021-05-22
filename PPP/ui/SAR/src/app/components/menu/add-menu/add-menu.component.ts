import { Component, OnInit } from '@angular/core';
import { Menu } from 'src/app/model/menu/menu';
import { MenuService } from 'src/app/services/menu/menu.service';

@Component({
  selector: 'app-add-menu',
  templateUrl: './add-menu.component.html',
  styleUrls: ['./add-menu.component.css']
})
export class AddMenuComponent implements OnInit {

  menu = new Menu();
  submitted = false;
  msgError = '';

  constructor(private menuService: MenuService) { }

  ngOnInit(): void {
  }

  saveMenu(): void {
    const data = {
      id_menu: this.menu.id_menu,
      name: this.menu.name,
    };

    this.menuService.createMenu(data)
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

  newMenu() {
    this.submitted = false;
    this.menu.id_menu = null;
    this.menu.name = null;
  }
}
