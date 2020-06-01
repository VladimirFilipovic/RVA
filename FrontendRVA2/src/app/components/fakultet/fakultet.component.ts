import { FakultetService } from './../../services/fakultet.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Fakultet } from 'src/app/models/fakultet';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-fakultet',
  templateUrl: './fakultet.component.html',
  styleUrls: ['./fakultet.component.css']
})
export class FakultetComponent implements OnInit {

  displayedColumns = ['id','naziv','sediste','actions'];
  dataSource: MatTableDataSource<Fakultet>;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(private fakultetService: FakultetService) { }

  ngOnInit(): void {
    this.loadData();
  }

  public loadData() {
    this.fakultetService.getAllFakultet().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  public applyfilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLocaleLowerCase();
    this.dataSource.filter = filterValue;
  }

}

//mislim da ce kod sbih classa biti frka update jer ti nije okej putanja npr fakulteti ti je get a get id ti je fakultet/id samo na to obrati paznju
