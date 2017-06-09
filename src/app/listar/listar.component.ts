import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {
	public platos;
	private api="http://localhost:8080/api_restaurante/";

	constructor(private http: Http) { }

	ngOnInit() {
		this.getXml()
	}

	getXml() {
		var url:string;
		this.http.get(this.api+"info_xml.php")
	    .map((res: Response) => res.json())
	    .subscribe(
	        res => this.platos = res.plato,
	        err => console.error(err),
	        //() => console.log(this.platos)
	    );
	}

}
