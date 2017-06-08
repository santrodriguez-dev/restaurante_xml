import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'filtroPlato' })

export class FiltroPipe implements PipeTransform {

  transform(arreglo: any[], nom: any, nac: any, calMin: any, calMax: any, precioMin: any, precioMax: any): any[] {
    if (arreglo) {
      var filtro = arreglo.filter(plato => plato.nacionalidad.toLowerCase().includes(nac.toLowerCase()));
      filtro = filtro.filter(plato => plato.nombre.toLowerCase().includes(nom.toLowerCase()));

      if ((precioMin || precioMin == 0) && precioMax) {
        filtro = filtro.filter(plato => plato.precio_cop >= precioMin && plato.precio_cop <= precioMax);
      }
      if ((calMin || calMin == 0) && calMax) {
        filtro = filtro.filter(plato => plato.calorias >= calMin && plato.calorias <= calMax);
      }
      filtro = filtro.sort(function (a: any, b: any) {//ordenar
        var x = a.nombre < b.nombre ? -1 : 1;
        return x;
      });
      return filtro;
    }
    //return arreglo;
  }

}