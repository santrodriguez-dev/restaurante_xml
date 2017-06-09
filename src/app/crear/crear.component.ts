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
	private urlApi="http://localhost:8080/api_restaurante/";

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

			this.http.post(this.urlApi+"insertar_plato.php", JSON.stringify(this.modelo), headers)
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
		this.http.get(this.urlApi+"paises.json")
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

			this.http.post(this.urlApi+"conversion.php", JSON.stringify(conversion), headers)
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