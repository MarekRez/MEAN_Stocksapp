import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Client} from '../types/client-type';

@Injectable({
  providedIn: 'root'
})
export class ApiClientsService {

  private http = inject(HttpClient);

  getAll(): Observable<Client[]> {
    return this.http.get<Client[]>('http://localhost:3000/api/clients');
  }

  create(client: Client): Observable<number> {
    return this.http.post<number>('http://localhost:3000/api/clients', client);
  }

  delete(email: string) {
    return this.http.delete<number>(`http://localhost:3000/api/clients/${email}`);
  }

  update(email: string, client: Partial<Client>) : Observable<Client> {
    return this.http.put<Client>(`http://localhost:3000/api/clients/${email}`, client);
  }

}
