import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrederCardComponent } from './oreder-card.component';

describe('OrederCardComponent', () => {
  let component: OrederCardComponent;
  let fixture: ComponentFixture<OrederCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrederCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrederCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
