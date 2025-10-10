import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { DetailComponent } from './pages/details/details.component';
import { MedalsChartComponent } from "./pages/home/components/medals-chart/medals-chart.component";

@NgModule({
  declarations: [AppComponent, HomeComponent, NotFoundComponent, MedalsChartComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, DetailComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
