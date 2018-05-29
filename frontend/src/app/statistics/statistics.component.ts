import { Component, OnInit } from '@angular/core';
import {BackendService} from '../backend.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  public selectedCategory;
  public columns;
  public data;

  public data2 = [{
    name: "test",
    value: 22,
  },{
    name: "test2",
    value: 44,
  }];



  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Weekdays';
  showYAxisLabel = true;
  yAxisLabel = 'Number of incidents';



  constructor(public backend: BackendService) {
    this.backend.getCategories();
    this.backend.countByCategoryGroupedByMonth("ROBBERY");
  }

  ngOnInit() {
  }

  onChange() {
    console.log(this.selectedCategory)
    this.backend.countByCategoryGroupedByMonth(this.selectedCategory).subscribe(result => {
      this.data = result;
    });
  }

}
