export class Persona {

  //CLASE PERSONA CON SUS ATRIBUTOS Y CONSTRUCTOR
  id: string;
  nombre: string;
  apellido: string;
  edad: string;
  nacionalidad: string;

  
    constructor(id: string, nombre: string, apellido: string, edad: string, nacionalidad: string) {
      this.id = id;
      this.nombre = nombre;
      this.apellido = apellido;
      this.edad = edad;
      this.nacionalidad = nacionalidad;
    }
}
