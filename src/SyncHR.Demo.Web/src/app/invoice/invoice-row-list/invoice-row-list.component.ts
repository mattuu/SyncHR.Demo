import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DataSource } from '@angular/cdk/table';
import { of, Observable, Subject, merge } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InvoiceRowService } from 'src/app/shared/invoice-row.service';
import { MatTable } from '@angular/material/table';
import { switchMap } from 'rxjs/operators';

export interface IInvoiceRowModel {
  'id': number;
  'productName': string;
  'quantity': number;
  'unit': string;
  'unitPrice': number;
}

@Component({
  selector: 'app-invoice-row-list',
  templateUrl: './invoice-row-list.component.html',
  styleUrls: ['./invoice-row-list.component.scss']
})
export class InvoiceRowListComponent implements OnInit {

  private _rows: any[];

  @Input()
  set rows(val: any[]) {
    this._rows = val;
    this.dataSource = new InvoiceRowsDataSource(val);
  }

  get rows(): any[] {
    return this._rows;
  }

  @Input()
  public invoiceId: number;

  @ViewChild('invoiceRowsTable')
  table: MatTable<any>;

  dataSource: InvoiceRowsDataSource;
  submitBusy: boolean;

  displayedColumns = ['productName', 'quantity', 'unit', 'unitPrice', 'actions']

  newRowForm: FormGroup;

  // 'productName': 'Wine - Cotes Du Rhone',
  //   'quantity': 16.66,
  //   'unit': 'item',
  //   'unitPrice': 90.67

  constructor(private _formBuilder: FormBuilder, private _invoiceRowService: InvoiceRowService) { }

  ngOnInit(): void {
    this.newRowForm = this._formBuilder.group({
      'productName': [null, Validators.required],
      'quantity': [null, Validators.required],
      'unit': [null, Validators.required],
      'unitPrice': [null, Validators.required],
      'validate': ''
    });
  }

  deleteRow(id: number) {
    this._invoiceRowService.delete(id).subscribe(res => {
      this.dataSource.remove(id).subscribe(() => {
        this.table.renderRows();
      });

    }, error => {
      console.log(error);
    });
  }

  addRow(formGroup: FormGroup) {
    if (formGroup.valid) {
      const {
        validate,
        ...model
      } = formGroup.value;

      this.submitBusy = true;

      this._invoiceRowService.create(this.invoiceId, formGroup.value)
        .subscribe(() => {
          this.dataSource.add(model).subscribe(() => {
            this.table.renderRows();
            this.newRowForm.reset();
            this.newRowForm.setErrors([]);
          });
        }, error => {
          console.log(error)
        }, () => {
          this.submitBusy = false;
        });
    }
  }

}

export class InvoiceRowsDataSource extends DataSource<any>
{
  constructor(private _rows: any[]) {
    super();
  }

  add(model: any): Observable<any> {
    this._rows.push(model);

    return of(this._rows);
  }

  remove(id: number): Observable<any> {
    const item = this._rows.find(r => r['id'] === id)
    const index = this._rows.indexOf(item);
    this._rows.splice(index, 1);

    return of(this._rows);
  }

  connect(): Observable<any[] | readonly any[]> {

    // const changes = [
    //   // this._recordChange$
    // ];

    // return merge(...changes).pipe(
    //   switchMap(() => of(this._rows)));

    return of(this._rows);
  }
  disconnect(): void {
  }

}