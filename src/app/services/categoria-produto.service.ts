import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CategoriaProduto } from '../model/categoria-produto';
import { LoginService } from './login.service';
import { JsonPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CategoriaProdutoService {

  private urlApi = environment.urlApi;
  constructor(private http: HttpClient, private router: Router, private loginService: LoginService) {}

  salvarCategoriaProduto(categoriaProduto: CategoriaProduto) {
    return  this.http.post<string>(this.urlApi + 'salvarCategoria', categoriaProduto).subscribe({
      next: (res) => {
        var jsonRetorno = JSON.parse(JSON.stringify(res));
        if (jsonRetorno.error === undefined){
          console.log("categoria salva com sucesso. ID: " + jsonRetorno.id);
          alert("categoria salva com sucesso. ID: " + jsonRetorno.id);
        } else {
          alert(jsonRetorno.error);
        }
      },
      error: (error) => {
        console.log(error.error.error);
        alert(error.error.error);
      }
    });
  }

  listarCategoriaProduto(pagina: number){
    return this.http.get<CategoriaProduto[]>(this.urlApi + 'listaPorPageCategoriaProduto/' + this.loginService.codempresa() + '/' + pagina);
  }

  buscarPorId(id: number) {
    return this.http.get<CategoriaProduto>(this.urlApi + 'buscarPorId/' + id);
  }

  deletar(categoria: CategoriaProduto) {
    //console.log(categoria);
    return  this.http.post<string>(this.urlApi + 'deleteCategoria', categoria).subscribe({
      next: (res) => {
        var jsonRetorno = JSON.parse(JSON.stringify(res));
        if (jsonRetorno.error === undefined){
          console.log(res);
          alert("categoria excluída com sucesso.");
        } else {
          alert(jsonRetorno.error);
        }
      },
      error: (error) => {
        console.log(error.error.error);
        alert(error.error.error);
      }
    });
  }

  buscarPorDescCategoria(descricao: string){
    return this.http.get<CategoriaProduto[]>(this.urlApi + "buscarPorDescCatgoria/" + descricao + "/" + this.loginService.codempresa());
  }

  qtdPagina(){
    return this.http.get<Number>(this.urlApi + "qtdPaginaCategoriaProduto/" + this.loginService.codempresa());
  }

}
