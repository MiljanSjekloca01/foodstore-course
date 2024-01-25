import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart } from '../shared/models/Cart';
import { CartItem } from '../shared/models/CartItem';
import { Food } from '../shared/models/Food';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  
  private cart:Cart = this.getCartFromLocalStorage();
  private cartSubject: BehaviorSubject<Cart> = new BehaviorSubject(this.cart);
  
  constructor() { }
  // Dodavanje u korpu ako vec ne postoji food sa istim id
  addToCart(food:Food):void{
    let cartItem = this.cart.items
    .find(item => item.food.id === food.id)
    if(cartItem)
      return;
    this.cart.items.push(new CartItem(food));
    this.setCartToLocalStorage();
  }
  // Novi niz cart.items bez foodId kojeg ocemo da maknemo
  // to jest Micanje iz korpe preko foodId
  removeFromCart(foodId: string):void{
    this.cart.items = this.cart.items
    .filter(item => item.food.id != foodId);
    this.setCartToLocalStorage();
  }
  // Price i Quantity Itema
  changeQuantity(foodId:string,quantity:number){
    let cartItem = this.cart.items.find(item => item.food.id === foodId);
    if(!cartItem) return;

    cartItem.quantity = quantity;
    cartItem.price = quantity * cartItem.food.price;
    this.setCartToLocalStorage();
  }
  // Brisanje korpe
  clearCart(){
    this.cart = new Cart();
    this.setCartToLocalStorage();
  }
  /* Reagovanje na promene u korpi preko servisa.Nema manipulacije nad vrednostima
   Posto observable moze samo da se prati */
  getCartObservable():Observable<Cart>{
    return this.cartSubject.asObservable();
  }

  getCart(): Cart{
    return this.cartSubject.value;
  }
  
  // Svaki put kad refreshamo page cart ce biti maknut ili ti ociscen
  // Da bi ostali podatci o korpi koristimo localstorage
  private setCartToLocalStorage(): void{
    // reduce da dobijemo sumu Totalnu price svih itema.
    this.cart.totalPrice = this.cart.items.reduce(
      (prevSum,currenItem) => prevSum + currenItem.price,0
    )
    // isto samo count svih itema
    this.cart.totalCount = this.cart.items.reduce(
      (prevSum,currentItem) => prevSum + currentItem.quantity,0
    )
    const cartJson = JSON.stringify(this.cart);
    localStorage.setItem("Cart",cartJson);
    this.cartSubject.next(this.cart);
  }

  private getCartFromLocalStorage(): Cart{
    const cartJson = localStorage.getItem("Cart");
    return cartJson ? JSON.parse(cartJson) : new Cart();
  }


  
}
