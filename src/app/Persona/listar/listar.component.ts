import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Persona } from 'src/app/modelo/Persona';
import Swal from 'sweetalert2';
import { ServiceService } from '../../Service/service.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css'],
})
export class ListarComponent implements OnInit {
  personas: Persona[] = [];
  constructor(private service: ServiceService, private router: Router) {}

  ngOnInit(): void {
    this.service.getPersonas().subscribe((data) => {
      this.personas = data;
    });
  }

  editar(persona: Persona) {
    localStorage.setItem('id', persona.id.toString());
    this.router.navigate(['/edit/' + persona.id])
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
      }
    )});
  
  }
}
