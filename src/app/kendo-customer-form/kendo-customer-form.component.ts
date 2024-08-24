import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-kendo-customer-form',
  templateUrl: './kendo-customer-form.component.html',
  styleUrls: ['./kendo-customer-form.component.scss']
})
export class KendoCustomerFormComponent {
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
  public active = false;
  public editForm: FormGroup = new FormGroup({
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

  id="";
  @Input() public isNew = false;

  @Input() public set model(client: any) {
    this.editForm.reset(client);
    this.id = client?.id;
    // toggle the Dialog visibility
    this.active = client !== undefined;
  }

  @Output() cancel: EventEmitter<undefined> = new EventEmitter();
  @Output() save: EventEmitter<any> = new EventEmitter();

  public onSave(e: PointerEvent): void {
    debugger;
    e.preventDefault();
      let val = this.editForm.value;
      val.id = (!this.isNew) ? this.id  : null;
    this.save.emit(val);
    this.active = false;
  }

  public onCancel(e: PointerEvent): void {
    e.preventDefault();
    this.closeForm();
  }

  public closeForm(): void {
    this.active = false;
    this.cancel.emit();
  }

}
