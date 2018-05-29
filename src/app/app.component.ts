import {Component, OnInit} from '@angular/core';
import {TaskService} from './task.service';
import {TaskStats} from './task-stats';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  disable = false;

  constructor(private taskService: TaskService) {
  }

  taskStats: TaskStats;

  ngOnInit(): void {
    this.fetchTaskStats();
  }

  private fetchTaskStats() {
    const ts = new TaskStats();
    this.taskService.getTaskStats()
      .subscribe(res => {
        ts.averageResponseTime = res['averageResponseTime'];
        ts.lastChecked = res['lastChecked'];
        ts.lastResponseTime = res['lastResponseTime'];
        ts.numberOfFailure = res['numberOfFailure'];
        ts.numberOfSuccess = res['numberOfSuccess'];
        ts.lastTenResponse = res['lastTenResponseTime'];
        ts.lastUpdated = new Date();
        this.taskStats = ts;
      });
  }

  onRefresh() {
    this.fetchTaskStats();
  }


  createEvent() {
    if (!this.disable) {
      this.disable = true;
      this.taskService.create().subscribe(
        res => {
          this.fetchTaskStats();
          this.disable = false;
        }
      );
    }
  }

  clearStats() {
    if (!this.disable) {
      this.disable = true;
      this.taskService.deleteAll().subscribe(
        res => {
          this.fetchTaskStats();
          this.disable = false;
        }
      );
    }
  }
}
