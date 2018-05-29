import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http: HttpClient) {
    this.getCategories();
    this.getColumns();
  }

  private url: string = "http://localhost:8080";

  public columns = null;
  public data = null;
  public categories = null;

  getDataWithSql(sql: string, page: number) {
    let params = new HttpParams().set('sql', sql).set('page', '' + page);
    return this.http.get(this.url + '/api/sql', {params: params});
  }

  getDataWithFilter(query: string) {
    let params = new HttpParams().set('query', query);
    return this.http.get(this.url +'/api/filter', {params: params});
  }
  getColumns() {
    if (this.columns == null) {
      this.http.get(this.url +'/api/getColumns',).subscribe(result => {
          this.columns = result;
          console.log(this.columns);
        }
      );
    }
  }

  getCategories() {
    if (this.categories == null) {
      this.http.get(this.url +'/api/getCategories').subscribe(result => {
        this.categories = (<Object[]>result).map(o => o['Category']);

      });
    }
  }

  countByCategoryGroupedByMonth(category: string) {
    return this.http.get(this.url + '/api/countByCategoryGroupedByMonth/' + category);
  }
  getLongAndLat(incidntNum: string) {
    let params = new HttpParams().set('incidntNum', incidntNum);
    return this.http.get(this.url + '/api/getLongAndLat/',{params: params});
  }

}
