import { DepartmanDialogComponent } from './../dialogs/departman-dialog/departman-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Fakultet } from 'src/app/models/fakultet';
import { DepartmanService } from './../../services/departman.service';
import { Departman } from './../../models/departman';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-departman',
  templateUrl: './departman.component.html',
  styleUrls: ['./departman.component.css']
})
export class DepartmanComponent implements OnInit {

  displayedColumns = ['id', 'naziv', 'oznaka', 'fakultet', 'actions'];
  dataSource: MatTableDataSource<Departman>;
  selektovanDepartman: Departman;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;


  constructor(private departmanService: DepartmanService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadData();
  }

  public loadData() {
    this.departmanService.getAllDepartman().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);

      this.dataSource.filterPredicate = (data, filter: string) => {
        const accumulator = (currentTerm, key) => {
          return key === 'fakultet' ? currentTerm + data.fakultet.naziv : currentTerm + data[key];
        };
        const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
        const transformedFilter = filter.trim().toLowerCase();
        return dataStr.indexOf(transformedFilter) !== -1;
      };

       // sortiranje po nazivu ugnježdenog objekta
      this.dataSource.sortingDataAccessor = (data, property) => {
        switch (property) {
          case 'fakultet': return data.fakultet.naziv.toLocaleLowerCase();
          default: return data[property];
        }
      };

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  public applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLocaleLowerCase();
    this.dataSource.filter = filterValue;
  }

  public openDialog(flag: number, id?: number, naziv?: string, oznaka?: string, fakultet?: Fakultet) {
    const dialogRef = this.dialog.open(DepartmanDialogComponent, {
      data: {id, naziv, oznaka, fakultet}
    });

    dialogRef.componentInstance.flag = flag;

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.loadData();
      }
    });
  }

  selectRow(row: any) {
    this.selektovanDepartman = row;
  }

}
