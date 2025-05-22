import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { RouterOutlet } from '@angular/router';
import { MatBadgeModule } from '@angular/material/badge';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { FormsModule } from '@angular/forms';
import { User } from '../interfaces/user.interface';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    AsyncPipe,
    RouterOutlet,
    MatIconModule,
    MatBadgeModule,
    CommonModule,
    FormsModule
  ]
})
export class NavComponent {
  private breakpointObserver = inject(BreakpointObserver);

  insertedUser!: User;

  constructor(private router: Router, protected database: DataService) {

  }


  ngOnInit() {

    try {
      const user: User = JSON.parse(localStorage.getItem('user') || "") as User;
      this.insertedUser = user;
      this.database.getRole(user.email);
      this.database.getCartProduct(user.id);
      this.database.updateCartAmount();
    } catch (error) {
      console.log("NOT RENDERED ALL YET");
    } 


  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  cartButton() {
    this.router.navigateByUrl("/mainPage/cart");
  }

  logoutButton() {
    this.router.navigateByUrl("/home");
    localStorage.removeItem('user');

  }


  isAdmin(): boolean {
    return this.database.roleSubject.getValue() === 'ADMIN';
  }


}


