export class Persona {
  [x: string]: unknown;

  //CLASE PERSONA CON SUS ATRIBUTOS Y CONSTRUCTOR
  id: number;
  nombre: string;
  apellido: string;
  edad: string;
  nacionalidad: string;
  estado: string = 'activo';
  seleccionada!: boolean;


  
    constructor(id: number, nombre: string, apellido: string, edad: string, nacionalidad: string, estado: string, seleccionada: false) {
      this.id = id;
      this.nombre = nombre;
      this.apellido = apellido;
      this.edad = edad;
      this.nacionalidad = nacionalidad;
      this.estado = estado;
      this.seleccionada = seleccionada;
    }
}
