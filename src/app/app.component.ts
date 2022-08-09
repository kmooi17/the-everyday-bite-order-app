import { BreakpointObserver } from '@angular/cdk/layout';
import {
  StepperOrientation,
  STEPPER_GLOBAL_OPTIONS,
} from '@angular/cdk/stepper';
import { Component } from '@angular/core';
import {
  Validators,
  FormBuilder,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { Observable, map } from 'rxjs';

declare let Email: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
})
export class AppComponent {
  // #smtpConfig = {
  //   SecureToken: 'aea96db4-a53b-41e4-ad77-f5c22a50b171',
  // };

  deliveryPrices: DeliveryPrice[] = [
    { where: 'Johannesburg', amount: 50 },
    { where: 'Pretoria', amount: 75 },
  ];

  ValidLengthEnum = ValidLengthEnum;

  //#region Contact Details FormGroup
  name = new FormControl('', [
    Validators.required,
    Validators.minLength(ValidLengthEnum.MIN),
    Validators.maxLength(ValidLengthEnum.DEFAULT),
  ]);
  email = new FormControl('', [
    Validators.required,
    Validators.email,
    Validators.maxLength(320),
  ]);
  cell = new FormControl('', [
    Validators.required,
    Validators.minLength(10),
    Validators.maxLength(10),
    Validators.pattern('[0-9]+'),
  ]);
  where = new FormControl('Johannesburg');
  address = new FormControl('', [
    Validators.required,
    Validators.maxLength(ValidLengthEnum.MAX),
  ]);

  minDate: Date;
  maxDate: Date;
  orderNeeded: FormControl;

  contactDetailsFG: FormGroup;
  //#endregion

  //#region Place Order FormGroup
  customOrder = new FormControl('', [
    Validators.required,
    Validators.maxLength(ValidLengthEnum.MAX),
  ]);

  placeOrderFG = this._formBuilder.group({
    customOrder: this.customOrder,
  });
  //#endregion

  stepperOrientation: Observable<StepperOrientation>;

  constructor(
    private _formBuilder: FormBuilder,
    breakpointObserver: BreakpointObserver
  ) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));

    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const currentDay = new Date().getDate();

    this.minDate = new Date(currentYear, currentMonth, currentDay + 2);
    this.maxDate = new Date(currentYear, 11, 31);

    this.orderNeeded = new FormControl(this.minDate, [Validators.required]);
    this.contactDetailsFG = this._formBuilder.group({
      name: this.name,
      email: this.email,
      cell: this.cell,
      where: this.where,
      address: this.address,
      orderNeeded: this.orderNeeded,
    });
  }

  getFullNameErrorMessage() {
    if (this.name.hasError('required')) {
      return 'Please enter your full name.';
    } else if (this.name.hasError('minlength')) {
      return `Minimum length should be ${ValidLengthEnum.MIN} characters long.`;
    } else if (this.name.hasError('maxlength')) {
      return `Maximum length should be ${ValidLengthEnum.DEFAULT} characters long.`;
    } else {
      return 'Not a valid full name.';
    }
  }

  getEmailErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Please enter your email address.';
    }

    return this.email.hasError('email') ? 'Not a valid email.' : '';
  }

  getCellErrorMessage() {
    if (this.cell.hasError('required')) {
      return 'Please enter your cell number.';
    } else {
      return 'Not a valid cell number.';
    }
  }

  submitOrder() {
    // Email.send({
    //   SecureToken: this.#smtpConfig.SecureToken,
    //   To: 'the.everyday.bite.sa@gmail.com',
    //   From: 'kanem410@gmail.com',
    //   Subject: 'NEW ORDER: This is another test',
    //   Body: `<h1>New order from...</h1><br/><p>Kane Mooi</><br/><p>Need to make this look pretty with order details :)</p>`
    // }).then((message: any) => { console.log(message); });
  }
}

type DeliveryPrice = {
  where: string;
  amount: number;
};

enum ValidLengthEnum {
  MIN = 5,
  CELL = 10,
  DEFAULT = 50,
  EMAIL = 320,
  MAX = 512,
}
