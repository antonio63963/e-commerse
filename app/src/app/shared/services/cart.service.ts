import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor() {}
  getOrder() {
    const data = localStorage.getItem('order-cart');
    return data ? JSON.parse(data) : null;
  }

  save(product: { id: string; title: string; price: number; photo: string }) {
    const newProduct = { ...product, amount: 1, summ: product.price };
    const existingOrder = this.getOrder();
    if (existingOrder) {
      const isExisting = existingOrder.find(
        (item: { id: string }) => item.id === product.id
      );
      if (isExisting) {
        isExisting.amount++;
        isExisting.summ += isExisting.price;
      } else {
        existingOrder.push(newProduct);
      }
    } else {
      localStorage.setItem('order-cart', JSON.stringify([newProduct]));
    }
  }

  incAmount(id: string) {
    if (!id) return;
    const existingOrder = this.getOrder();
    if (existingOrder) {
      // const idx = existingOrder.findIndex((prod: { id: string; }) => prod.id === id);
      const existing = existingOrder.find((prod: { id: string }) => prod.id === id);
      existing.amount++;
      existing.summ = existing.amount * existing.amount;

      localStorage.setItem('order-cart', JSON.stringify(existingOrder));
    }
  }

  decAmount(id: string) {
    if (!id) return;
    const existingOrder = this.getOrder();
    if (existingOrder) {
      const existing = existingOrder.find((prod: { id: string }) => prod.id === id);
      existing.amount++;
      existing.summ = existing.amount * existing.amoun

      localStorage.setItem('order-cart', JSON.stringify(existingOrder));
    }
  }
}
