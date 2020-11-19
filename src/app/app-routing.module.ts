import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForoComponent } from './foro/foro.component';

const routes: Routes = [
  { path: '', redirectTo: '/foro', pathMatch: 'full' },
  {
    path: 'foro',
    component: ForoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
