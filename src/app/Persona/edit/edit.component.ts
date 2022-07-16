import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/Service/service.service';
import { Router } from '@angular/router';
import { Persona } from 'src/app/modelo/Persona';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  persona: Persona | any;
  editPersona: FormGroup;
  constructor(
    private router: Router,
    private service: ServiceService,
    private fb: FormBuilder
  ) {
    this.editPersona = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      edad: ['', Validators.required],
      nacionalidad: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.editar();
  }

  editar() {
    let id: string | any;
    id = localStorage.getItem('id');
    this.service.getPersonaId(id).subscribe((data) => {
      this.service.updatePersona(data).subscribe((data) => {
        this.persona = data;
      });
    });
  }

  actualizar(persona: Persona) {
    const person: Persona = {
      id: persona.id,
      nombre:
        this.editPersona.value.nombre === ''
          ? this.persona.nombre
          : this.editPersona.value.nombre,
      apellido:
        this.editPersona.value.apellido === ''
          ? this.persona.apellido
          : this.editPersona.value.apellido,
      edad:
        this.editPersona.value.edad === ''
          ? this.persona.edad
          : this.editPersona.value.edad,
      nacionalidad:
        this.editPersona.value.nacionalidad === ''
          ? this.persona.nacionalidad
          : this.editPersona.value.nacionalidad,
    };

    this.service.updatePersona(person).subscribe((data) => {
      this.persona = data;
      alert('Se actualizo correctamente el usuario');
      this.router.navigate(['/listar']);
    });
  }
}
