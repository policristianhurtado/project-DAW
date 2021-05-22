import { Component, OnInit } from '@angular/core';
import { Section } from 'src/app/model/menu/section/section';
import { Menu } from 'src/app/model/menu/menu';
import { SectionService } from 'src/app/services/menu/section/section.service';
import { MenuService } from 'src/app/services/menu/menu.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-list-section',
  templateUrl: './list-section.component.html',
  styleUrls: ['./list-section.component.css']
})
export class ListSectionComponent implements OnInit {

  sectionSet: Section[];
  menuSet: Menu[];
  sectionFil: Section[];
  id_section : '';
  id_section_type : '';
  currentSection = null;
  currentIndex = -1;
  collectionSize: number;
  searchTerm: string;
  closeModal: string;
  msgError = '';

  constructor(
    private sectionService: SectionService,
    private menuService: MenuService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.refreshList();
  }

  triggerModal(content:any, val:Section) {
    this.currentSection = val
    this.retrieveSection(this.currentSection.id_section)
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
    this.sectionFil = this.sectionSet.filter((val) => val.name.toLowerCase().includes(value));
    this.collectionSize = this.sectionFil.length;
  }

  retrieveSections(): void {
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

  retrieveSection(val:string): void {
    this.sectionService.getSection(val)
      .subscribe(
        data => {
          this.currentSection = data;
        },
        error => {
          this.msgError =  error.message +' \n '+ error.error.message;
          console.log(error);
        });
  }

  updateSection(): void {
   this.sectionService.updateSection(this.currentSection.id_section, this.currentSection)
      .subscribe(
        data => {
          this.refreshList();
        },
        error => {
          console.log(error);
        });
  }

  deleteSection(val1:string): void {
    this.sectionService.deleteSection(val1)
       .subscribe(
         data => {
           this.refreshList();
         },
         error => {
           console.log(error);
         });
   }

  setActiveSection(section : Section, index : number): void {
    this.currentSection = section;
    this.currentIndex = index
  }

  refreshList(): void {
    this.retrieveSections();
    this.retrieveMenus();
  }
}
