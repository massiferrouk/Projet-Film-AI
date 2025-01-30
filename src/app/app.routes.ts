import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ScenariosComponent } from './pages/scenarios/scenarios.component';
import { ScenarioCreated2Component } from './pages/scenario-created2/scenario-created2.component';
import { EditStylesComponent } from './pages/edit-styles/edit-styles.component';
import { ResponseIaComponent } from './pages/response-ia/response-ia.component';
import {HttpClientModule, provideHttpClient} from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';




export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'scenarios', component: ScenariosComponent },
  { path: 'scenariocreated2/:styleId', component: ScenarioCreated2Component },
  { path: 'edit-styles', component: EditStylesComponent },
  { path: 'reponseIA', component: ResponseIaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes),BrowserModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
