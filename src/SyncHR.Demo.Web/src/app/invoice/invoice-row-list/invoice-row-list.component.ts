import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DataSource } from '@angular/cdk/table';
import { of, Observable, Subject, merge } from 'rxjs';
import { FormBuilder, FormGroup, Validators, NgModel } from '@angular/forms';
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

export enum Mode {
  default,
  edit,
  add
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

  get isEditing(): boolean {
    return this.mode === Mode.edit;
  }

  @Input()
  public invoiceId: number;

  @ViewChild('invoiceRowsTable')
  table: MatTable<any>;

  mode = Mode.default;
  dataSource: InvoiceRowsDataSource;
  submitBusy: boolean;
  selectedRowId: number;

  displayedColumns = ['productName', 'quantity', 'unit', 'unitPrice', 'actions']

  invoiceRowForm: FormGroup;

  // 'productName': 'Wine - Cotes Du Rhone',
  //   'quantity': 16.66,
  //   'unit': 'item',
  //   'unitPrice': 90.67

  constructor(private _formBuilder: FormBuilder, private _invoiceRowService: InvoiceRowService) { }

  ngOnInit(): void {
    this.invoiceRowForm = this._formBuilder.group({
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

  submit(formGroup: FormGroup) {
    if (formGroup.valid) {
      const {
        validate,
        ...model
      } = formGroup.value;

      this.submitBusy = true;

      let action;
      switch (this.mode) {
        case 1:
          this.dataSource.get(this.selectedRowId).subscribe(item => {
            action = this._invoiceRowService.update(item.id, model);
          })
          break;
        case 2:
          action = this._invoiceRowService.create(this.invoiceId, model);
        default:
          break;
      }

      action.subscribe(() => {
        switch (this.mode) {
          case 1:
            this.switchToDefaultView();
            break;
          case 2:
            this.dataSource.add(model).subscribe(() => {
              this.switchToDefaultView();
            });
            break;
          default:
            break;
        }

      }, error => {
        console.log(error)
      }, () => {
        this.submitBusy = false;
      });
    }
  }

  editRow(index: number) {
    // this.table.
    this.selectedRowId = index;

    this.dataSource.get(index).subscribe(item => {
      this.switchMode(Mode.edit);

      const { id, ...data } = item;
      const model = { ...data, 'validate': '' };

      this.invoiceRowForm.setValue(model);
    })

  }

  cancelEdit() {
    this.switchToDefaultView();
  }

  enableAdd() {
    this.switchMode(Mode.add);
  }

  cancelAdd() {
    this.switchToDefaultView();
  }

  toggleEdit() {
    this.mode = this.mode === Mode.edit ? Mode.default : Mode.edit;
  }

  private switchMode(mode: Mode) {
    this.mode = mode;
  }

  private switchToDefaultView() {
    this.table.renderRows();
    this.invoiceRowForm.reset();
    this.invoiceRowForm.setErrors([]);
    this.switchMode(Mode.default);
  }

}

export class InvoiceRowsDataSource extends DataSource<any>
{
  constructor(private _rows: any[]) {
    super();
  }

  get(index: number): Observable<any> {
    const item = this._rows[index];
    return of(item);
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