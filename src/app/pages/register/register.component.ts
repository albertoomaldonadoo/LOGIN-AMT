import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

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
              private auth:AuthService,
              private router: Router
  ){
    this.formLogin = this.formSvc.group({
      'nameUser':['',[Validators.required, Validators.minLength(2)]],
      'email':['',[Validators.required, Validators.email]],
      'password':['',[Validators.required]]
    })
  }
  
  onSubmit() {
    if (this.formLogin.valid) {
      const { nameUser, email, password } = this.formLogin.value;

      // Obtener usuarios existentes de localStorage
      let users: any[] = JSON.parse(localStorage.getItem('USERS') || '[]');

      // Comprobar si el email ya existe
      if (users.find(u => u.email === email)) {
        alert('El usuario ya está registrado con ese email');
        return;
      }

      // Guardar nuevo usuario
      users.push({ nameUser, email, password });
      localStorage.setItem('USERS', JSON.stringify(users));

      alert('Usuario registrado correctamente');

      // Redirigir al login
      this.router.navigate(['/login']);
    }
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
