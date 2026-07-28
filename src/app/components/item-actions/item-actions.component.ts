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
  @Input() moveUpLabel = 'Move up';
  @Input() moveDownLabel = 'Move down';
  @Input() removeLabel = 'Remove item';
  @Input() moveUpHint = 'Move this item up.';
  @Input() moveDownHint = 'Move this item down.';
  @Input() removeHint = 'Remove this item.';

  @Output() moveUp = new EventEmitter<void>();
  @Output() moveDown = new EventEmitter<void>();
  @Output() remove = new EventEmitter<void>();
}
