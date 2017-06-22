import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { MaterializeModule } from 'angular2-materialize';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { CrearComponent } from './crear/crear.component';
import { ListarComponent } from './listar/listar.component';
import { ConsultarComponent } from './consultar/consultar.component';
import { FiltroPipe } from './filtro.pipe';
import { InformacionComponent } from './informacion/informacion.component';
import { ListarService } from "./listar.service";
//ng build --bh /proyecto_restaurante/

@NgModule({
  declarations: [
    AppComponent,
    CrearComponent,
    ListarComponent,
    ConsultarComponent,
    FiltroPipe,
    InformacionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterializeModule,
    AppRoutingModule
  ],
  providers: [ListarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
