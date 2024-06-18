import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../model/usuario';
import { Router } from '@angular/router';
import { PessoaJuridica } from '../model/pessoa-juridica';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private urlLogin = environment.urlApi + 'login';
  private urlRecuperarsenha = environment.urlApi + 'recuperarSenha';

  constructor(private http: HttpClient, private router: Router) { }

  objetoEmpresa():PessoaJuridica {
    return new PessoaJuridica(Number(this.codempresa()));
  }

  codempresa(){
    return localStorage.getItem("empresa");
  }

  logar(usuario: Usuario) {
    return this.http.post<string>(this.urlLogin, usuario).subscribe({
      next: (res) => {
        console.log(res);
        const token = JSON.stringify(res);
        const jwt = JSON.parse(token);
        localStorage.setItem("Authorization", jwt.Authorization);
        localStorage.setItem("Username", jwt.username);
        localStorage.setItem("empresa", jwt.empresa);
        this.router.navigate(['home']);
      },

      error: (error) => {
        console.log(error)
        alert("Ocorreu um erro");;
      }
    });
  }

  recuperarSenha(login: string) {
    console.log('chamou o recuperar senha: ' + login);
    return this.http.post<string>(this.urlRecuperarsenha, login).subscribe({

      next: (res) => {
        let msgObj = JSON.stringify(res);
        const msgJson = JSON.parse(msgObj);
        console.log(msgJson.msg);
        alert(msgJson.msg);
      },

      error: (error) => {
        let msgObj = JSON.stringify(error);
        const msgJson = JSON.parse(msgObj);
        console.log(msgJson.msg);
        alert(msgJson.msg);
      }

    });
  }

  usuarioLogado(): boolean {
    const authorization = ''+localStorage.getItem('Authorization');
    return (authorization !== null && authorization !== '' && authorization != 'null');
  }

  deslogar():void {
    localStorage.setItem("Authorization", '');
    localStorage.setItem("Username", '');
    this.router.navigate(['login']);
  }

}
