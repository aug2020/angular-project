import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cardchecker',
  templateUrl: './cardchecker.component.html',
  styleUrls: ['./cardchecker.component.css'],
})
export class CardcheckerComponent implements OnInit {
  valid: string = '';
  cardImg: string = '';
  constructor() {}

  ngOnInit(): void {}

  /* Checks whether credit card value is valid or not and stores in backend db
  @params {string} text
   */
  validateCard(number: string) {
    let cardNum = Number(number);

    // creating 3 regular expressiosn for the 3 types of credit cards
    let visaRegex = /^4[0-9]{12,15}$/;
    let masterRegex = /^5[0-9]{12,15}$/;
    let amerRegex = /^37[0-9]{11,14}$/;

    // first check to make sure no strings are entered
    if (!Number.isNaN(cardNum)) {
      /*Then we check to see if the credit card number is either
      a visa, mastercard or american express
      */
      if (visaRegex.test(cardNum.toString())) {
        this.valid = 'valid';
        this.cardImg = 'visa.png';
      } else if (masterRegex.test(cardNum.toString())) {
        this.valid = 'valid';
        this.cardImg = 'mastercard.png';
      } else if (amerRegex.test(cardNum.toString())) {
        this.valid = 'valid';
        this.cardImg = 'a-express.png';
      } else {
        this.cardImg = '';
        if (cardNum === 0) {
          this.valid = '';
        } else {
          this.valid = 'not valid';
        }
      }
    } else {
      this.valid = 'not valid';
      this.cardImg = '';
    }
  }
}
