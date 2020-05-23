import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InvoiceService } from '../invoice.service';
import { Observable, forkJoin, of } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { debounceTime, switchMap, tap, finalize } from 'rxjs/operators';
import { ClientService } from 'src/app/shared/client.service';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/shared/date-adapter';
import { PaymentTypeService } from 'src/app/shared/payment-type.service';
import { error } from 'protractor';

const MONTHS = [
  { value: 1, label: 'January' },
  { value: 2, label: 'February' },
  { value: 3, label: 'March' },
  { value: 4, label: 'April' },
  { value: 5, label: 'May' },
  { value: 6, label: 'Jun' },
  { value: 7, label: 'July' },
  { value: 8, label: 'August' },
  { value: 9, label: 'September' },
  { value: 10, label: 'October' },
  { value: 11, label: 'November' },
  { value: 12, label: 'December' }
];

const NEW_INVOICE = {
  year: '',
  month: '',
  number: '',
  sellDate: new Date(),
  issueDate: new Date(),
  isPaid: false,
  payTime: '',
  client: { id: 0 },
  paymentType: { id: 1 },
  grossAmount: 0,
  netAmount: 0,
  rows: []
}

export enum Mode {
  edit,
  add
}

@Component({
  selector: 'app-edit-invoice',
  templateUrl: './edit-invoice.component.html',
  styleUrls: ['./edit-invoice.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
  ]
})
export class EditInvoiceComponent implements OnInit {

  invoiceFormGroup: FormGroup;
  public id: number;
  public invoice: any;
  busy: boolean;
  clientsBusy: boolean;
  paymentTypes: [];

  clientAutocompleteDisplayFn = client => client.name;

  months: any[] = MONTHS;
  mode: Mode;

  public filteredClientOptions: Observable<any>;

  constructor(private _route: ActivatedRoute,
    private _router: Router,
    private _invoiceService: InvoiceService,
    private _clientService: ClientService,
    private _paymentTypeService: PaymentTypeService,
    private _formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    const paymentTypesPromise = this._paymentTypeService.get();

    this._route.params.subscribe(p => {
      this.id = +p['id'];

      this.mode = isNaN(this.id) ? Mode.add : Mode.edit;

      const invoicePromise = this.mode === Mode.edit ? this._invoiceService.find(this.id) : of(NEW_INVOICE);

      forkJoin(invoicePromise, paymentTypesPromise).subscribe(res => {
        const [invoice, paymentTypes] = res;

        this.invoice = invoice;
        this.paymentTypes = paymentTypes;

        const {
          paymentType: { id: paymentTypeId },
          rows,
          ...invoiceHeader
        } = invoice;

        const invoiceModel = { ...invoiceHeader, 'paymentType': paymentTypeId, 'validate': '' };

        this.invoiceFormGroup.setValue(invoiceModel);
      })
    })

    this.createForm();

    this.filteredClientOptions = this.invoiceFormGroup.get('client')
      .valueChanges
      .pipe(
        debounceTime(300),
        tap(() => this.clientsBusy = true),
        switchMap(value => this._clientService.find(value)
          .pipe(
            finalize(() => this.clientsBusy = false),
          )
        ));
  }

  onSubmit(formGroup: FormGroup) {
    if (formGroup.invalid) {
      return;
    }

    this.busy = true;

    const model = { ...formGroup.value, 'clientId': formGroup.get('client').value.id, 'paymentTypeId': formGroup.get('paymentType').value };

    const action = this.mode === model.edit ?
      this._invoiceService.update(this.id, model) :
      this._invoiceService.create(model);

    action.subscribe(() => {
      this._router.navigate(['invoices']);
      // TODO: display success message...
    }, error => {
      debugger;
      // TODO: handle API error...
    }, () => {
      this.busy = false;
    });
  }

  deleteInvoice(){
    this._invoiceService.delete(this.id).subscribe(() => {
      this._router.navigate(['invoices']);
      //TODO: display success message...
    }, error => {
      debugger;
      console.log(error);
    })
  }

  private createForm() {
    this.invoiceFormGroup = this._formBuilder.group({
      'year': [null, Validators.required],
      'month': [null, Validators.required],
      'number': [null, Validators.required],
      'client': [null, Validators.required],
      'sellDate': [null, Validators.required],
      'issueDate': [null, Validators.required],
      'payTime': [null, Validators.required],
      'isPaid': [null, Validators.required],
      'paymentType': [null, Validators.required],
      'grossAmount': [null, Validators.required],
      'netAmount': [null, Validators.required],
      'validate': ''
    });
  }
}
