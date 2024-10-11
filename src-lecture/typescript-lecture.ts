/**************************************************************************************
 *                                                                                    *
 *        Please do not write anything in this file.                                  *
 *        This file is for lecture purposes only. All changes will be ignored.        *
 *                                                                                    *
 **************************************************************************************/
import {Account} from './classes/Account';
import {Person} from './classes/Person';

const person1 = new Person('John', 'Doe');
const person2 = new Person('Tomáš', 'Šromovský');

const account1: Account = new Account(person1, 'DE89370400440532013000');
const account2: Account = new Account(person2, 'SK16546848958964515646');


account1.printState();
account2.printState();

console.log('------------------------------');

console.log('account1 deposit 1000');
account1.deposit(1000)

account1.printState();

console.log('account1 transfer 500 account2');
account1.transfer(500, account2);

console.log('------------------------------');

account1.printState();
account2.printState();

console.log('------------------------------');

const transaction = account2.transfer(800, account1);
if (!transaction) {
    console.log('Low balance!!!');
}

console.log('------------------------------');

