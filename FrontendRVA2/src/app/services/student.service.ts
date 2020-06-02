import { Student } from './../models/student';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private readonly API_URL = 'http://localhost:8085/studenti/';
  private readonly API_URL_BYID = 'http://localhost:8085/student/';
  private readonly API_URL_BYDEPARTMANID = 'http://localhost:8085/studentiDepartman/';

  dataChange: BehaviorSubject<Student[]> = new BehaviorSubject<Student[]>([]);

  constructor(private httpClient: HttpClient) { }

  public getStudentiByDepartman(idDepartmana: number): Observable<Student[]> {
    this.httpClient.get<Student[]>(this.API_URL_BYDEPARTMANID + idDepartmana).subscribe(data => {
      this.dataChange.next(data);
    },
    (error: HttpErrorResponse) => {
      console.log(error.name + ': ' + error.message);
    });
    return this.dataChange.asObservable();
  }

  public addStudent(student: Student) {
    student.id = 0;
    this.httpClient.post(this.API_URL, student).subscribe();
  }

  public updateStudent(student: Student) {
    this.httpClient.put(this.API_URL, student).subscribe();
  }

  public deleteStudent(brojIndeksa: string) {
    this.httpClient.delete(this.API_URL_BYID  + brojIndeksa).subscribe();
  }

}
