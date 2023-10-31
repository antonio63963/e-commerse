import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartLabelComponent } from './cart-label.component';

describe('CartLabelComponent', () => {
  let component: CartLabelComponent;
  let fixture: ComponentFixture<CartLabelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CartLabelComponent]
    });
    fixture = TestBed.createComponent(CartLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
