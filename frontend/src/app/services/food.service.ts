import { Injectable } from '@angular/core';
import { sample_foods, sample_tags } from 'src/data';
import { Food } from '../shared/models/Food';
import { Tag } from '../shared/models/Tag';

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

  //Get food by id
  getFoodById(foodId:string):Food{
    return this.getAll().find(food => food.id == foodId) ?? new Food();

  }

  // Get all tags
  getAllTags():Tag[]{
    return sample_tags;
  }

  // Get All Foods by Tag
  getAllFoodsByTag(tag:string):Food[]{
    return tag == "All" ?
    this.getAll() :
    this.getAll().filter(food => food.tags?.includes(tag))
  }

  
  
}
