import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { USER_LOGIN_URL, USER_REGISTER_URL } from '../shared/constants/urls';
import { IUserLogin } from '../shared/interfaces/iUserLogin';
import { User } from '../shared/models/User';
import {ToastrService} from 'ngx-toastr';
import { IUserRegister } from '../shared/interfaces/iUserRegister';

const USER_KEY = 'User';
@Injectable({
  providedIn: 'root'
})
export class UserService {      // newUser() ako ga nema u localStorage
  private userSubject = new BehaviorSubject<User>(this.getUserFromLocalStorage());
  //Read only observable od userSubject
  public userObservable:Observable<User>;

  constructor(private http:HttpClient,private toastrService:ToastrService) { 
    this.userObservable = this.userSubject.asObservable();

  }

  public get currentUser():User{
    return this.userSubject.value;
  }

  // saljemo url i body.
  login(userLogin:IUserLogin):Observable<User>{
    return this.http.post<User>(USER_LOGIN_URL,userLogin).pipe(
      tap({
        next: (user) =>{
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.toastrService.success(
            `Welcome to Foodmine ${user.name}!`,
            'Login Successful'
          )
        },
        //server error response
        error: (errorResponse) =>{
          this.toastrService.error(errorResponse.error,'Register Failed');
        }
      })
    );
  }

  
  register(userRegister:IUserRegister):Observable<User>{
    return this.http.post<User>(USER_REGISTER_URL,userRegister).pipe(
      tap({
        next: (user) =>{
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.toastrService.success(
            `Welcome to Foodmine ${user.name}!`,
            'Register Successful'
          )
        },
        error: (errorResponse) =>{
          this.toastrService.error(errorResponse.error,'Login Failed');
        }
      })
    )
  }

  // UserSubject je empty user,local storage ociscen,page relodovan
  logout(){
    this.userSubject.next(new User());
    localStorage.removeItem(USER_KEY);
    window.location.reload();
  }

  // Local storage user

  private setUserToLocalStorage(user:User){
    localStorage.setItem(USER_KEY,JSON.stringify(user));
  }

  private getUserFromLocalStorage():User{
    const userJson = localStorage.getItem(USER_KEY);
    if(userJson) return JSON.parse(userJson) as User;
    return new User();
  }

}
