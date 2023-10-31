import { Injectable } from '@angular/core';
import { CartProduct } from '../interfaces';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {

  count$ = new BehaviorSubject(0);

  getOrder(): CartProduct[] {
    const data = localStorage.getItem('order-cart');
    if(data?.length) {
      this.count$.next(0);
      return JSON.parse(data);
    }else {
      return [];
    }
  }

  setOrder(order: CartProduct[]) {
    localStorage.setItem('order-cart', JSON.stringify(order));
  }

  save(product: { id: string; title: string; price: number; photo: string }) {
    const newProduct = { ...product, amount: 1, summ: product.price };
    const existingOrder = this.getOrder();
    if (existingOrder.length) {
      const isExisting = existingOrder.find(
        (item: { id: string }) => item.id === product.id
      );
      if (isExisting) {
        isExisting.amount++;
        isExisting.summ += isExisting.price;
      }else {
        existingOrder.push(newProduct);
      }
    } else {
      existingOrder.push(newProduct);
      console.log(existingOrder)
    }
    this.setOrder(existingOrder);
  }

  incAmount(id: string) {
    if (!id) return;
    const existingOrder = this.getOrder();
    if (existingOrder.length) {
      const existing = existingOrder.find(
        (prod: { id: string }) => prod.id === id
      );
      if (existing) {
        existing.amount++;
        existing.summ = existing.amount * existing.price;
      }
      this.setOrder(existingOrder);
    } else {
      return;
    }
  }

  decAmount(id: string) {
    if (!id) return;
    let existingOrder = this.getOrder();
    if (existingOrder.length) {
      const existing = existingOrder.find(
        (prod: { id: string }) => prod.id === id
      );
      if (existing && existing?.amount > 1) {
        existing.amount--;
        existing.summ = existing.amount * existing.price;
      } else {
        existingOrder = existingOrder.filter(prod => prod.id != id);
      }
      this.setOrder(existingOrder);
    } else {
      return;
    }
  }

  delete(id: string) {
    console.log(id);
    if (!id) return;
    const existingOrder = this.getOrder();
    if (existingOrder) {
      const newArr = existingOrder.filter(
        (prod: { id: string }) => prod.id != id
      );
      if (!newArr.length) {
        localStorage.clear();
      } else {
        this.setOrder(newArr);
      }
    }
  }
}
