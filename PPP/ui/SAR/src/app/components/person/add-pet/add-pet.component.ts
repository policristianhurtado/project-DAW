import { Component, OnInit } from '@angular/core';
import { Pet, PetType } from 'src/app/model/pet';
import { VetService } from 'src/app/services/vet.service';

@Component({
  selector: 'app-add-pet',
  templateUrl: './add-pet.component.html',
  styleUrls: ['./add-pet.component.css']
})
export class AddPetComponent implements OnInit {

  pet = new Pet();
  submitted = false;
  msgError = '';
  petTypeSet: PetType[];

  constructor(private vetService: VetService) { }

  ngOnInit(): void {
    this.refreshList();
  }

  savePet(): void {
    const data = {
      id_pet: this.pet.id_pet,
      name: this.pet.name,
      pet_type: this.pet.pet_type,
      race: this.pet.race,
      owner: this.pet.owner,
    };

    this.vetService.createPet(data)
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

  newPet() {
    this.submitted = false;
    this.pet.id_pet = null;
    this.pet.name = null;
    this.pet.pet_type = null;
    this.pet.race = null;
    this.pet.owner = null;
  }

  refreshList(): void {
    this.retrievePetTypes();
  }

}
