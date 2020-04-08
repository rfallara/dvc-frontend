import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-edit-notes',
  templateUrl: './edit-notes.component.html',
  styleUrls: ['./edit-notes.component.css']
})
export class EditNotesComponent implements OnInit {
  @Input() tripNotes: string;
  @Output() editComplete: EventEmitter<any> = new EventEmitter<any>();
  editing = false;
  preValue = '';

  constructor() {
  }

  ngOnInit() {
  }

  onEditComplete() {
    this.editing = false;
    this.editComplete.emit({
      'newNotes' : this.tripNotes,
      'originalNotes': this.preValue
    });
  }

  onEditCancel() {
    this.editing = false;
    this.tripNotes = this.preValue;
  }

  beginEdit(value) {
    this.preValue = this.tripNotes;
    this.editing = true;
  }

  onBlur() {
    this.preValue = '';
    this.editing = false;
  }

}
