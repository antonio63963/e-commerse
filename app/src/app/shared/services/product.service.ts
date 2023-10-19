import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { FbAddResponse, IProduct } from '../interfaces';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  create(product: IProduct) {
    return this.http.post(`${environment.fbDbUrl}/products.json`, product).pipe(
      map((response: any) => {
        return {
          ...product,
          id: response.name,
          date: new Date(response.date),
        };
      })
    );
  }
}
