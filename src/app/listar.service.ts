import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

@Injectable()
export class ListarService {

  private api = "http://localhost:8080/api_restaurante/";
  constructor(private http: Http) { }

  getXml(): any {
    var url: string;
    return this.http.get(this.api + "info_xml.php")
      .map(res => res.json());

  }

  enviarFiltro(filtro): any {
    console.log(filtro);
    const headers = new Headers();
    var info;
    headers.append('Content-Type',
      'application/json; charset=utf-8');

    return this.http.post(this.api + "crearXSL.php", JSON.stringify(filtro), headers)
      .map(res => info = res);
  }
}