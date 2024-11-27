import {Component, Input} from '@angular/core';
import {Column} from '../../types/column.type';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-table',
  imports: [
    NgClass
  ],
  templateUrl: './table.component.html',
})
export class TableComponent<T> {

  @Input() columns: Column<T>[] = [];
  @Input() rows: T[] = [];

}
