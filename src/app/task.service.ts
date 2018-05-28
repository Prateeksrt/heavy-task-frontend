import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class TaskService {

  constructor(private _http: HttpClient) { }

  getTaskStats() {
    return this._http.get('http://localhost:8080/task')
      .map(result => result);
  }

}
