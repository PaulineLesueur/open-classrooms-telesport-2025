import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { DetailComponent } from './pages/details/details.component';
import { ChartModule } from 'primeng/chart';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { MedalsPieChartComponent } from './core/components/medals-pi-chart/medals-pie-chart.component';
import { MedalsLineChartComponent } from './core/components/medals-line-chart/medals-line-chart.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, DetailComponent,NotFoundComponent, MedalsPieChartComponent, MedalsLineChartComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, ChartModule],
  providers: [providePrimeNG({ theme: { preset: Aura } })],
  bootstrap: [AppComponent],
})
export class AppModule {}
