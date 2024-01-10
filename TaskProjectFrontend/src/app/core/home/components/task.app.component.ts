import { Component, Injectable } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ShadowBoxDirective } from '../../../shared/directives/shadow-box.directive';

@Component({
  selector: 'app-task.app',
  standalone: true,
  imports: [RouterModule, ShadowBoxDirective],
  templateUrl: './task.app.component.html',
  styleUrl: './task.app.component.scss'
})
@Injectable({
  providedIn: 'root'
})
export class TaskAppComponent {

}
