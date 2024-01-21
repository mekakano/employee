import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import jsonArray from '../../model/data.js';
import { DataSource } from '@angular/cdk/collections/index.js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  datasource = jsonArray;
  registerForm:any = FormGroup;
  submitted = false;
  constructor( private formBuilder: FormBuilder, private router: Router){}
  //Add user form actions
  get f() { return this.registerForm.controls; }
  onSubmit() {
   
    this.submitted = true;
   
    if (this.registerForm.invalid) {
        return;
    }
    
    if(this.submitted)
    {
      let email = this.registerForm.get('email').value
      let adaemail = false;
      for (let i = 0; i < this.datasource.length; i++){
        if (this.datasource[i].email == email){
          
          this.router.navigate(['/dashboard']);
          adaemail = true;
        }
      }

      if (!adaemail){
        alert("email tidak terdaftar");
      }
      
    }
   
  }
    ngOnInit() {
      //Add User form validations
      this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
      });
    }
}
