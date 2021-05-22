import { PersonService } from './../../../services/person/person.service';
import { Component, OnInit } from '@angular/core';
import { Table } from 'src/app/model/table/table';
import { TableService } from 'src/app/services/table/table.service';
import { Person } from 'src/app/model/person/person';

@Component({
  selector: 'app-add-table',
  templateUrl: './add-table.component.html',
  styleUrls: ['./add-table.component.css']
})
export class AddTableComponent implements OnInit {

  table = new Table();
  submitted = false;
  msgError = '';
  personSet: Person[];

  constructor(
    private tableService: TableService,
    private PersonService: PersonService) { }

  ngOnInit(): void {
    this.refreshList();
  }

  saveTable(): void {
    const data = {
      id_table: this.table.id_table,
      table_number: this.table.table_number,
      location: this.table.location,
      state: "available",
      responsible: this.table.responsible,
    };

    this.tableService.createTable(data)
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

  newTable() {
    this.submitted = false;
    this.table.id_table = null;
    this.table.table_number = null;
    this.table.location = null;
    this.table.state = null;
    this.table.responsible = null;
  }

  retrievePerson(): void {
    this.PersonService.getAllPersons()
      .subscribe(
        data => {
          this.personSet = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }


  refreshList(): void {
    this.retrievePerson();
  }

}
