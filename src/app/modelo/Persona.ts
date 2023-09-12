export class Persona {

  //CLASE PERSONA CON SUS ATRIBUTOS Y CONSTRUCTOR
  id: string;
  nombre: string;
  apellido: string;
  edad: string;
  nacionalidad: string;
  estado: string = 'activo';
  seleccionada!: false; // Añade esta propiedad de selección


  
    constructor(id: string, nombre: string, apellido: string, edad: string, nacionalidad: string, estado: string, seleccionada: false) {
      this.id = id;
      this.nombre = nombre;
      this.apellido = apellido;
      this.edad = edad;
      this.nacionalidad = nacionalidad;
      this.estado = estado;
      this.seleccionada = seleccionada;
    }
}
