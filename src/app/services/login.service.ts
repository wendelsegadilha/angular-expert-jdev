import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../model/usuario';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private urlLogin = environment.urlApi + 'login';

  constructor(private http: HttpClient) { }

  logar(usuario: Usuario) {
    return this.http.post<string>(this.urlLogin, usuario).subscribe({
      next: (res) => {
        console.log(res);
        const token = JSON.stringify(res);
        const jwt = JSON.parse(token);
        localStorage.setItem("Authorization", jwt.Authorization);
        alert("Login realizado");
      },
      error: (error) => {
        console.log(error)
        alert("Ocorreu um erro");;
      }
    });
  }

}
