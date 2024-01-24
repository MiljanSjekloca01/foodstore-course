import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY_SUBSCRIPTION } from 'rxjs/internal/Subscription';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit{
  loginForm!:FormGroup;
  isSubmitted = false;
  returnUrl = '';
  constructor(private formBuilder:FormBuilder,
    private userService:UserService,
    private activatedRoute:ActivatedRoute,
    private router:Router){}
  
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      //prvi argument default value,drugi validatori
      email:['',[Validators.required,Validators.email]],
      password:['',Validators.required],
    });
    //snapshot zadnja vrednost activateRoute
    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl;
  }
  // Kreiranje gettera da bi smanjili kod
  //sad mozemo samo fc.email fc.password 
  get fc(){
    return this.loginForm.controls;
  }
  submit(){
    this.isSubmitted = true;
    if(this.loginForm.invalid) return;

    this.userService.login({email:this.fc.email.value,
      password:this.fc.password.value}).subscribe(() =>{
        this.router.navigateByUrl(this.returnUrl);
      });

    
  }
}
