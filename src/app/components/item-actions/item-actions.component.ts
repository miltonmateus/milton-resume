import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { HintComponent } from '../hint/hint.component';

@Component({
  selector: 'app-item-actions',
  imports: [CommonModule, HintComponent],
  templateUrl: './item-actions.component.html',
})
export class ItemActionsComponent {
  @Input() compact = false;
  @Input() showMove = true;
  @Input() disableMoveUp = false;
  @Input() disableMoveDown = false;
  @Input() moveUpLabel = 'Mover para cima';
  @Input() moveDownLabel = 'Mover para baixo';
  @Input() removeLabel = 'Remover item';
  @Input() moveUpHint = 'Move este item uma posição para cima.';
  @Input() moveDownHint = 'Move este item uma posição para baixo.';
  @Input() removeHint = 'Remove este item da seção.';

  @Output() moveUp = new EventEmitter<void>();
  @Output() moveDown = new EventEmitter<void>();
  @Output() remove = new EventEmitter<void>();
}
