import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable } from 'rxjs';
import { product } from '../interfaces/product.interface';
import { cartProduct } from '../interfaces/cartProduct.interface';
import { Router } from '@angular/router';
import { User } from '../interfaces/user.interface';
import { T } from '@angular/cdk/keycodes';
import { cart } from '../interfaces/cart.interface';
import { oreder } from '../interfaces/order.interface';
import { message } from '../interfaces/message.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  poduct: product[] = [];

  total: number = 0;

  user: User[] = [];

  cartProuct: cartProduct[] = [];

  amount: any = 0;

  addedToOrdes: boolean = false;

  public cartAmountSubject = new BehaviorSubject<number>(0);
  public cartAmount$ = this.cartAmountSubject.asObservable();


  public totalSubject = new BehaviorSubject<number>(0);
  public total$ = this.totalSubject.asObservable();

  public getCartProductsSubject = new BehaviorSubject<cartProduct[]>([]);
  getCartProducts$ = this.getCartProductsSubject.asObservable();

  public getOrderByIdSubject = new BehaviorSubject<oreder[]>([]);
  getOrderByIds$ = this.getOrderByIdSubject.asObservable();

  public getOrdersSubject = new BehaviorSubject<oreder[]>([]);
  getOrders$ = this.getOrdersSubject.asObservable();

  public getMessageSubject = new BehaviorSubject<message[]>([]);
  getMessage$ = this.getMessageSubject.asObservable();

  public roleSubject = new BehaviorSubject<string>('');
  role$ = this.roleSubject.asObservable();

  public sentProductsSubject = new BehaviorSubject<product[]>([]);
  sentProducts$ = this.sentProductsSubject.asObservable();

  readonly API_URL = 'http://localhost:8080/';

  constructor(private http: HttpClient, readonly router: Router) { }

  getCartProduct(id: number) {
    return this.http.get<cartProduct[]>(this.API_URL + `joined/${id}`).subscribe({
      next: (response) => {
        this.getCartProductsSubject.next(response);

      }
    });


  }

  getMessages() {
    return this.http.get<message[]>(this.API_URL + `getAllMasseges`).subscribe({
      next: (response) => {
        this.getMessageSubject.next(response);

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
    return this.http.get(`${this.API_URL}getRole/${email}`, { responseType: 'text' }).subscribe({
      next: (response) => {

        this.roleSubject.next(response);

      

      }

    });
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


  addOrder(order: Omit<oreder, 'id,status'>) {
    console.log('addOrder called');
    return this.http.post(`${this.API_URL}addOrder`, order, { responseType: 'text' });
  }


  addMessage(message: Omit<message, 'id'>) {
    console.log("mesage send")
    return this.http.post(`${this.API_URL}addMessage`, message, { responseType: 'text' });
  }


  getProducts() {
    return this.http.get<product[]>(this.API_URL + "getProducts").subscribe({
      next: (response) => {

        this.sentProductsSubject.next(response);

      }
    });
  }
  getUserId(email: string) {
    return this.http.get(this.API_URL + `getId/${email}`).subscribe({
      next: (response) => {
        localStorage.setItem('id', response as string);
        this.getCartProduct(response as number);
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

  updateStatusOrder(idOrder: number) {
    return this.http.put(`${this.API_URL}depot/${idOrder}`, {}, {
      responseType: 'text'
    }).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (err) => {
        alert(err)
      }
    });


  }

  updateStocToIn(idProduct: number) {
    return this.http.put(`${this.API_URL}inStoc/${idProduct}`, {}, {
      responseType: 'text'
    }).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (err) => {
        alert(err)
      }
    });


  }
  updateStocToOut(idProduct: number) {
    return this.http.put(`${this.API_URL}outOfStoc/${idProduct}`, {}, {
      responseType: 'text'
    }).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (err) => {
        alert(err)
      }
    });


  }

  updateStatusMessage(idMessage: number) {
    return this.http.put(`${this.API_URL}answered/${idMessage}`, {}, {
      responseType: 'text'
    }).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (err) => {
        alert(err)
      }
    });


  }



  getProductId(productName: string): Observable<number> {
    const url = `http://localhost:8080/getProductId/${productName}`;
    return this.http.get<number>(url);
  }

  deleteCartItem(personId: number, productId: number): Observable<string> {
    const url = `${this.API_URL}delete/${personId}/${productId}`;
    return this.http.delete(url, { responseType: 'text' });
  }

  deleteProduct(productId: number): Observable<string> {
    const url = `${this.API_URL}deleteProduct/${productId}`;
    return this.http.delete(url, { responseType: 'text' });
  }

  deleteALLCartItems(personId: number): Observable<string> {
    const url = `${this.API_URL}deleteALL/${personId}`;
    return this.http.delete(url, { responseType: 'text' });
  }

  getOrdesById(personId: number) {
    const url = `${this.API_URL}getOrderById/${personId}`;
    return this.http.get<oreder[]>(url).subscribe({
      next: (response) => {
        this.getOrderByIdSubject.next(response)

      }
    });

  }

  getAllOrders() {
    const url = `${this.API_URL}getAllOrders`;
    return this.http.get<oreder[]>(url).subscribe({
      next: (response) => {
        this.getOrdersSubject.next(response);

      }
    });;

  }
}
