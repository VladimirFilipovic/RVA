import { StudentDialogComponent } from './../dialogs/student-dialog/student-dialog.component';
import { Status } from 'src/app/models/status';
import { StudentService } from './../../services/student.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild, Input, OnChanges } from '@angular/core';
import { Student } from 'src/app/models/student';
import { Departman } from 'src/app/models/departman';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
})
export class StudentComponent implements OnInit, OnChanges {
  displayedColumns = [
    'id',
    'broj indeksa',
    'ime',
    'prezime',
    'departman',
    'status',
    'actions',
  ];
  dataSource: MatTableDataSource<Student>;
  @Input() selektovanDepartman: Departman;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    private studentService: StudentService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  ngOnChanges() {
    if (this.selektovanDepartman.id) {
      this.loadData();
    }
  }

  public loadData() {
    this.studentService
      .getStudentiByDepartman(this.selektovanDepartman.id)
      .subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);

        this.dataSource.filterPredicate = (data, filter: string) => {
          const accumulator = (currentTerm, key) => {
            return key === 'status'
              ? currentTerm + data.status.naziv
              : currentTerm + data[key];
          };
          const dataStr = Object.keys(data)
            .reduce(accumulator, '')
            .toLowerCase();
          const transformedFilter = filter.trim().toLowerCase();
          return dataStr.indexOf(transformedFilter) !== -1;
        };

        // sortiranje po nazivu ugnježdenog objekta
        this.dataSource.sortingDataAccessor = (data, property) => {
          switch (property) {
            case 'status':
              return data.status.naziv.toLocaleLowerCase();
            default:
              return data[property];
          }
        };

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  public openDialog(
    flag: number,
    id?: number,
    brojIndeksa?: string,
    ime?: string,
    prezime?: string,
    departman?: Departman,
    status?: Status
  ) {
    const dialogRef = this.dialog.open(StudentDialogComponent, {
      data: { brojIndeksa, id, ime, prezime, departman, status },
    });

    dialogRef.componentInstance.flag = flag;

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.loadData();
      }
    });
  }

  public applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLocaleLowerCase();
    this.dataSource.filter = filterValue;
  }
}
