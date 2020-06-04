import { Status } from 'src/app/models/status';
import { StatusService } from './../../../services/status.service';
import { DepartmanService } from './../../../services/departman.service';
import { Departman } from 'src/app/models/departman';
import { Student } from 'src/app/models/student';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StudentService } from './../../../services/student.service';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-student-dialog',
  templateUrl: './student-dialog.component.html',
  styleUrls: ['./student-dialog.component.css']
})
export class StudentDialogComponent implements OnInit {

  departmani: Departman[];
  statusi: Status[];
  public flag: number;

  constructor(public studentService: StudentService,
              public departmanService: DepartmanService,
              public statusService: StatusService,
              public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<StudentDialogComponent>,
              @Inject (MAT_DIALOG_DATA) public data: Student) { }

  ngOnInit(): void {
    this.departmanService.getAllDepartman().subscribe(departmani =>
      this.departmani = departmani
    );
    this.statusService.getAllStatus().subscribe(statusi =>
      this.statusi = statusi
      );
  }

  compareTo(a, b) {
    return a.id === b.id;
  }

  public add(): void {
    this.studentService.addStudent(this.data);
    this.snackBar.open('Uspešno dodat student ' + this.data.ime, 'U redu', {
      duration: 2500
    });
  }

  public update(): void {
    this.studentService.updateStudent(this.data);
    this.snackBar.open('Uspešno modifikovan student ' + this.data.ime, 'U redu', {
      duration: 2500
    });
  }

  public delete(): void {
    this.studentService.deleteStudent(this.data.id);
    this.snackBar.open('Uspešno obrisan student ' + this.data.ime, 'U redu', {
      duration: 2500
    });
  }

  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste', 'U redu', {
      duration: 2500
    });
  }

}
