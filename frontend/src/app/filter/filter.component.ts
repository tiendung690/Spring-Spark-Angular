import {Component, OnInit} from '@angular/core';
import {BackendService} from '../backend.service';


class Filter {
  column: string;
  operator: string;
  value: string;

  constructor(column?: string, operator?: string, value?: string) {
    this.column = column;
    this.operator = operator;
    this.value = value;
  };
}

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  filter: Filter[] = [];
  public connector;
  public data = null;
  public columns = null;

  constructor(public backend: BackendService) {
  }

  ngOnInit() {
    this.filter.push(new Filter('IncidntNum', '=', '186043061'));
  }

  newFilter() {
    this.filter.push(new Filter());
    console.log(this.filter);
  }

  delete(index) {
    this.filter.splice(index, 1);
  }

  sendQuery() {
    var queryString = '';
    var connector = '';
    for (let f of this.filter) {
      queryString += ` ${connector} ${f.column}${f.operator}'${f.value}'`;
      connector = this.connector;
    }
    this.backend.getDataWithFilter(queryString).subscribe(result => {
      this.columns = Object.keys(result[0]);
      this.data = result;
    });

  }
}
