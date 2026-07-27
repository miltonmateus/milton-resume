import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-hint',
  imports: [],
  templateUrl: './hint.component.html',
})
export class HintComponent {
  @Input({ required: true }) text!: string;
}
