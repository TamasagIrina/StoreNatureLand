import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable } from 'rxjs';
import { product } from '../interfaces/product.interface';
import { cartProduct } from '../interfaces/cartProduct.interface';
import { Router } from '@angular/router';
import { User } from '../interfaces/user.interface';
import { T } from '@angular/cdk/keycodes';
import { cart } from '../interfaces/cart.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  poduct: product[] = [];

  total: number = 0;

  user: User[] = [];

  cartProuct: cartProduct[] = [];

  amount: any = 0;

  public cartAmountSubject = new BehaviorSubject<number>(0);
  public cartAmount$ = this.cartAmountSubject.asObservable();


  public totalSubject = new BehaviorSubject<number>(0);
  public total$ = this.totalSubject.asObservable();

  public getCartProductsSubject = new BehaviorSubject<cartProduct[]>([]);
  getCartProducts$ = this.getCartProductsSubject.asObservable();

  readonly API_URL = 'http://localhost:8080/';

  constructor(private http: HttpClient, readonly router: Router) { }

  getCartProduct(id: number) {
    return this.http.get<cartProduct[]>(this.API_URL + `joined/${id}`).subscribe({
      next: (response) => {
        this.getCartProductsSubject.next(response);

      }
    });


  }

   updatePrice() {
    

    this.getCartProductsSubject.subscribe(products => {
      this.total = 0;
      for (const prod of products) {
        this.total += prod.productPrice * prod.amount;
      

      }
      this.totalSubject.next(this.total);
    });

    


  }


  updateCartAmount() {

    this.getCartProductsSubject.subscribe(products => {
      this.amount = 0;
      for (const prod of products) {
        this.amount += prod.amount;

      }
      this.cartAmountSubject.next(this.amount);
    });
  }






  verifyLogIn(email: string, password: string) {
    return this.http.get(`${this.API_URL}verify/${email}/${password}`, { responseType: 'text' }).subscribe({
      next: (response) => {
        if (response == 'logged in') {
          this.router.navigateByUrl('mainPage/store');
          localStorage.setItem('email', email);
          this.getUserId(email);
        
        } else {
          alert(response)
        }
       
      },
      error: (err) => {
        alert(err);
      }
    });
  }
  getRole(email: string) {
    return this.http.get(`${this.API_URL}getRole/${email}`, { responseType: 'text' }).pipe(
      catchError((error) => {
        console.log(error);
        throw new Error(error);
      }
      )
    );

  }

  addUser(user: Omit<User, 'id,role'>) {
    return this.http.post(`${this.API_URL}add`, user, {
      responseType: 'text'
    }).pipe(
      catchError((error) => {
        throw new Error(error);
      })
    );;
  }

  addProdact(product: Omit<product, 'id'>) {
    return this.http.post(`${this.API_URL}addProduct`, product, {
      responseType: 'text'
    }).pipe(
      catchError((error) => {
        throw new Error(error);
      })
    );;
  }


  addProdactToCart(cartProdact: Omit<cart, 'id'>) {
    return this.http.post(`${this.API_URL}addToCart`, cartProdact, {
      responseType: 'text'
    }).pipe(
      catchError((error) => {
        throw new Error(error);
      })
    );;
  }


  getProducts() {
    return this.http.get<product[]>(this.API_URL + "getProducts").pipe(
      catchError((error) => {
        console.log(error);
        throw new Error(error);
      }
      )
    );
  }
  getUserId(email: string) {
    return this.http.get(this.API_URL + `getId/${email}`).subscribe({
      next: (response) => {
        localStorage.setItem('id', response as string);
        this.getCartProduct(localStorage.getItem('id') as unknown as number);
        this.updateCartAmount();
      },
      error: (err) => {
        alert(err)
      }
    });
  }

  updateAmount(idProd: number, amount: number) {
    return this.http.put(`${this.API_URL}${idProd}/${amount}`, {}, {
      responseType: 'text'
    }).pipe(
      catchError((error) => {
        console.log(error);
        throw new Error(error);
      }
      )
    );
  }



  getProductId(productName: string): Observable<number> {
    const url = `http://localhost:8080/getProductId/${productName}`;
    return this.http.get<number>(url);
  }

  deleteCartItem(personId: number, productId: number): Observable<string> {
    const url = `${this.API_URL}delete/${personId}/${productId}`;
    return this.http.delete(url, { responseType: 'text' }); // 👈 if backend returns plain text like "Deleted"
  }
}
