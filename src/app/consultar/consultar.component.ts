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
	private api="http://localhost/api_restaurante/";

	filtro: any;
	constructor(private http: Http) { }

	ngOnInit() {
		this.getXml();
		$('select').material_select();

		this.reiniciarFiltro();
	}
	getXml() {
		var url: string;
		url = this.api+"info_xml.php";
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

	enviarFiltro() {
		console.log(this.filtro);
		const headers = new Headers();
		var info;
	    headers.append('Content-Type',
	    	'application/json; charset=utf-8');

	    this.http.post(this.api+"crearXSL.php", JSON.stringify(this.filtro), headers)
	      	.subscribe(
	      		res => info = res,
	            err => console.error(err)
	            //,() => this.enviado()
	      	);
	}

}