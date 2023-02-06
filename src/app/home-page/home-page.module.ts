import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { HomePageRoutingModule } from './home-page-routing.module';
import { SolutionsComponent } from './solutions/solutions.component';


@NgModule({
  declarations: [
    SolutionsComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    HomePageRoutingModule
  ]
})
export class HomePageModule { }
