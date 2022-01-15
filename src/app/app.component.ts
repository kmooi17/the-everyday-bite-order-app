import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation, STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component } from '@angular/core';
import { Validators, FormBuilder, FormControl } from '@angular/forms';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ]
})
export class AppComponent {
  name = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);
  cell = new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[0-9]+')]);
  delivery = new FormControl(false);
  address = new FormControl('');

  minDate: Date;
  maxDate: Date;
  orderNeeded = new FormControl(undefined, [Validators.required]);

  contactDetailsFG = this._formBuilder.group({
    name: this.name,
    email: this.email,
    cell: this.cell,
    delivery: this.delivery,
    address: this.address,
    orderNeeded: this.orderNeeded
  });

  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

  thirdFormGroup = this._formBuilder.group({
    thirdCtrl: ['', Validators.required],
  });

  stepperOrientation: Observable<StepperOrientation>;

  constructor(private _formBuilder: FormBuilder, breakpointObserver: BreakpointObserver) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));

    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const currentDay = new Date().getDate();

    this.minDate = new Date(currentYear, currentMonth, currentDay + 2);
    this.maxDate = new Date(currentYear, 11, 31);
  }

  getCellErrorMessage() {
    if (this.cell.hasError('required')) {
      return 'Please enter your cell number.';
    } else {
      return 'Not a valid cell number.'
    }
  }

  getEmailErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Please enter your email address.';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  updateDeliveryChecked() {
    this.delivery.value ? this.address.addValidators(Validators.required) : this.address.removeValidators(Validators.required);
  }

  test() {
    console.log(this.contactDetailsFG);
  }
}
