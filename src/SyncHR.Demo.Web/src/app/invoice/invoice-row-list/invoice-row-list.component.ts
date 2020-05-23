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

  @ViewChild('invoiceRowsTable')
  table: MatTable<any>;

  dataSource: InvoiceRowsDataSource;

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
      // const rows = [...this.rows];
      // const item = rows.find(r => r['id'] === id)
      // const index = rows.indexOf(item);
      // const updatedRows = rows.splice(index);
      // // debugger;

      // this.dataSource = new InvoiceRowsDataSource(updatedRows);
      this.dataSource.remove(id);

      this.dataSource.connect().subscribe(() => {
        this.table.renderRows();
      });
    }, error => {
      console.log(error);
    });
  }

}

export class InvoiceRowsDataSource extends DataSource<any>
{
  private _recordChange$ = new Subject();

  constructor(private _rows: any[]) {
    super();
  }

  remove(id: number) {
    const rows = [...this._rows];
    const item = this._rows.find(r => r['id'] === id)
    const index = this._rows.indexOf(item);
    this._rows.splice(index, 1);
    
    console.log(this._rows);

    this._recordChange$.next();

  }

  connect(): Observable<any[] | readonly any[]> {

    const changes = [
      this._recordChange$
    ];

    return merge(...changes).pipe(
      switchMap(() => of(this._rows)));

    // return of(this._rows);
  }
  disconnect(): void {
  }

}