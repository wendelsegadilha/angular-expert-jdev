import { Component, OnInit } from '@angular/core';
import { LoginService } from './services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  title = 'angular-expert';
  constructor(private loginService: LoginService, private router: Router){}

  usuarioLogado(){
    return this.loginService.usuarioLogado();
  }
  
  ngOnInit(): void {
    
    if (this.loginService.usuarioLogado()) {
      this.router.navigate(['home']);
    } else {
      this.router.navigate(['login']);
    }

  }
  
}
