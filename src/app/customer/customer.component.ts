import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../customer.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { State } from '@progress/kendo-data-query';
import { AddEvent, RemoveEvent } from '@progress/kendo-angular-grid';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit  {
  custForm: FormGroup;
  public phoneNumberValue: string = "";
  public phoneNumberMask: string = "00000000000";

  public mydata: any = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: this.phoneNumberValue,
    arrivalDate: null,
    numberOfNights: null,
    numberOfGuests: null,
    terms: false,
    comments: "",
  };

  constructor(
    private custService: CustomerService,
    private dialogRef: MatDialogRef<CustomerComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.custForm = this.formBuilder.group({
      firstName: new FormControl(this.mydata.firstName, [Validators.required]),
      lastName: new FormControl(this.mydata.lastName, [Validators.required]),
      email: new FormControl(this.mydata.email, [
        Validators.required,
        Validators.email,
      ]),
      phoneNumber: new FormControl(this.mydata.phoneNumber, [
        Validators.required,
      ]),
    });
  }

  clearForm(){
    this.custForm.reset();


  }
  ngOnInit(): void {
    this.custForm.patchValue(this.data);
  }

  onSubmit() {
    if (this.custForm.valid) {
      if (this.data) {
        let customerUpdate= this.custForm.value;
        customerUpdate.id = this.data.id;
        this.custService
          .updateCustomer(this.data.id, this.custForm.value)
          .subscribe({
            next: (val: any) => {
              alert('Customer details updated!');
              this.dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
              alert("Error while updating the Customer!");
            },
          });
      } else {
        this.custService.addCustomer(this.custForm.value).subscribe({
          next: (val: any) => {
            if(val.status === false){
              alert(val.message);

            }
            else{
              alert('Customer added successfully!');

            }
            this.custForm.reset();
            this.dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
            alert("Error while adding the customer!");
          },
        });
      }
    }
  }



}
