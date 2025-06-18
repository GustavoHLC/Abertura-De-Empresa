import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { EmpresaComponent } from './pages/empresa/empresa.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'empresas/novo', component: EmpresaComponent},
  { path: 'empresas/:id/editar', component: EmpresaComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
