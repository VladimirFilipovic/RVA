import { StudentService } from './../../services/student.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild, Input, OnChanges } from '@angular/core';
import { Student } from 'src/app/models/student';
import { Departman } from 'src/app/models/departman';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit,OnChanges {
  displayedColumns = ['Broj indeksa','ime','prezime','departman','status','actions'];
  dataSource: MatTableDataSource<Student>;
  @Input() selektovanDepartman: Departman; //povezuje se sa domom omogucava odnos dete roditlej

  @ViewChild(MatPaginator,{static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;


  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
  }

  ngOnChanges() {
    if (this.selektovanDepartman.id) {
      debugger;
      this.loadData();
    }
  }

  public loadData() {
      this.studentService.getStudentiByDepartman(this.selektovanDepartman.id).subscribe(data => {
        this.dataSource = new MatTableDataSource(data);

        this.dataSource.filterPredicate = (data, filter: string) => {
          const accumulator = (currentTerm, key) => {
            return key === 'status' ? currentTerm + data.status.naziv : currentTerm + data[key];
          };
          const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
          const transformedFilter = filter.trim().toLowerCase();
          return dataStr.indexOf(transformedFilter) !== -1;
        };

        // sortiranje po nazivu ugnježdenog objekta
        this.dataSource.sortingDataAccessor = (data, property) => {
          switch (property) {
            case 'status': return data.status.naziv.toLocaleLowerCase();
            default: return data[property];
          }
        };

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  public applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLocaleLowerCase();
    this.dataSource.filter = filterValue;
  }

}
