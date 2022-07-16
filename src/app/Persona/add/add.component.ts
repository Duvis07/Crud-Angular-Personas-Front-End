import { compileNgModule } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Persona } from 'src/app/modelo/Persona';
import { ServiceService } from 'src/app/Service/service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent implements OnInit {
  createPersona: FormGroup;
  persona: Persona | any;

  constructor(
    private router: Router,
    private service: ServiceService,
    private fb: FormBuilder
  ) {
    this.createPersona = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      edad: ['', Validators.required],
      nacionalidad: ['', Validators.required],
    });
  }

  ngOnInit() {}
  agregarPersona() {
    const persona: any = {
      nombre: this.createPersona.value.nombre,
      apellido: this.createPersona.value.apellido,
      edad: this.createPersona.value.edad,
      nacionalidad: this.createPersona.value.nacionalidad,
    };
    this.service.createPersona(persona).subscribe({
      next: (data) => {
        alert('Se agrego correctamente el usuario');
        this.router.navigate(['/listar']);
      },
    });
  }

  editarEmpleado(id: string) {
    const persona: any = {
      nombre: this.createPersona.value.nombre,
      apellido: this.createPersona.value.apellido,
      edad: this.createPersona.value.edad,
      nacionalidad: this.createPersona.value.nacionalidad,
    };

    this.service.updatePersona(persona).subscribe({
      next: (data) => {
        alert('Se actualizo correctamente el usuario');
        this.router.navigate(['/listar']);
      },
    });
  }
}
