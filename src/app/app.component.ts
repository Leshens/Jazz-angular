import {Component, OnInit} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {Client} from "./client";
import {ClientService} from  "./client.service";
import {NgForm} from "@angular/forms";
import {MatSortModule} from '@angular/material/sort';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public clients: Client[] = [];
  public editClient: Client;
  public deleteClient: Client;

  constructor(private ClientService: ClientService) {}

  ngOnInit() {
    this.getClients();
  }

  public  getClients(): void{
    this.ClientService.getClients().subscribe(
      (response: Client[]) => {
        this.clients = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddClient(addForm: NgForm): void {
    // @ts-ignore
    document.getElementById('add-client-form').click();
    this.ClientService.addClient(addForm.value).subscribe(
      (response: Client) => {
        console.log(response);
        this.getClients();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }


  public onUpdateClient(client: Client): void {
    this.ClientService.updateClient(client).subscribe(
      (response: Client) => {
        console.log(response);
        this.getClients();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteClient(clientId: number): void {
    this.ClientService.deleteClient(clientId).subscribe(
      (response: void) => {
        console.log(response);
        this.getClients();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public searchClients(key: string): void {
    console.log(key);
    const results: Client[] = [];
    for (const client of this.clients) {
      if (client.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || client.surname.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || client.clientCode.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(client);
      }
    }
    this.clients = results;
    if (results.length === 0 || !key) {
      this.getClients();
    }
  }



  public onOpenModal(client: Client,mode: string): void{
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle','modal');
    if (mode === 'add'){
      button.setAttribute('data-target','#addClientModal');
    }
      if (mode === 'edit'){
        this.editClient = client;
      button.setAttribute('data-target','#editClientModal');
    }
      if (mode === 'delete'){
        this.deleteClient = client;
      button.setAttribute('data-target','#deleteClientModal');
    }

    // @ts-ignore
    container.appendChild(button);
      button.click();

  }
}


