import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {SqlComponent} from './sql/sql.component';
import {SidenavComponent} from './sidenav/sidenav.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {StatisticsComponent} from './statistics/statistics.component';
import {RouterModule, Routes} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {FilterComponent} from './filter/filter.component';
import { MapComponent } from './map/map.component';
import { AgmCoreModule } from '@agm/core';
import { CreditsComponent } from './credits/credits.component';
const appRoutes: Routes = [
  {path: 'statistics', component: StatisticsComponent},
  {path: 'sql', component: SqlComponent},
  {path: 'map/:long/:lat', component: MapComponent},
  {path: 'map', component: MapComponent},
  {path: 'credits', component: CreditsComponent},
  {path: 'filter', component: FilterComponent},
  {
    path: '',
    redirectTo: '/sql',
    pathMatch: 'full'
  }];


@NgModule({
  declarations: [
    AppComponent,
    SqlComponent,
    SidenavComponent,
    StatisticsComponent,
    FilterComponent,
    MapComponent,
    CreditsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    NgxChartsModule,
    RouterModule.forRoot(
      appRoutes,
    ),
    AgmCoreModule.forRoot({
      apiKey: 'YOUR_API_KEY'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
