import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Task, TasksService } from '../../../../services/tasks.service';

interface Member {
  id: number;
  name: string;
}
@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  @Input() task: Task|null = null;
  @Input() members: Member|null = null;
  @Output() closeEvent = new EventEmitter();
  status: string[] = ["IN-PROGRESS", "COMPLETED"];
  priority: string[] = ["HIGH", "MEDIUM", "LOW"];
  
  form = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required]),
    priority: new FormControl('', [Validators.required]),
    deadline: new FormControl('', [Validators.required]),
    members: new FormControl([], [Validators.required]),
  });

  constructor(private tasksService: TasksService) { }

  ngOnInit() {
    if (this.task)
      this.form.patchValue({
        ...this.task,
        members: typeof this.task.members === 'string' ? JSON.parse(this.task.members as any) : this.task.members,
        deadline: new Date(this.task.deadline),
      });
  }

  close(): void {
    this.closeEvent.next();
  }

  submit(): void {
    const date = JSON.stringify(this.form.get('deadline').value);
    const deadline = date.substring(1, 11);
    const formdata = {
      ...this.form.value,
      deadline,
    };
    if (!this.task)
      this.tasksService.createTask(formdata)
      .subscribe(
        (res: any) => {
          this.closeEvent.next(res.task);
        },
        err => {
          alert(err?.error?.message);
        },
      );
    else
      this.tasksService.updateTask(this.task.id, formdata)
      .subscribe(
        (res: any) => {
          alert(res.message);
          this.closeEvent.next();
        },
        err => {
          alert(err?.error?.message);
        },
      );
  }
}
