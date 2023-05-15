import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ListarDadosPessoaisService } from '../listarDadosPessoais/listarDadosPessoais.service';
import { Usuario } from '../model/Usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class Login implements OnInit {
  declare usuarioForm: FormGroup;
  hide = true;

  constructor(
    private fb: FormBuilder,
    private listarDadosPessoaisService: ListarDadosPessoaisService,
    private router: Router
  ) {}

  ngOnInit() {
    this.criarDadosPessoaisForm(new Usuario());
  }

  criarDadosPessoaisForm(usuario: Usuario) {
    this.usuarioForm = this.fb.group({
      email: [usuario.email, [Validators.required, Validators.email]],
      password: [
        usuario.password,
        [Validators.required, Validators.maxLength(8)],
      ],
    });
  }

  acessar() {
    this.listarDadosPessoaisService
      .usuario()
      .subscribe((res: Array<Usuario>) => {
        res.map((usuario: Usuario) => {
          this.validarEmail(usuario);
          this.validarPassword(usuario);
          this.validarUsuarioLogado(usuario);
        });
      });
  }

  validarEmail(usuario: Usuario) {
    if (usuario.email != this.email.value) {
      this.email.setErrors({ emailIncorreta: true });
    }
  }

  validarPassword(usuario: Usuario) {
    if (usuario.password != this.password.value) {
      this.password.setErrors({ passwordIncorreta: true });
    }
  }

  private validarUsuarioLogado(usuario: Usuario) {
    if (
      usuario.email == this.email.value &&
      usuario.password == this.password.value
    ) {
      this.router.navigate(['/dashboard']);
    }
  }

  get email() {
    return this.usuarioForm.get('email') as FormControl;
  }

  get password() {
    return this.usuarioForm.get('password') as FormControl;
  }
}
