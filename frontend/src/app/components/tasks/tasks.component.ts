import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { TasksService, Task, TaskResponse } from 'src/app/services/tasks.service';

interface Member {
  id: number;
  name: string;
}
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  displayedColumns: string[] = ['id', 'title', 'description', 'status', 'priority', 'deadline', 'actions'];
  dataSource = [];
  originalDataSource = [];
  task: Task|null = null;
  edit: boolean = false;
  view: boolean = false;
  actions = {
    create: false,
    edit: false,
    view: false,
  };
  members: Member[] = [];
  membersObj: {[key: number]: string} = {};
  constructor(private tasksService: TasksService, private authService: AuthService) { }

  ngOnInit() {
    this.getTasks();
  }

  selectTask(id: number, edit = false, view = false) {
    const task: Task = this.dataSource.find(task => task.id === id);
    this.task = task;
    this.actions = {
      ...this.actions,
      edit,
      view,
    };
  }

  deleteTask(id: number) {
    const response = confirm('Press OK to delete the task');
    if (!response)
      return;
    this.tasksService.deleteTask(id)
    .subscribe(
      () => {
        this.dataSource = [...this.dataSource.filter((data: Task) => data.id !== id)];
      },
      err => alert(err?.error?.message),
    )
  }

  handleClose() {
    this.actions = {
      ...this.actions,
      create: false,
      edit: false,
    };
    this.task = null;
    this.getTasks();
  }

  public doFilter = (value: string) => {
    this.dataSource = this.originalDataSource.filter(data => {
      const data_as_string = (data.title + data.description + data.status + data.priority + data.deadline).trim().toLocaleLowerCase();
      return data_as_string.includes(value);
    });
    if (value === '')
      this.dataSource = [...this.originalDataSource];
  }

  private getTasks() {
    this.tasksService.getTasks()
    .subscribe(
      async (res: TaskResponse) => {
        const { tasks = [] } = res;
        try {
          const user = await this.authService.getUser();
          const { users = [] } = await this.authService.getMembers();
          this.members = users.filter(usr => usr.id !== user.id);
          for(let user of users) {
            this.membersObj[user.id] = user.name;
          }
          this.dataSource = tasks.map(task => ({
            ...task,
            members: JSON.parse(task.members as any),
            enabled: task.user_id === user.id,
          }));
          this.originalDataSource = [...this.dataSource];
        } catch(e) {console.log(e)}
      },
      (err: any) => {
        console.log(err);
      }
    )
  }
}
