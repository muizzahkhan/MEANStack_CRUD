import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable, map } from 'rxjs';

import {Stores} from './stores.model'

@Injectable({
  providedIn: 'root'
})
export class StoresService {
  readonly baseURL = 'http://localhost:3000/stores';
  
  constructor(private http: HttpClient) { }


  postStores(store: Stores) {
    return this.http.post(this.baseURL, store);
  }

  getStoresList() {
    return this.http.get(this.baseURL);
  }

  putStores(store: Stores) {
    return this.http.put(this.baseURL + `/${store._id}`, store);
  }

  deleteStores(_id: string) {
    return this.http.delete(this.baseURL + `/${_id}`);
  }
  
  selectedStores: Stores;s
  stores: Stores[];
  

}

