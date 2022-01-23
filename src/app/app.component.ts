import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation, STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component } from '@angular/core';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
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
  ]
})
export class AppComponent {
  #smtpConfig = {
    SecureToken: 'aea96db4-a53b-41e4-ad77-f5c22a50b171'
  };

  cookies: Cookie[] = [
    { flavour: 'Astronomical Swirl', price: [75, 115] },
    { flavour: 'Confetti Bomb', price: [70, 110] },
    { flavour: 'Candy Rain', price: [70, 110] },
    { flavour: 'Cappa-Cookie', price: [60, 100] },
    { flavour: 'Surgary-Cin', price: [60, 100] },
    { flavour: 'Mental Mint Bombs', price: [60, 100] },
    { flavour: 'Chocolate Typhoon', price: [60, 100] },
    { flavour: 'Delicate Surprise', price: [90, 130] },
    { flavour: 'Nostalgic Delight', price: [75, 115] },
    { flavour: 'Pean-nutty & nice', price: [60, 100] },
    { flavour: 'Queen of Hearts', price: [60, 100] },
    { flavour: 'Back to the Beach', price: [75, 115] },
    { flavour: 'Mad Hatters Tea Party', price: [60, 100] },
    { flavour: 'Lovers Paradise', price: [60, 100] },
    { flavour: 'Twixed Dreams', price: [70, 110] }
  ];

  deliveryPrices: DeliveryPrice[] = [
    { where: 'Johannesburg', amount: 50 },
    { where: 'Pretoria', amount: 75 }
  ];

  OrderTypeEnum = OrderTypeEnum;
  orderTypes: OrderType[] = [
    { id: OrderTypeEnum.CHOOSE, value: 'I want to choose' },
    { id: OrderTypeEnum.VARIETY, value: 'Variety Box of 12' },
    { id: OrderTypeEnum.CUSTOM, value: 'I want something custom' }
  ];

  //#region Contact Details FormGroup
  name = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);
  cell = new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[0-9]+')]);
  delivery = new FormControl(false);
  where = new FormControl('Johannesburg');
  address = new FormControl('');

  minDate: Date;
  maxDate: Date;
  orderNeeded: FormControl;

  contactDetailsFG: FormGroup
  //#endregion

  //#region Place Order FormGroup
  orderType = new FormControl(OrderTypeEnum.CHOOSE, [Validators.required]);
  customOrder = new FormControl('');
  qty = new FormControl('0');
  flavour = new FormControl('');

  placeOrderFG = this._formBuilder.group({
    orderType: this.orderType,
    customOrder: this.customOrder,
  });
  //#endregion

  confirmFG = this._formBuilder.group({
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

    this.orderNeeded = new FormControl(this.minDate, [Validators.required]);
    this.contactDetailsFG = this._formBuilder.group({
      name: this.name,
      email: this.email,
      cell: this.cell,
      delivery: this.delivery,
      where: this.where,
      address: this.address,
      orderNeeded: this.orderNeeded
    });
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

  updateOrderType() {
    setTimeout(() => {

      switch (this.orderType.value) {
        case OrderTypeEnum.VARIETY:

          this.customOrder.removeValidators(Validators.required);
          this.customOrder.updateValueAndValidity();
          break;
        case OrderTypeEnum.CUSTOM:
          this.customOrder.addValidators(Validators.required);
          this.customOrder.updateValueAndValidity();

          break;
        default:
          // OrderTypeEnum.CHOOSE

          this.customOrder.removeValidators(Validators.required);
          this.customOrder.updateValueAndValidity();
          break;
      }

      console.log(this.placeOrderFG);

    });
  }

  test() {
    console.log(this.contactDetailsFG);

    // Email.send({
    //   SecureToken: this.#smtpConfig.SecureToken,
    //   To: 'the.everyday.bite.sa@gmail.com',
    //   From: 'kanem410@gmail.com',
    //   Subject: 'NEW ORDER: This is another test',
    //   Body: `<h1>New order from...</h1><br/><p>Kane Mooi</><br/><p>Need to make this look pretty with order details :)</p>`
    // }).then((message: any) => { console.log(message); });
  }
}

type Cookie = {
  flavour: string,
  price: [number, number],
  quantity?: 6 | 12
}

// TODO: Add Regular Customer once they have ordered 5 times
type DeliveryPrice = {
  where: string,
  amount: number
}

type OrderType = {
  id: number,
  value: String
}

enum OrderTypeEnum {
  CHOOSE,
  VARIETY,
  CUSTOM
}

class OrderDetails {
  // orderNumber: number;
}