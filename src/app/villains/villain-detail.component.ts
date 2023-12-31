import {
  Component,
  Input,
  EventEmitter,
  OnChanges,
  Output,
  SimpleChanges,
  ChangeDetectionStrategy,
} from '@angular/core';

import { Villain } from '../core';
import { ButtonFooterComponent } from '../shared/button-footer.component';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-villain-detail',
    template: `
    <div class="card edit-detail">
      <header class="card-header">
        <p class="card-header-title">
          {{ editingVillain.name }}
          &nbsp;
        </p>
      </header>
      <div class="card-content">
        <div class="content">
          <div class="field" *ngIf="editingVillain.id">
            <label class="label" for="id"> id </label>
            <input
              name="id"
              class="input"
              type="text"
              [(ngModel)]="editingVillain.id"
              placeholder="e.g. VillainColleen"
              readOnly
            />
          </div>
          <div class="field">
            <label class="label" for="name"> name </label>
            <input
              name="name"
              class="input"
              type="text"
              [(ngModel)]="editingVillain.name"
              placeholder="e.g. Colleen"
            />
          </div>
          <div class="field">
            <label class="label" for="description"> description </label>
            <input
              name="description"
              class="input"
              type="text"
              [(ngModel)]="editingVillain.description"
              placeholder="dance fight!"
            />
          </div>
        </div>
      </div>
      <footer class="card-footer ">
        <app-button-footer
          class="card-footer-item"
          [className]="'cancel-button'"
          [iconClasses]="'fas fa-undo'"
          (clicked)="clear()"
          label="Cancel"
          [item]="editingVillain"
        ></app-button-footer>
        <app-button-footer
          class="card-footer-item"
          [className]="'save-button'"
          [iconClasses]="'fas fa-save'"
          (clicked)="saveVillain()"
          label="Save"
          [item]="editingVillain"
        ></app-button-footer>
      </footer>
    </div>
  `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        NgIf,
        FormsModule,
        ButtonFooterComponent,
    ],
})
export class VillainDetailComponent implements OnChanges {
  @Input() villain: Villain;
  @Output() unselect = new EventEmitter<string>();
  @Output() save = new EventEmitter<Villain>();

  addMode = false;
  editingVillain: Villain;

  ngOnChanges(changes: SimpleChanges) {
    if (this.villain && this.villain.id) {
      this.editingVillain = { ...this.villain };
      this.addMode = false;
    } else {
      this.editingVillain = { id: undefined, name: '', description: '' };
      this.addMode = true;
    }
  }

  clear() {
    this.unselect.emit();
  }

  saveVillain() {
    this.save.emit(this.editingVillain);
    this.clear();
  }
}
