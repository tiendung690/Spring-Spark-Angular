import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { AgmMap } from '@agm/core';
import {BackendService} from '../backend.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  constructor(private route: ActivatedRoute,private backend: BackendService) {
  }

  long: number = null;
  lat: number = null;

  @ViewChild("agmMap") agmMap: AgmMap;
  incidentNo: string;

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.long = +params['long'];
      this.lat = +params['lat'];
    });
  }

  public show(){
    this.backend.getLongAndLat(this.incidentNo).subscribe(result => {
        let res = (<Object[]>result);
        this.long = +res[0]['X'];
        this.lat = +res[0]['Y'];
        this.agmMap.triggerResize();

    });
  }

}
