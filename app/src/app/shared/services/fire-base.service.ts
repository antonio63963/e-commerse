import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  getDocs,
  Firestore,
  addDoc,
  query,
  where,
  getDoc,
  doc,
} from 'firebase/firestore/lite';
import { IProduct, ProductsTypes } from '../interfaces';
import { Observable, from, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FireBaseService {
  db?: Firestore;
  initDB() {
    const app = initializeApp(environment.firebaseConfig);
    this.db = getFirestore(app);
  }

  constructor(private http: HttpClient) {}

  create(product: IProduct) {
    if (!this.db) this.initDB();
    return from(addDoc(collection(this.db!, 'products'), product)).pipe(
      tap((x) => console.log(x))
    );
  }

  getAll(): Observable<IProduct[]> {
    if (!this.db) this.initDB();
    const productsCol = collection(this.db!, 'products');
    return from(getDocs(productsCol)).pipe(
      map((snap) =>
        snap.docs.map((doc) => {
          return {
            ...doc.data() as IProduct,
            id: doc.id,
            dateCreated: new Date(doc.data()['dateCreated'].seconds * 1000),
          };
        })
      )
    );
  }

  getProductsByType(type?: ProductsTypes): Observable<IProduct[]> {
    console.log(type);
    if (!this.db) this.initDB();
    if (!type) return this.getAll();
    const productsCol = collection(this.db!, 'products');
    const q = query(productsCol, where('type', '==', type.slice(0, -1)));
    return from(getDocs(q)).pipe(
      map((snap) =>
        snap.docs.map((doc) => {
          return {
            ...doc.data() as IProduct,
            id: doc.id,
            dateCreated: new Date(doc.data()['dateCreated'].seconds * 1000),
          };
        })
      )
    );
  }

  getProductById(id: string){
    console.log('wow')
    if (!this.db) this.initDB();
    return from(getDoc(doc(this.db!, 'products', id))).pipe( map((snap) =>
      {
        console.log(snap.data())
        const data = snap.data();
        if(data) {
          return {
            ...data as IProduct,
            id: snap.id,
            dateCreated: new Date((data['dateCreated'].seconds as number) * 1000),
          }
        } else {
          return undefined;
        }
      }
  ));
  }
}
