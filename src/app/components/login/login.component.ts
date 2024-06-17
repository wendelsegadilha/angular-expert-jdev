import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Usuario } from '../../model/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  tituloLogin= 'Área Administrativa';
  
  constructor(private fb: FormBuilder, private loginService: LoginService){}

  /*Pegar dados do formulário*/
  loginForm = this.fb.group({
    id:[],
    login:[null, Validators.required],
    senha:[null, Validators.required]
  });

  /*Tranforma os dados do form em objeto*/
  loginObjeto(): Usuario {
    return {
      login: this.loginForm.get("login")?.value!,
      senha: this.loginForm.get("senha")?.value!
    }
  }

  fazerLogin(): void {
    const usuario = this.loginObjeto();
    console.log(usuario);
    this.loginService.logar(usuario);
  }

  recuperarSenha(): void {
    const usuario = this.loginObjeto();
    const login = usuario.login;
    
    if (login == '' || login == null) {
      alert("Informe o login para recuperar o senha");
      return;
    }

    this.loginService.recuperarSenha(login);
  }
}
