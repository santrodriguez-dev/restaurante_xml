import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { FiltroPipe } from "../filtro.pipe";
import { ListarService } from "../listar.service";

declare var jQuery: any;
declare var $: any;

@Component({
	selector: 'app-consultar',
	templateUrl: './consultar.component.html',
	styleUrls: ['./consultar.component.css']
})
export class ConsultarComponent implements OnInit {
	public platos: Array<any>;
	private api = "http://localhost:8080/api_restaurante/";

	filtro: any;
	constructor(private http: Http, private listarService: ListarService) { }

	ngOnInit() {
		this.listarService.getXml()
			.subscribe(
			data => this.platos = data.plato,
			error => alert(error),
		);

		$('select').material_select();
		this.reiniciarFiltro();
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
		this.listarService.enviarFiltro(this.filtro)
			.subscribe(
			data => this.filtro,
			error => alert(error),
		);
	}

}