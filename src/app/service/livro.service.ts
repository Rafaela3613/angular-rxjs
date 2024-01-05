import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { constant } from 'lodash';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LivroService {

private readonly API = 'https://www.googleapis.com/books/v1/volumes'

  constructor(private http: HttpClient) { }

  buscar (valorDigitado: string): Observable<any> {
      const params = new HttpParams().append('q', valorDigitado)
      return this.http.get(this.API, {params})
  }
}
