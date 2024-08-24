import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KendoCustomerFormComponent } from './kendo-customer-form.component';

describe('KendoCustomerFormComponent', () => {
  let component: KendoCustomerFormComponent;
  let fixture: ComponentFixture<KendoCustomerFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KendoCustomerFormComponent]
    });
    fixture = TestBed.createComponent(KendoCustomerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
