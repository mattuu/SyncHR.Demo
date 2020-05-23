import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-invoice-row-list-cell',
  templateUrl: './invoice-row-list-cell.component.html',
  styleUrls: ['./invoice-row-list-cell.component.scss']
})
export class InvoiceRowListCellComponent implements OnInit {

  @Input()
  editable: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
