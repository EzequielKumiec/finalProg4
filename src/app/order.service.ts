import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../enviroment';
import { Provider } from "../app/Models/Provider";
import { Order } from "../app/Models/Order";
import { Color } from "../app/Models/Color";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private readonly API_URL = environment.apiUrl; // Definir en environment
  
  constructor(private http: HttpClient) {}

  getProviders(): Observable<Provider[]> {
    return this.http.get<Provider[]>(`${this.API_URL}/providers`);
  }

  getProviderColors(providerId: string): Observable<Color[]> {
    return this.http.get<Color[]>(`${this.API_URL}/providers/${providerId}/colors`);
  }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.API_URL}/orders`);
  }

  createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(`${this.API_URL}/orders`, order);
  }
}
