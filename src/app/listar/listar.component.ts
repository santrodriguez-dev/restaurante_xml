import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {
	public platos;

	constructor(private http: Http) { }

	ngOnInit() {
		this.getXml()
	}

	getXml() {
		var url:string;
		url= "http://localhost:8080/proyecto_restaurante/servicios/info_xml.php";
		this.http.get(url)
	    .map((res: Response) => res.json())
	    .subscribe(
	        res => this.platos = res.plato,
	        err => console.error(err),
	        //() => console.log(this.platos)
	    );
	}

}
