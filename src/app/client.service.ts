import {Observable, range} from "rxjs";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Client} from "./client";

@Injectable({
  providedIn: "root"
  })
export class ClientService{
  constructor(private http: HttpClient) {}

  public getClients(): Observable<Client[]> {
    return this.http.get<Client[]>('http://localhost:8080/api/all')
  }

  public addClient(client: Client): Observable<Client> {
    return this.http.post<Client>('http://localhost:8080/api/add', client)
  }

  public updateClient(client: Client): Observable<Client> {
    return this.http.put<Client>('http://localhost:8080/api/update', client)
  }

  public deleteClient(clientId: number): Observable<void> {
    return this.http.delete<void>('http://localhost:8080/api/delete/' + clientId)
  }



}
