import { DioAccount } from "./DioAccount";

export class CorporateAccount extends DioAccount {
    constructor(name: string, accountNumber: number) {
        super(name, accountNumber);
    }

    getLoan (loanAmount: number){
        if(super.deposit(loanAmount)){
            console.log(`${super.getName()} pegou um empréstimo`);
        }
        else console.log('não foi possível fazer o empréstimo');
    }
}