import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class authService {
  isLoggedIn(): boolean {

    return !!localStorage.getItem('user');
  }
}