import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

declare var google: any;
declare var jQuery:any;
declare var $:any;

@Component({
	selector: 'app-informacion',
	templateUrl: './informacion.component.html',
	styleUrls: ['./informacion.component.css']
})
export class InformacionComponent implements OnInit {

	private clima: any;
	private detalles: any;
	private api="http://localhost/api_restaurante/";

	constructor(private http: Http) {

	}

	ngOnInit() {
		$('.parallax').parallax();
		this.obtenerClima();
		this.obtenerplatoEspecial();

		this.iniciarMapa();
		this.localizar();
	}

	obtenerClima(): void {
		var url: string;
		url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22bogota%22)&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=";
		this.http.get(url)
			.map((res: Response) => res.json())
			.subscribe(
			res => this.clima = res.query.results.channel.item.condition,
			err => console.error(err)
			//,() => console.log(this.clima)
			);
	}

	obtenerplatoEspecial(): void {
		var url: string;
		url = this.api+"webservice_info.php";
		this.http.get(url)
			.map((res: Response) => res.json())
			.subscribe(
			res => this.detalles = res,
			err => console.error(err)
			//, () => console.log(this.detalles)
			);
	}

	private numero: any;
	private respuesta: number;


	consultar(): void {
		if (this.numero && this.numero > 0) {
			const headers = new Headers();
			headers.append('Content-Type', 'application/json; charset=utf-8');

			this.http.post(this.api+"webservice_info.php", this.numero, headers)
				.map((res: Response) => res.json())
				.subscribe(
				res => this.respuesta = res,
				err => console.error(err)
				//, () => console.log(this.respuesta)
				);
		} else {
			this.respuesta = null;
		}
	}

	private ubicacion: any;
	private map: any;
	iniciarMapa(): void {

		this.ubicacion = { lat: 5, lng: -70 };
		//this.ubicacion = { lat: 4.7326065999999996, lng: -74.1181119 };

		this.map = new google.maps.Map(document.getElementById('map'), {
			zoom: 13,
			center: this.ubicacion
		});
	}

	localizar(): void {
		var this_ = this;
		navigator.geolocation.getCurrentPosition(function (pos) {
			var crd = pos.coords;
			this_.ubicacion.lat = crd.latitude;
			this_.ubicacion.lng = crd.longitude;
			this_.map.setCenter(this_.ubicacion);
			//addMarker();
		}, function (err) {
			console.warn('ERROR(' + err.code + '): ' + err.message);
		});

		function addMarker() {
			var marker = new google.maps.Marker({
				position: this_.ubicacion,
				map: this_.map
			});
		}
	}

	trazarRuta(): void {
		var this_ = this;
		var directionsDisplay = new google.maps.DirectionsRenderer({
			map: this.map
		})

		var request = {
			origin: this.ubicacion,
			destination: { lat: 4.7326065999999996, lng: -74.1181119 },//mi casa :)
			travelMode: google.maps.TravelMode.DRIVING
		};

		var directionsService = new google.maps.DirectionsService();

		directionsService.route(request, function (response, status) {
			if (status == google.maps.DirectionsStatus.OK) {
				directionsDisplay.setDirections(response);
			} else {
				alert("fail");
			}
		});

	}

}