import { FakultetDialogComponent } from './../dialogs/fakultet-dialog/fakultet-dialog.component';
import { FakultetService } from './../../services/fakultet.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Fakultet } from 'src/app/models/fakultet';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-fakultet',
  templateUrl: './fakultet.component.html',
  styleUrls: ['./fakultet.component.css'],
})
export class FakultetComponent implements OnInit {
  displayedColumns = ['id', 'naziv', 'sediste', 'actions'];
  dataSource: MatTableDataSource<Fakultet>;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    private fakultetService: FakultetService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  public loadData() {
    this.fakultetService.getAllFakultet().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  public openDialog(flag: number, id?: number, naziv?: string, sediste?: string) {
    const dialogRef = this.dialog.open(FakultetDialogComponent, {
      data: { id, naziv, sediste }
    });

    dialogRef.componentInstance.flag = flag;

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.loadData();
      }
    });
  }

  public applyfilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLocaleLowerCase();
    this.dataSource.filter = filterValue;
  }
}
