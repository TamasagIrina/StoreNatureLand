import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { product } from '../interfaces/product.interface';
import { cartProduct } from '../interfaces/cartProduct.interface';
import { Router } from '@angular/router';
import { User } from '../interfaces/user.interface';
import { T } from '@angular/cdk/keycodes';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  poduct: product[]=[]; 

  user: User[]=[];

  cartProuct: cartProduct[]=[];

  readonly API_URL = 'http://localhost:8080/';

  constructor(private http: HttpClient, readonly router: Router) { }

  getCartProduct(id:number){
    return this.http.get<cartProduct[]>(this.API_URL+ `joined/${id}`).pipe(
        catchError( (error) => 
          {
            console.log(error);
            throw new Error(error);
          }
      )
      );
  }

  verifyLogIn(email:string, password: string){
    return this.http.get( `${this.API_URL}verify/${email}/${password}`, {responseType: 'text' }).subscribe({
    next: (response) => {
      if(response=='logged in'){
          this.router.navigateByUrl('mainPage/store');
          localStorage.setItem('email', email);
      }
    },
    error: (err) => {
      alert(err)
    }
  });
  }
  getRole(email:string){
    return this.http.get( `${this.API_URL}getRole/${email}`, {responseType: 'text' }).pipe(
        catchError( (error) => 
          {
            console.log(error);
            throw new Error(error);
          }
      )
      );

  }

  addUser(user:Omit<User,'id,role'>) {
  return this.http.post(`${this.API_URL}add`, user, {
    responseType: 'text'  
  }).pipe(
      catchError((error) => {
        throw new Error(error);
      })  
    );;
}


  getProducts(){
    return this.http.get<product[]>(this.API_URL+ "getProducts").pipe(
        catchError( (error) => 
          {
            console.log(error);
            throw new Error(error);
          }
      )
      );
  }
  getUserId(email:string){
     return this.http.get(this.API_URL+ `getId/${email}`).pipe(
        catchError( (error) => 
          {
            console.log(error);
            throw new Error(error);
          }
      )
      );
  }

  updateAmount(idProd:number, amount: number){
    return this.http.put(`${this.API_URL}${idProd}/${amount}`, {}, {
           responseType: 'text'}).pipe(
          catchError( (error) => 
          {
            console.log(error);
            throw new Error(error);
          }
      )
    );
  }
}
