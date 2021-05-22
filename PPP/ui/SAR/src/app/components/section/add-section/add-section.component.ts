import { Component, OnInit } from '@angular/core';
import { Section } from 'src/app/model/menu/section/section';
import { Menu } from 'src/app/model/menu/menu';
import { SectionService } from 'src/app/services/menu/section/section.service';
import { MenuService } from 'src/app/services/menu/menu.service';

@Component({
  selector: 'app-add-section',
  templateUrl: './add-section.component.html',
  styleUrls: ['./add-section.component.css']
})
export class AddSectionComponent implements OnInit {

  section = new Section();
  submitted = false;
  msgError = '';
  menuSet: Menu[];

  constructor(
    private sectionService: SectionService,
    private menuService: MenuService) { }

  ngOnInit(): void {
    this.refreshList();
  }

  saveSection(): void {
    const data = {
      name: this.section.name,
      menu_id: this.section.menu_id
    };

    this.sectionService.createSection(data)
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

  newSection() {
    this.submitted = false;
    this.section.name = null;
    this.section.menu_id = null;
  }

  refreshList(): void {
    this.retrieveMenus();
  }

}
