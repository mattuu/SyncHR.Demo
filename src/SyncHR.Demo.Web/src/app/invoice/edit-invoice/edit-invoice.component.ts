import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InvoiceService } from '../invoice.service';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';

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

@Component({
  selector: 'app-edit-invoice',
  templateUrl: './edit-invoice.component.html',
  styleUrls: ['./edit-invoice.component.scss']
})
export class EditInvoiceComponent implements OnInit {

  invoiceFormGroup: FormGroup;
  public id: number;
  public invoice: any;
  busy: boolean;

  public months: any[] = MONTHS;

  public clientFormControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  public filteredOptions: Observable<string[]>;

  constructor(private _route: ActivatedRoute, private _invoiceService: InvoiceService, private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this._route.params.subscribe(p => {
      this.id = +p['id'];

      this._invoiceService.find(this.id).subscribe(val => {
        this.invoice = val;

        const {
          clientId,
          paymentTypeId,
          rows,
          ...invoiceHeader
        } = val;

        const invoiceModel = { ...invoiceHeader, 'client': '', 'paymentType': '', 'validate': '' };

        this.invoiceFormGroup.setValue(invoiceModel);
      });
    })

    this.filteredOptions = this.clientFormControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );

    this.createForm();
  }

  onSubmit(formGroup: FormGroup) {
    if (!formGroup.invalid) {
      return;
    }

    this.busy = true;

    debugger;
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

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

}
