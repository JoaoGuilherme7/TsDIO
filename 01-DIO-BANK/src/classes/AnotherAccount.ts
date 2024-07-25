import { DioAccount } from "./DioAccount";

export class AnotherAccount extends DioAccount {

    constructor(name: string, accountNumber: number) {
        super(name, accountNumber);
    }

    deposit(amount: number): boolean {
        return (super.deposit(amount + 10));
    }
}