import { Fakultet } from './../models/fakultet';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  HttpClient,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FakultetService {
  private readonly API_URL = 'http://localhost:8085/fakulteti/';
  private readonly API_URL_Single = 'http://localhost:8085/fakultet/';

  dataChange: BehaviorSubject<Fakultet[]> = new BehaviorSubject<Fakultet[]>([]);

  constructor(private httpClient: HttpClient) {}

  public getAllFakultet(): Observable<Fakultet[]> {
    this.httpClient.get<Fakultet[]>(this.API_URL).subscribe(
      (data) => {
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + ': ' + error.message);
      }
    );
    return this.dataChange.asObservable();
  }

  public addFakultet(fakultet: Fakultet): void {
    this.httpClient.post(this.API_URL, fakultet);
  }

  public updateFakultet(fakultet: Fakultet) {
    this.httpClient.put(this.API_URL, fakultet);
  }

  public deleteFakultet(id: number): void {
    this.httpClient.delete(this.API_URL_Single + id);
  }
}
