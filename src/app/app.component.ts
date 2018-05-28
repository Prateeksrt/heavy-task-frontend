import {Component, OnInit} from '@angular/core';
import { TaskService } from './task.service';
import {TaskStats} from './task-stats';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(private taskService: TaskService) {}

  taskStats: TaskStats = new TaskStats();

  ngOnInit(): void {
    this.taskService.getTaskStats()
      .subscribe(res => {
        this.taskStats.averageResponseTime = res['averageResponseTime'];
        this.taskStats.lastChecked = res['lastChecked'];
        this.taskStats.lastResponseTime = res['lastResponseTime'];
        this.taskStats.numberOfFailure = res['numberOfFailure'];
        this.taskStats.numberOfSuccess = res['numberOfSuccess'];
      });
  }

}
