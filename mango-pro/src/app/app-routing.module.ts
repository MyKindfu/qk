import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { HomeComponent } from './component/home/home.component';

const routes: Routes = [
  {
    path: '**',
    component: HomeComponent,
    data: { title: '仪盘表' },
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: { title: '仪盘表' },
  },
  {
    path: 'hemo',
    component: HomeComponent,
    data: { title: 'home' },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
