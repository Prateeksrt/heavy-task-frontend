import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class TaskService {

  constructor(private _http: HttpClient) {
  }

  getTaskStats() {
    return this._http.get('http://localhost:8080/task')
      .map(result => result);
  }

  create() {
    return this._http.post('http://localhost:8080/task', {})
      .map(r => r);
  }

  deleteAll() {
    return this._http.delete('http://localhost:8080/task')
      .map(r => r);
  }
}
