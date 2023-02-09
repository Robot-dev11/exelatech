import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatInputModule} from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { HomePageModule } from './home-page/home-page.module';
import { CarouselModule } from '@syncfusion/ej2-angular-navigations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { MatGridListModule } from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    MatInputModule,
    HttpClientModule,
    HomePageModule,
    MatCardModule,
    CarouselModule,
    AppRoutingModule,
    MatGridListModule,
    MatToolbarModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
