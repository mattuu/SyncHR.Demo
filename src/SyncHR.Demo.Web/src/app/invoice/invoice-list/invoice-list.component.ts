import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss']
})
export class InvoiceListComponent implements OnInit {

  public dataSource = [
    { position: 1, name: 'test' },
    { position: 2, name: 'foo' }
  ];
  
  displayedColumns = ['position', 'name']

  constructor() {
  }

  ngOnInit(): void {
  }

}
