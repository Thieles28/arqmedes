import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Usuario } from '../model/Usuario';
import { TableService } from '../table/table.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.html',
  styleUrls: ['./registrar.css'],
})
export class Registrar implements OnInit {
  declare usuarioForm: FormGroup;
  hide = true;
  hideConfirm = true;
  declare usuario: Usuario;

  constructor(
    private fb: FormBuilder,
    private tableService: TableService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.criarDadosPessoaisForm(new Usuario());
    this.dadosUsuario();
  }

  criarDadosPessoaisForm(usuario: Usuario) {
    this.usuarioForm = this.fb.group(
      {
        email: [usuario.email, [Validators.required, Validators.email]],
        password: [
          usuario.password,
          [Validators.required, Validators.maxLength(8)],
        ],
        confirmPassword: [usuario.password, [Validators.required]],
      },
      {
        validator: MustMatch('password', 'confirmPassword'),
      }
    );
  }

  dadosUsuario() {
    this.tableService.usuario().subscribe((res: Array<Usuario>) => {
      res.map((usuario: Usuario) => {
        this.usuario = usuario;
      });
    });
  }

  validarUsuario() {
    if (this.email.value == this.usuario.email) {
      this.toastr.warning('E-mail já cadastrado na base de dados!', 'Alerta', {
        progressBar: true,
      });
    } else {
      this.registrarUsuario();
    }
  }

  private registrarUsuario() {
    this.tableService
      .registrarUsuario(this.usuarioForm.value)
      .subscribe((res: Usuario) => {
        if (res != null) {
          this.toastr.success('Usuário cadastrado com sucesso!', 'Sucesso', {
            progressBar: true,
          });
          this.router.navigate(['/login']);
        }
      });
  }

  get email() {
    return this.usuarioForm.get('email') as FormControl;
  }

  get password() {
    return this.usuarioForm.get('password') as FormControl;
  }

  get confirmPassword() {
    return this.usuarioForm.get('confirmPassword') as FormControl;
  }
}

export function MustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
      return;
    }

    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ mustMatch: true });
    } else {
      matchingControl.setErrors(null);
    }
  };
}
