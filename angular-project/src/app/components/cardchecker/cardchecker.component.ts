import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-cardchecker',
  templateUrl: './cardchecker.component.html',
  styleUrls: ['./cardchecker.component.css'],
})
export class CardcheckerComponent implements OnInit {
  //setting default values that will be altered after credit card number is inputted
  valid: string = '';
  cardImg: string = '';
  color: string = '';
  cardNum: string = '';

  constructor(private http: HttpClient, private cookie: CookieService) {}

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
    //Checking to make sure the enter card number is not an empty string
    if (cardNum !== 0) {
      // first check to make sure no strings are entered
      if (!Number.isNaN(cardNum)) {
        /*Then we check to see if the credit card number is either
      a visa, mastercard or american express
      */
        if (visaRegex.test(cardNum.toString())) {
          this.valid = 'valid';
          this.color = '#32CD32';
          this.cardImg = 'visa.png';
        } else if (masterRegex.test(cardNum.toString())) {
          this.valid = 'valid';
          this.color = '#32CD32';
          this.cardImg = 'mastercard.png';
        } else if (amerRegex.test(cardNum.toString())) {
          this.valid = 'valid';
          this.color = '#32CD32';
          this.cardImg = 'a-express.png';
        } else {
          this.cardImg = '';
          this.valid = 'not valid';
          this.color = '#ed4337';
        }
        //submitting card number into in memory
      } else {
        this.valid = 'not valid';
        this.cardImg = '';
        this.color = '#ed4337';
      }
      this.http
        .get(`http://localhost:8080/submitCard?cardNumber=${number}`, {
          responseType: 'text',
        })
        .subscribe();
    } else {
      this.valid = '';
      this.cardImg = '';
      this.color = '';
    }

    //checking to make sure entered number is not an empty string before submitting
  }

  /**
   * Set inputed card number as a secure cookie for persistance after refresh
   * @param value
   */
  setCookie(value: string) {
    this.cookie.set('num', value);
  }

  onChange(event: any) {
    console.log(event);
  }
}
