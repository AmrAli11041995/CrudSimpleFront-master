import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CustomerService } from './customer.service';
import { CustomerComponent } from './customer/customer.component';
import { State } from '@progress/kendo-data-query';
import { AddEvent, RemoveEvent } from '@progress/kendo-angular-grid';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  displayedColumns: string[] = [
    'fullName',
    'email',
    'phoneNumber',
    'action'
  ];

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog: MatDialog,
    private custService: CustomerService,
  ) {}

  ngOnInit(): void {
    this.getCustomersList();
  }

  openCustomerDialog() {
    const dialogRef = this.dialog.open(CustomerComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getCustomersList();
        }
      },
    });
  }
  pagination :any={};
gridview= [];
  getCustomersList(filter?: any) {
    this.custService.getCustomersList().subscribe({
      next: (res) => {
        debugger
        if(res.status){
          this.gridview = res.data.data;
          this.dataSource = new MatTableDataSource(res.data.data);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.pagination.take = res.data.totalCount
          console.log(res.data);
        } else {
          console.log(res.message);
        }

      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  // for searching customer with name
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteCustomer(id: any) {
    let confirm = window.confirm("Are you sure you want to delete this customer?");
    if(confirm) {
      this.custService.deleteCustomer(id).subscribe({
        next: (res) => {
          alert('Customer deleted!');
          this.getCustomersList();
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  openEditForm(data: any) {
    debugger;
    const dialogRef = this.dialog.open(CustomerComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getCustomersList();
        }
      }
    });
  }

  // ---------------------- for Kendo ------------------------
public gridState: State = {
  sort: [],
  skip: 0,
  take: 5,
};
editDataItem: any;
isNew: boolean=false;

public onStateChange(state: State): void {
  debugger;
  this.gridState = state;

  let model={
    currentPage:((state.skip||0 )/ ((state.take)||5))+1,
    pageSize:state.take
  }
  this.getCustomersList(model);
}

public addHandler(): void {
  this.editDataItem = {};
  this.isNew = true;
}

public editHandler(args: AddEvent): void {
  this.editDataItem = args.dataItem;
  this.isNew = false;
}

public cancelHandler(): void {
  this.editDataItem = undefined;
}

public saveHandler(product: any): void {
  debugger;
  if(this.isNew ){
    this.custService.addCustomer(product).subscribe({
      next: (val: any) => {
        if(val.status === false){
          alert(val.message);

        }
        else{
          alert('Customer added successfully!');
          this.getCustomersList();


        }

      },
      error: (err: any) => {
        console.error(err);
        alert("Error while adding the customer!");
      },
    });

  }else {
    this.custService.updateCustomer(product.id , product).subscribe({
      next: (val: any) => {
        if(val.status){
          alert('Customer details updated!');
          this.getCustomersList();


        } else {
          alert(val.message);

        }
      },
      error: (err: any) => {
        console.error(err);
        alert("Error while updating the Customer!");
      },
    });

  }

  this.editDataItem = undefined;
}

public removeHandler(args: RemoveEvent): void {
  debugger;
  this.custService.deleteCustomer(args?.dataItem?.id).subscribe({
    next: (res) => {
      alert('Customer deleted!');
      this.getCustomersList();
    },
    error: (err) => {
      console.log(err);
    },
  });

}

}
