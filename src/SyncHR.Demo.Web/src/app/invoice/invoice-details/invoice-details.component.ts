import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InvoiceService } from '../invoice.service';

@Component({
  selector: 'app-invoice-details',
  templateUrl: './invoice-details.component.html',
  styleUrls: ['./invoice-details.component.scss']
})
export class InvoiceDetailsComponent implements OnInit {

  id: number;
  busy: boolean;
  invoice: any;

  constructor(private _route: ActivatedRoute, private _invoiceService: InvoiceService, private _router: Router) { }

  ngOnInit(): void {
    this.busy = true;
    this._route.params.subscribe(p => {
      this.id = +p['id'];

      this._invoiceService.find(this.id).subscribe(res => {
        this.invoice = res;
      }, error => {
        // TODO handle error...
      }, () => {
        this.busy = false;
      })
    })
  }

  deleteInvoice() {
    const confirm = window.confirm("Are you sure you want to proceed?");
    if (!confirm) {
      return;
    }

    this.busy = true;

    this._invoiceService.delete(this.id).subscribe(() => {
      this._router.navigate(['invoices']);
      //TODO: display success message...
    }, error => {
      debugger;
      console.log(error);
    }, () => {
      this.busy = false;
    })
  }


}
