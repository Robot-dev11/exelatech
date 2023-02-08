import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { HomePageRoutingModule } from './home-page-routing.module';
import { SolutionsComponent } from './solutions/solutions.component';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatToolbarModule} from '@angular/material/toolbar';


@NgModule({
  declarations: [
    SolutionsComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    NgbCarouselModule,
    MatGridListModule,
    MatToolbarModule,
    HomePageRoutingModule
  ]
})
export class HomePageModule { }
