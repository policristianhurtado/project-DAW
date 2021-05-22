import { Component, OnInit } from '@angular/core';
import { Pet, PetType } from 'src/app/model/pet';
import { VetService } from 'src/app/services/vet.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-list-pet',
  templateUrl: './list-pet.component.html',
  styleUrls: ['./list-pet.component.css']
})
export class ListPetComponent implements OnInit {

  petSet: Pet[];
  petTypeSet: PetType[];
  petFil: Pet[];
  id_pet : '';
  id_pet_type : '';
  currentPet = null;
  currentIndex = -1;
  collectionSize: number;
  searchTerm: string;
  closeModal: string;
  msgError = '';

  constructor(private vetService: VetService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.refreshList();
  }

  triggerModal(content:any, val:Pet) {
    this.currentPet = val
    this.retrievePet(this.currentPet.id_pet)
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
    this.petFil = this.petSet.filter((val) => val.name.toLowerCase().includes(value));
    this.collectionSize = this.petFil.length;
  }

  retrievePets(): void {
    this.vetService.getAllPets()
      .subscribe(
        data => {
          this.petSet = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  retrievePetTypes(): void {
    this.vetService.getAllPetType()
      .subscribe(
        data => {
          this.petTypeSet = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  retrievePet(val:string): void {
    this.vetService.getPet(val)
      .subscribe(
        data => {
          this.currentPet = data;
        },
        error => {
          this.msgError =  error.message +' \n '+ error.error.message;
          console.log(error);
        });
  }

  updatePet(): void {
   this.vetService.updatePet(this.currentPet.id_pet, this.currentPet)
      .subscribe(
        data => {
          this.refreshList();
        },
        error => {
          console.log(error);
        });
  }

  deletePet(val1:string): void {
    this.vetService.deletePet(val1)
       .subscribe(
         data => {
           this.refreshList();
         },
         error => {
           console.log(error);
         });
   }

  setActivePet(pet : Pet, index : number): void {
    this.currentPet = pet;
    this.currentIndex = index
  }

  refreshList(): void {
    this.retrievePets();
    this.retrievePetTypes();
  }
}
