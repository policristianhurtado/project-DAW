import { PersonService } from './../../../services/person/person.service';
import { Component, OnInit } from '@angular/core';
import { Table } from 'src/app/model/table/table';
import { TableService } from 'src/app/services/table/table.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Person } from 'src/app/model/person/person';

@Component({
  selector: 'app-list-table',
  templateUrl: './list-table.component.html',
  styleUrls: ['./list-table.component.css']
})
export class ListTableComponent implements OnInit {

  tableSet: Table[];
  personSet: Person[];
  tableFil: Table[];
  id_table: '';
  id_table_type: '';
  currentTable = null;
  currentIndex = -1;
  collectionSize: number;
  searchTerm: string;
  closeModal: string;
  msgError = '';

  constructor(
    private tableService: TableService,
    private modalService: NgbModal,
    private personService: PersonService) { }

  ngOnInit(): void {
    this.refreshList();
  }

  triggerModal(content: any, val: Table) {
    this.currentTable = val
    this.retrieveTable(this.currentTable.id_table)
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
    this.tableFil = this.tableSet.filter((val) => val.location.toLowerCase().includes(value));
    this.collectionSize = this.tableFil.length;
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

  retrievePerson(): void {
    this.personService.getAllPersons()
      .subscribe(
        data => {
          this.personSet = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
  /*
    retrieveTableTypes(): void {
      this.tableService.getAllTableType()
        .subscribe(
          data => {
            this.tableTypeSet = data;
            console.log(data);
          },
          error => {
            console.log(error);
          });
    }
  */
  retrieveTable(val: string): void {
    this.tableService.getTable(val)
      .subscribe(
        data => {
          this.currentTable = data;
        },
        error => {
          this.msgError = error.message + ' \n ' + error.error.message;
          console.log(error);
        });
  }

  updateTable(): void {
    this.tableService.updateTable(this.currentTable.id_table, this.currentTable)
      .subscribe(
        data => {
          this.refreshList();
        },
        error => {
          console.log(error);
        });
  }

  deleteTable(val1: string): void {
    this.tableService.deleteTable(val1)
      .subscribe(
        data => {
          this.refreshList();
        },
        error => {
          console.log(error);
        });
  }

  setActiveTable(table: Table, index: number): void {
    this.currentTable = table;
    this.currentIndex = index
  }

  refreshList(): void {
    this.retrieveTables();
    this.retrievePerson();
  }
}
