import {Component, OnInit} from '@angular/core';
import {BackendService} from '../backend.service';

@Component({
  selector: 'app-sql',
  templateUrl: './sql.component.html',
  styleUrls: ['./sql.component.scss']
})
export class SqlComponent implements OnInit {
  public sql: string = 'SELECT * FROM data';
  public page: number = 1;
  public data = null;
  public columns = null;

  constructor(public backend: BackendService) {
  }

  ngOnInit() {
  }

  public sendSqlQuery() {
    this.page = 1;
    this.backend.getDataWithSql(this.sql, this.page).subscribe(result => {
      if (result != null && result != undefined) {
        this.columns = Object.keys(result[0]);
        this.data = result;
      }
    });
  }

  public nextPage() {
    this.page++;
    this.backend.getDataWithSql(this.sql, this.page).subscribe(result => {
      if (result != null && result != undefined) {
        this.columns = Object.keys(result[0]);
        this.data = result;
      }
    });;
  }

  public lastPage() {
    if (this.page != 1) {
      this.page--;
      this.backend.getDataWithSql(this.sql, this.page).subscribe(result => {
        if (result != null && result != undefined) {
          this.columns = Object.keys(result[0]);
          this.data = result;
        }
      });;
    }
  }

}
