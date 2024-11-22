import {Component, Input} from '@angular/core';
import {Column} from '../../types/column.type';

@Component({
  selector: 'app-table',
  imports: [],
  templateUrl: './table.component.html'
})
export class TableComponent<T> {

  @Input() columns: Column<T>[] = [];
  @Input() rows: T[] = [];
}
