import { Component, OnInit } from '@angular/core';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  dataSource: Object;
  constructor(private tasksService: TasksService) { 
  }

  ngOnInit(): void {
    this.tasksService.getTasks()
    .subscribe(
      res => {
        const { tasks = [] } = res;
        const chart_tasks = tasks.map(task => {
          const members = JSON.parse(task.members);
          return {
            label: task.title,
            value: members.length,
          }
        });
        this.dataSource = {
          chart: {
            caption: 'Statistics about Tasks assign to no of Members',
            // subCaption: 'In MMbbl = One Million barrels',
            xAxisName: 'Tasks',
            yAxisName: 'Members',
            // numberSuffix: 'K',
            theme: 'fusion'
          },
          data: [
            ...chart_tasks,
          ]
        };
      }, err => console.log(err.error.message),
    )
  }

}
