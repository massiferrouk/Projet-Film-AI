import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ScenariosComponent } from './pages/scenarios/scenarios.component';
import { ScenarioCreatedComponent } from './pages/scenario-created/scenario-created.component';
import { ScenarioCreated2Component } from './pages/scenario-created2/scenario-created2.component';
import { EditStylesComponent } from './pages/edit-styles/edit-styles.component';
import { ResponseIaComponent } from './pages/response-ia/response-ia.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'scenarios', component: ScenariosComponent },
  { path: 'scenariocreated/:id', component: ScenarioCreatedComponent },
  { path: 'scenariocreated2/:id', component: ScenarioCreated2Component },
  { path: 'edit-styles', component: EditStylesComponent },
  { path: 'reponseIA', component: ResponseIaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
