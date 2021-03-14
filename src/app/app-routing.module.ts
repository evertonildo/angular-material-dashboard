import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { PostsComponent } from './modules/posts/posts.component';
import { AssuntosComponent } from './pages/assuntos/assuntos.component';
import { ChamadosComponent } from './pages/chamados/chamados.component';
import { EndpointsComponent } from './pages/endpoints/endpoints.component';
import { TicketsComponent } from './pages/tickets/tickets.component';

const routes: Routes = [{
  path: '',
  component: DefaultComponent,
  children: [{ path: '', component: DashboardComponent },
  { path: 'posts', component: PostsComponent },
  { path: 'chamadas', component: ChamadosComponent },
  { path: 'chamadas/:id', component: ChamadosComponent },
  { path: 'assuntos', component: AssuntosComponent },
  { path: 'tickets', component: TicketsComponent },
  { path: 'endpoints', component: EndpointsComponent }]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
