import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {


  constructor() { }

  handleError(error: HttpErrorResponse): void {
    switch (error.status) {
      case 401:
        this.router.navigate(["/login"])
          .then(() => {
            this.authService.logout();
            this.alertService.showAlertError("Erro de autenticação", "O usuário não está mais com um login ativo");
          });
        break;
      case 422:
        this.alertService.showAlert(
          "Dados incorretos",
          error.message,
          5000,
          "warning"
        );
        break;
      case 404:
        this.alertService.showAlert(
          "Dado não encontrado",
          "Não achamos o registro que você está procurando.",
          5000,
          "warning"
        );
        break;
      case 500:
        this.alertService.showAlertError("Erro 500", "Erro interno no servidor, por favor contate o suporte");
        break;
      default:
        this.alertService.showAlertErrorDefault();
    }
  }
}
