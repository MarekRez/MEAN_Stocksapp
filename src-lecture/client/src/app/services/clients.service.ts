import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Person} from '../types/person.type';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  private http = inject(HttpClient);

  getAll(): Observable<Person[]> {
    return this.http.get<Person[]>('http://localhost:3000/api/clients');
  }

  create(client: Person): Observable<number> {
    return this.http.post<number>('http://localhost:3000/api/clients', client);
  }

  edit(client: Person): Observable<number> {
    return this.http.put<number>(`http://localhost:3000/api/clients/${client.id}`, client);
  }

  delete(clientId: number) {
    return this.http.delete<number>(`http://localhost:3000/api/clients/${clientId}`);
  }

  getById(id: number): Observable<Person> {
    return this.http.get<Person>(`http://localhost:3000/api/clients/${id}`);
  }
}
