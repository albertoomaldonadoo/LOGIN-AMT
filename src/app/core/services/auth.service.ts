import { Injectable, signal } from '@angular/core';
import { Credentials } from '../models/credentials';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly _user:any=(
    {
      nameUser: "Alberto",
      suername: "Maldonado Triana",
      email: "alberto@gmail.com"
    }
  )
  user:any|null;
  constructor() { 
    this.user = signal<any>(null)

    let cookie = localStorage.getItem(`AUTHENTICATION`);
    if(cookie){
      this.user.set(this._user);
    }
  }

  login(credentials: Credentials) {
    const users: any[] = JSON.parse(localStorage.getItem('USERS') || '[]');
    const user = users.find(u => u.email === credentials.email && u.password === credentials.password);
  
    if (user) {
      localStorage.setItem('AUTHENTICATION', JSON.stringify(user));
      this.user.set(user);
      return true;
    } else {
      alert('Email o contraseña incorrectos');
      return false;
    }
  }

  logout(){
    localStorage.removeItem('AUTHENTICATION');
    this.user.set(null);
  }
}
