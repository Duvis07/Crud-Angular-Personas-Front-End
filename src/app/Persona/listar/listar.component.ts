import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Persona } from 'src/app/modelo/Persona';
import Swal from 'sweetalert2';
import { ServiceService } from '../../Service/service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css'],
})
export class ListarComponent implements OnInit {
  personas: Persona[] = [];
  selectedPeople: Persona[] = [];

  constructor(private service: ServiceService, private router: Router) {}

  ngOnInit(): void {
    this.listar();
  }

  listar() {
    this.service.getPersonas().subscribe((data) => {
      this.personas = data;
    });
  }

  editar(persona: Persona) {
    localStorage.setItem('id', persona.id.toString());
    this.router.navigate(['/edit/' + persona.id]);
  }


  eliminar(persona: Persona) {
    this.service.deletePersona(persona).subscribe((data) => {
      this.personas = this.personas.filter((p) => p !== persona);
      Swal.fire({
        title: 'Eliminado',
        text: 'Se elimino correctamente el usuario',
        icon: 'success',
        showCancelButton: false,
      }).then((result) => {
        if (result.value) {
          this.router.navigate(['/listar']);
        }
      });
    });
  }

  updateSelected(person: Persona) {
    if (person.seleccionada) {
      this.selectedPeople.push(person);
    } else {
      const index = this.selectedPeople.indexOf(person);
      if (index > -1) {
        this.selectedPeople.splice(index, 1);
      }
    }
  }

  retirarMasivamente(): void {
    const personasSeleccionadas = this.personas.filter(
      (persona) => persona.seleccionada
    );

    if (personasSeleccionadas.length === 0) {
      Swal.fire({
        title: 'Error',
        text: 'No hay personas seleccionadas',
        icon: 'error',
        showCancelButton: false,
      });
      return; // No hay personas seleccionadas, no se realiza ninguna acción.
    }

    Swal.fire({
      title: '¿Está seguro?',
      text: 'Está seguro que desea retirar las personas seleccionadas',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, retirar',
      cancelButtonText: 'No, cancelar',
    }).then((result) => {
      if (result.value) {
        personasSeleccionadas.forEach((p) => {
          p.estado = 'Retirado';
          this.service.retirarPersona(p.id).subscribe();
        });
        Swal.fire({
          title: 'Retirado',
          text: 'Se retiraron correctamente las personas seleccionadas',
          icon: 'success',
          showCancelButton: false,
        }).then((result) => {
          if (result.value) {
            this.router.navigate(['/listar']);
          }
        });
      }
    });
  }

  seleccionarTodos() {
    this.personas.forEach((persona) => {
      persona.seleccionada = true;
    });
  }
}
