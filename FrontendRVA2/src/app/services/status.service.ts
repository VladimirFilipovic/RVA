import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Status } from '../models/status';

@Injectable({
  providedIn: 'root'
})
export class StatusService {
  private readonly API_URL =  'http://localhost:8085/statusi/';
  private readonly API_URL_Single =  'http://localhost:8085/status/';


  dataChange: BehaviorSubject<Status[]> = new BehaviorSubject<Status[]>([]);

  constructor(private httpClient: HttpClient) {}

  public getAllStatus(): Observable<Status[]> {
    this.httpClient.get<Status[]>(this.API_URL).subscribe(data => {
      this.dataChange.next(data);
    },
    (error: HttpErrorResponse) => {
      console.log(error.name + ': ' + error.message);
    });
    return this.dataChange.asObservable();
  }

  public addStatus(status: Status): void {
    this.httpClient.post(this.API_URL,status);
  }

  public updateStatus(status: Status): void {
    this.httpClient.put(this.API_URL,status);
  }

  public deleteStatus(id: number): void{
    this.httpClient.delete(this.API_URL_Single + id);
  }

}
