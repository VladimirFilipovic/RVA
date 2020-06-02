import { FakultetService } from './../../../services/fakultet.service';
import { Departman } from 'src/app/models/departman';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DepartmanService } from './../../../services/departman.service';
import { Component, OnInit, Inject } from '@angular/core';
import { Fakultet } from 'src/app/models/fakultet';

@Component({
  selector: 'app-departman-dialog',
  templateUrl: './departman-dialog.component.html',
  styleUrls: ['./departman-dialog.component.css']
})
export class DepartmanDialogComponent implements OnInit {

  fakulteti: Fakultet[];
  public flag: number;

  constructor(public departmanService: DepartmanService,
              public fakultetService: FakultetService,
              public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<DepartmanDialogComponent>,
              @Inject (MAT_DIALOG_DATA) public data: Departman) { }

  ngOnInit(): void {
    this.fakultetService.getAllFakultet().subscribe(fakulteti =>
      this.fakulteti = fakulteti
      );
  }

  compareTo(a, b) {
    return a.id === b.id;
  }

  public add(): void {
    this.departmanService.addDepartman(this.data);
    this.snackBar.open('Uspešno dodat departman ' + this.data.naziv, 'U redu', {
      duration: 2500
    });
  }

  public update(): void {
    this.departmanService.updateDepartman(this.data);
    this.snackBar.open('Uspešno modifikovan departman ' + this.data.naziv, 'U redu', {
      duration: 2500
    });
  }

  public delete(): void {
    this.departmanService.deleteDepartman(this.data.id);
    this.snackBar.open('Uspešno obrisan departman ' + this.data.naziv, 'U redu', {
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
