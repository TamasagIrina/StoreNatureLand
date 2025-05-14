import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { product } from '../interfaces/product.interface';
import { cartProduct } from '../interfaces/cartProduct.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  poduct: product[]=[]; 

  cartProuct: cartProduct[]=[];

  readonly API_URL = 'http://localhost:8080/';

  constructor(private http: HttpClient, readonly router: Router) { }

  getProduct(){
    return this.http.get<cartProduct[]>(this.API_URL+ "cart").pipe(
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
      }
    },
    error: (err) => {
      alert(err)
    }
  });

  }
}
