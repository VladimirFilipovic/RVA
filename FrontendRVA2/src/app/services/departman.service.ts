import { Fakultet } from './../models/fakultet';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Departman } from './../models/departman';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DepartmanService {
  private readonly API_URL = 'http://localhost:8085/departmani/';
  private readonly API_URL_Single = 'http://localhost:8085/departman/';

  dataChange: BehaviorSubject<Departman[]> = new BehaviorSubject<Departman[]>(
    []
  );

  constructor(private httpClient: HttpClient) {}

  public getAllDepartman(): Observable<Departman[]> {
    this.httpClient.get<Departman[]>(this.API_URL).subscribe(
      (data) => {
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + ': ' + error.message);
      }
    );
    return this.dataChange.asObservable();
  }

  public addDepartman(departman: Departman): void {
    this.httpClient.post(this.API_URL, departman);
  }

  public updateDepartman(departman: Departman): void {
    this.httpClient.put(this.API_URL, departman);
  }

  public deleteDepartman(id: number): void {
    this.httpClient.delete(this.API_URL_Single + id);
  }
}
