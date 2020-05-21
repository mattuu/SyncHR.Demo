import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../invoice.service';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss']
})
export class InvoiceListComponent implements OnInit {

  public dataSource = [];

  displayedColumns = ['id', 'year', 'month', 'number', 'clientName', 'sellDate', 'issueDate', 'payTime', 'isPaid', 'paymentTypeName', 'grossAmount', 'netAmount' ]

  // public int PayTime { get; set; }

  // public bool IsPaid { get; set; }

  // public string PaymentTypeName { get; set; }

  // public decimal GrossAmount { get; set; }

  // public decimal NetAmount { get; set; }
  constructor(private _invoiceService: InvoiceService) {
  }

  ngOnInit(): void {
    this._invoiceService.get().subscribe(data => {
      this.dataSource = data;
    })
  }

}
