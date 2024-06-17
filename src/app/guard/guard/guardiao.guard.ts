import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { environment } from '../../../environments/environment';

export const guardiaoGuard: CanActivateFn = (route, state) => {
  const roles = route.data;
  const username = <string>localStorage.getItem('Username');
  const authorization = <string>localStorage.getItem('Authorization');
  const role = JSON.parse(JSON.stringify(roles)).role.toString();

  // console.log(role);
  // console.log(username);
  // console.log(authorization);

  // requisição sincrona para a API (não passa pelo interceptor)
  const request = new XMLHttpRequest();
  request.open("GET", environment.urlApi + "possuiAcesso/" + username + "/" + role, false);
  request.setRequestHeader("Authorization", authorization);
  request.send();
  const possuiAcessoRetorno = (request.responseText === 'true');
  //console.log(possuiAcessoRetorno);

  return inject(LoginService).usuarioLogado() && possuiAcessoRetorno;
};
