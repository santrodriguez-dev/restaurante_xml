import { Component, OnInit } from '@angular/core';
import { ListarService } from "../listar.service";

@Component({
	selector: 'app-listar',
	templateUrl: './listar.component.html',
	styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {
	
	private api = "http://localhost:8080/api_restaurante/";
	private platos;

	constructor(private listarService: ListarService) { }

	ngOnInit() {
		this.listarService.getXml()
		.subscribe(
			data => this.platos = data.plato,
			error => alert (error),
			);
	}

}