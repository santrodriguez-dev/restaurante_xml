import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { FiltroPipe } from "../filtro.pipe";

declare var jQuery: any;
declare var $: any;

@Component({
	selector: 'app-consultar',
	templateUrl: './consultar.component.html',
	styleUrls: ['./consultar.component.css']
})
export class ConsultarComponent implements OnInit {
	public platos: Array<any>;

	filtro: any;
	constructor(private http: Http) { }

	ngOnInit() {
		this.getXml();
		$('select').material_select();

		this.reiniciarFiltro();
	}
	getXml() {
		var url: string;
		url = "http://localhost:8080/proyecto_restaurante/servicios/info_xml.php";
		this.http.get(url)
			.map((res: Response) => res.json())
			.subscribe(
			res => this.platos = res.plato,
			err => console.error(err),
		);
	}

	reiniciarFiltro() {
		this.filtro = {
			"nom": "",
			"nac": "",
			"calMin": null,
			"calMax": null,
			"precioMin": null,
			"precioMax": null
		};
	}

	private urlApi = "http://localhost:8080/proyecto_restaurante/servicios/crearXSL.php";

	enviarFiltro() {
		console.log(this.filtro);
		const headers = new Headers();
		var info;
	    headers.append('Content-Type',
	    	'application/json; charset=utf-8');

	    this.http.post(this.urlApi, JSON.stringify(this.filtro), headers)
	      	.subscribe(
	      		res => info = res,
	            err => console.error(err)
	            //,() => this.enviado()
	      	);
	}

}