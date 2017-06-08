import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

declare var jQuery: any;
declare var $: any;
declare var Materialize: any;

@Component({
	selector: 'app-crear',
	templateUrl: './crear.component.html',
	styleUrls: ['./crear.component.css']
})
export class CrearComponent implements OnInit {
	public modelo;
	public paises = [];
	public urlApi = "http://localhost:8080/proyecto_restaurante/servicios/insertar_plato.php";

	constructor(private http: Http) {
		this.limpiar()
	}

	ngOnInit() {
		$('.modal').modal();
		$('select').material_select();
		this.obtenerPaises();
	}

	insertarInfo() {
		if (this.modelo.precio_usd && this.modelo.precio_usd != 0) {
			$('#modal1').modal('open');
			const headers = new Headers();
			var info;
			headers.append('Content-Type',
				'application/json; charset=utf-8');

			this.http.post(this.urlApi, JSON.stringify(this.modelo), headers)
				.subscribe(
				res => info = res,
				err => console.error(err),
				() => this.enviado()
				);
		}
	}

	enviado(): void {
		var $toastContent = $('<span>Enviado correctamente!!</span>');
		Materialize.toast($toastContent, 4000);
		this.limpiar();
		$('#modal1').modal('close');

	}

	limpiar(): void {
		this.modelo = {
			"categoria": null,
			"nombre": null,
			"nacionalidad": null,
			"cal": null,
			"precio_cop": null,
			"precio_usd": null
		};
	}

	obtenerPaises() {
		var url: string;
		url = "http://localhost:8080/proyecto_restaurante/servicios/paises.json";
		this.http.get(url)
			.map((res: Response) => res.json())
			.subscribe(
			res => this.paises = res,
			err => console.error(err)
			//,() => console.log(this.paises)
			);
	}

	convertidorMoneda() {
		if (this.modelo.precio_cop != null && this.modelo.precio_cop != 0) {
			var conversion = { "de": "COP", "a": "USD", "valor": this.modelo.precio_cop }
			var respuesta;

			const headers = new Headers();

			headers.append('Content-Type',
				'application/json; charset=utf-8');

			this.http.post("http://localhost:8080/proyecto_restaurante/servicios/conversion.php", JSON.stringify(conversion), headers)
				.map((res: Response) => res.json())
				.subscribe(
				res => respuesta = res,
				err => console.error(err),
				() => this.modelo.precio_usd = respuesta
				);
		} else {
			this.modelo.precio_usd = "";
		}
	}

}