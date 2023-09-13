import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Persona } from '../modelo/Persona';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  [x: string]: any;

  constructor(private http: HttpClient) {}

  Url = 'http://localhost:8080/';

  getPersonas() {
    let direction = this.Url + 'listar';
    return this.http.get<Persona[]>(direction);
  }

  createPersona(persona: Persona): Observable<any> {
    let direction = this.Url + 'add';
    return this.http.post<any>(direction, persona, {
      responseType: 'text' as 'json',
    });
  }

  getPersonaId(id: number) {
    let direction = this.Url + 'listarId/' + id;
    return this.http.get<Persona>(direction);
  }

  updatePersona(persona: Persona): Observable<any> {
    let direction = this.Url + 'edit' + '/' + persona.id;
    return this.http.put<Persona>(direction, persona);
  }

  deletePersona(persona: Persona) {
    let direction = this.Url + 'delete' + '/' + persona.id;
    return this.http.delete<Persona>(direction);
  }

  retirarPersona(id: number): Observable<any> {
    const url = `${this.Url}${id}/retirar`;
    return this.http.post(url, {});

  }
}
