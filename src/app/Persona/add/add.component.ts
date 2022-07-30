import { compileNgModule } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Persona } from 'src/app/modelo/Persona';
import { ServiceService } from 'src/app/Service/service.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService, Message } from 'primeng/api';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
  providers: [MessageService],
})
export class AddComponent implements OnInit {
  createPersona: FormGroup;
  persona: Persona | any;
  mostrar: Boolean = false;

  //CONSTRUCTOR CON LOS SERVICIOS Y EL ROUTER
  constructor(
    private router: Router,
    private service: ServiceService,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {
    this.createPersona = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      edad: ['', Validators.required],
      nacionalidad: ['', Validators.required],
    });
  }

  ngOnInit() {}

  //METODO PARA AGREGAR UNA NUEVA PERSONA
  agregarPersona() {
    this.mostrar = !this.mostrar;
    const persona: any = {
      nombre: this.createPersona.value.nombre,
      apellido: this.createPersona.value.apellido,
      edad: this.createPersona.value.edad,
      nacionalidad: this.createPersona.value.nacionalidad,
    };

    //SE LLAMA AL  SERVICIO CREATEPERSONA Y SE LE PASA UNA PERSONA COMO PARAMETRO
    this.service.createPersona(persona).subscribe({
      next: (data) => {
        if (data) {
          Swal.fire({
            title: 'Agregado',
            text: 'Se agrego correctamente el usuario',
            icon: 'success',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Aceptar',
          }).then((result) => {
            if (result.value) {
              setTimeout(() => {
                this.router.navigate(['/listar']);
              }, 2000);
            }
          });
        }
      },
    });
  }
}
