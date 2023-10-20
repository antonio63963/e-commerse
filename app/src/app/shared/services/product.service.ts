import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { FbAddResponse, IProduct } from '../interfaces';
import { Observable, map } from 'rxjs';

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

  getAll(): Observable<IProduct[]> {
    return this.http.get(`${environment.fbDbUrl}/products.json`).pipe(
      map((res: { [x: string]: any }) => {
        return Object.keys(res).map((key) => ({
          ...res[key],
          id: key,
          dateCreated: new Date(res[key].dateCreated),
        }));
      })
    );
  }

  getById(id: string): Observable<IProduct>{
    return this.http.get(`${environment.fbDbUrl}/products/${id}.json`)
    .pipe(
      map((res: { [x: string]: any }) => ({
        ...res,
        id,
        dateCreated: new Date(res['dateCreated']),
      } as IProduct))
    );
  }
  update(product: any): Observable<IProduct>{
    return this.http.put(`${environment.fbDbUrl}/products/${product.id}.json`, product)
    .pipe(
      map((res: { [x: string]: any }) => ({
        ...res,
        id: product.id,
        dateCreated: new Date(res['dateCreated']),
      } as IProduct))
    );
  }

  deleteById(id:string) {
    return this.http.delete(`${environment.fbDbUrl}/products/${id}.json`);
  }
}
