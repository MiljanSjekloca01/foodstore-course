import { Injectable } from '@angular/core';
import { sample_foods } from 'src/data';
import { Food } from '../shared/models/Food';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor() { }

  // za sada radi ovako a kasnije ce uzimati podatke iz bekenda
  getAll():Food[]{
    return sample_foods;
  }

  // Search Food 
  getAllFoodsBySearchTerm(searchTerm: string){
    return this.getAll().filter(food => food.name.toLowerCase().includes(searchTerm.toLowerCase()))
  }

  
}
