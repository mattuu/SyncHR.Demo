import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../invoice.service';
import { DataSource } from '@angular/cdk/table';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss']
})
export class InvoiceListComponent implements OnInit {

  public dataSource = new InvoicesDataSource(this._invoiceService);

  displayedColumns = ['id', 'year', 'month', 'number', 'clientName', 'sellDate', 'issueDate', 'payTime', 'isPaid', 'paymentTypeName', 'grossAmount', 'netAmount']

  constructor(private _invoiceService: InvoiceService) {
  }

  ngOnInit(): void {
  }

}

export class InvoicesDataSource extends DataSource<any> {
  constructor(private _invoicesService: InvoiceService) {
    super();
  }

  connect(): Observable<any[]> {
    return this._invoicesService.get();
  }

  disconnect() { }
}