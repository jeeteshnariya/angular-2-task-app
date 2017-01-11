import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class TaskService {


  private _api = 'http://localhost:3000/api/';

  constructor(private http: Http) {
    console.log('task service initialized...');
  }

  getTask() {
    return this.http.get(this._api + 'tasks')
      .map(res => res.json());
  }

  addTask(newTask: any) {
    console.log(newTask);

    let headers = new Headers();
    headers.append('content-Type', 'application/json');
    return this.http.post(this._api + 'task', JSON.stringify(newTask), { headers: headers })
      .map(res => res.json());
  }

  deleteTask(id: any) {
    return this.http.delete(this._api + 'tasks/' + id)
      .map(res => res.json());
  }

  updateStatus(task: any) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put(this._api + 'tasks/' + task._id, JSON.stringify(task), { headers: headers })
      .map(res => res.json());
  }


}

export class Task {
  _id: string;
  title: string;
  isDone: boolean;
}
