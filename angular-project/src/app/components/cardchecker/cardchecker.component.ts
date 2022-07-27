import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-cardchecker',
  templateUrl: './cardchecker.component.html',
  styleUrls: ['./cardchecker.component.css'],
})
export class CardcheckerComponent implements OnInit {
  //setting default values that will be altered after credit card number is inputted
  valid = { valid: false, msg: '', color: '' };

  cardImg: string = '';
  cardNum: string = '';

  //array of regular expressions for each type of credit card
  regExArray = [
    { img: 'visa.png', regEx: /^4[0-9]{12,15}$/g },
    { img: 'mastercard.png', regEx: /^5[0-9]{12,15}$/g },
    { img: 'a-express.png', regEx: /^37[0-9]{11,14}$/g },
  ];

  constructor(private http: HttpClient, private cookie: CookieService) {}

  ngOnInit(): void {
    this.cardNum = CryptoJS.AES.decrypt(
      this.cookie.get('num'),
      'creditcardvalidator1755'
    ).toString(CryptoJS.enc.Utf8);
  }

  /**
   * Set inputed card number as a secure cookie for persistance after refresh
   * @param value
   */
  setCookie(value: string) {
    //using cryptojs to encrypted credit card number in session cookie

    var encryptedString = CryptoJS.AES.encrypt(
      value,
      'creditcardvalidator1755'
    ).toString();
    this.cookie.set('num', encryptedString);
  }

  /**
   * Checks whether credit card value is valid or not and stores in backend db
   * @param number
   */
  validateCard(number: string) {
    //regular expression to check if value enter is only numbers
    let regEx = /^[0-9]{1,}$/g;

    if (regEx.test(number)) {
      //searching for the corresponding credit card
      var val = this.regExArray.find((e) => {
        return number.match(e.regEx) !== null;
      });
      if (val !== undefined) {
        this.valid = {
          valid: true,
          msg: 'Card number is valid',
          color: '#32CD32',
        };
        this.cardImg = val.img;
      } else {
        this.valid = {
          valid: false,
          msg: 'Card number not valid',
          color: '#ed4337',
        };
        this.cardImg = '';
      }
    } else {
      this.valid = {
        valid: false,
        msg: 'Card number not valid',
        color: '#ed4337',
      };
    }

    //sending card back to back-end
    this.http
      .get(`http://localhost:8080/submitCard?cardNumber=${number}`, {
        responseType: 'text',
      })
      .subscribe();
    this.setCookie(number);
    //checking to make sure entered number is not an empty string before submitting
  }
}
