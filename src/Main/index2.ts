import { CryptoEnum } from '../Classes/CryptoEnum';
import { Crypto } from '../Classes/Crypto';
import { CryptoAccount } from '../Classes/CryptoAccount';
import { User } from '../Classes/User';


const account = new CryptoAccount();


const user = new User('Alice', account);


console.log("--------Fiat deposit---------");
user.getAccount().depositFiat(1000);


console.log("\n----------Crypto buy Bitcoin----------");
const bitcoin = new Crypto(CryptoEnum.Bitcoin);
user.getAccount().buyCrypto(bitcoin, 0.02);


console.log("\n--------Ethereum buy-----------");
const ethereum = new Crypto(CryptoEnum.Ethereum);
user.getAccount().buyCrypto(ethereum, 0.5);


console.log("\n-------Check Balance-----------");
user.getAccount().printBalances();


console.log("\n--------Buy Bitcoin-----------");
user.getAccount().buyCrypto(bitcoin, 10);


console.log("\n---------Check Price---------");
user.getAccount().printBalances();
