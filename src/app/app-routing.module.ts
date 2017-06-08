import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearComponent } from './crear/crear.component';
import { ListarComponent } from './listar/listar.component';
import { ConsultarComponent } from './consultar/consultar.component';
import { InformacionComponent } from './informacion/informacion.component';

const routes: Routes = [
	{ path: '', redirectTo: 'crear', pathMatch: 'full'  },
	{ path: 'crear', component: CrearComponent },
	{ path: 'listar', component: ListarComponent },
	{ path: 'consultar', component: ConsultarComponent },
	{ path: 'informacion', component: InformacionComponent },
	{ path: '**', component: CrearComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }