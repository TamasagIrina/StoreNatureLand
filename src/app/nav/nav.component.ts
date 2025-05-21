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

  name: string = localStorage.getItem('email') || ""



  constructor(private router: Router, protected database: DataService) {

  }


  ngOnInit() {
    this.database.getRole(localStorage.getItem('email') || '');
    this.database.getCartProduct(localStorage.getItem('id') as unknown as number);
    this.database.updateCartAmount();

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
    localStorage.removeItem('status');
    localStorage.removeItem('email');
  }


  isAdmin(): boolean {
    return this.database.roleSubject.getValue() === 'ADMIN';
  }


}


