import { CryptoAccount } from './CryptoAccount';

export class User {
    private name: string;
    private account: CryptoAccount;

    constructor(name: string, account: CryptoAccount) {
        this.name = name;
        this.account = account;
    }

    // Get user's crypto account
    getAccount(): CryptoAccount {
        return this.account;
    }

    // Get the user's name
    getName(): string {
        return this.name;
    }
}
