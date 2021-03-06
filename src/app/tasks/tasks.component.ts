import { Component, OnInit } from '@angular/core';
import { TaskService, Task } from '../services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
  providers: [TaskService]
})
export class TasksComponent implements OnInit {
  tasks: Task[];
  title: string;
  constructor(private taskService: TaskService) {
    this.taskService.getTask()
      .subscribe(tasks => {
        this.tasks = tasks;
      });
  }

  addTask() {
    let newTask = {
      title: this.title,
      isDone: false,
    };
    this.taskService.addTask(newTask)
      .subscribe(task => {
        this.tasks.push(task);
        this.title = '';
      });

  }

  deleteTask(id: any) {
    let tasks = this.tasks;
    console.log(id);

    this.taskService.deleteTask(id)
      .subscribe(data => {
        if (data.n === 1) {
          for (let i = 0; i < tasks.length; i++) {
            if (tasks[i]._id === id) {
              tasks.splice(i, 1);
            }
          }
        }
      });
  }

  updateStatus(task: any) {
    let _task = {
      _id: task._id,
      title: task.title,
      isDone: !task.isDone
    };
    this.taskService.updateStatus(_task).subscribe(data => {
      task.isDone = !task.isDone;
    });
  }

  ngOnInit() {

  }

}



