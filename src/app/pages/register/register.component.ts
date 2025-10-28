import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  formLogin;
  
  //, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[A-Za-z\\d]{8,}$')
  constructor(private formSvc:FormBuilder,
    private auth:AuthService
  ){
    this.formLogin = this.formSvc.group({
      'nameUser':['',[Validators.required, Validators.minLength(2)]],
      'email':['',[Validators.required, Validators.email]],
      'password':['',[Validators.required]]
    })
  }
  
  onSubmit(){
    console.log(this.formLogin.value);
    this.auth.login(this.formLogin.value as any);
  }

  getError(control:string){
    switch(control){
      case 'nameUser': 
      if(this.formLogin.controls.password.errors!=null && 
         Object.keys(this.formLogin.controls.password.errors).includes('required'))
         return "El campo de usuario es requerido";
      break;
      case 'email':
        if(this.formLogin.controls.email.errors!=null && 
           Object.keys(this.formLogin.controls.email.errors).includes('required'))
           return "El campo email es requerido";
        else if(this.formLogin.controls.email.errors!=null && 
           Object.keys(this.formLogin.controls.email.errors).includes('email'))
           return "El email no es correcto";
        
        break;
      case 'password': 
        if(this.formLogin.controls.password.errors!=null && 
           Object.keys(this.formLogin.controls.password.errors).includes('required'))
           return "El campo de contraseña es requerido";
        break;
      default:return "";
    }
    return "";
  }
}
