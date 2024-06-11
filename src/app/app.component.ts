import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Usuario } from './model/usuario';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-expert';
  tituloLogin= 'Área Administrativa';

  constructor(private fb: FormBuilder, private loginService: LoginService){

  }

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

}
