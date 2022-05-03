import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private baseUrl: string = environment.baseUrl+'/producto/';

  constructor(private http: HttpClient) { }

  public lista(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.baseUrl}/lista`);
  }

  public detail(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.baseUrl}/detail/${id}`);
  }

  public save(producto: Producto): Observable<any> {
    return this.http.post(`${this.baseUrl}/create`, producto);
  }

  public update(id:number, producto: Producto): Observable<any> {
    return this.http.put(`${this.baseUrl}/update/${id}`, producto);
  }

  public delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${id}`);
  }

}
