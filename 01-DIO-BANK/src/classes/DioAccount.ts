export abstract class DioAccount {

    private readonly name: string
    private readonly accountNumber: number
    private status: boolean = true;
    private balance: number = 0;

    constructor(name: string, accountNumber: number) {
        this.name = name;
        this.accountNumber = accountNumber;
    }

    getName(): string {
        return this.name;
    }

    getAccountNumber(): number {
        return this.accountNumber;
    }

    getBalance(): number {
        return this.balance;
    }

    deposit(amount: number): boolean {
        if (this.validateStatus()) {
            this.balance += amount;
            return true
        }

        return false;
    }

    withdraw(amount: number): boolean {
        if (amount <= this.getBalance() && this.validateStatus()) {
            this.balance -= amount;
            return true;
        }
        return false;
    }

    validateStatus(): boolean {
        if (this.status)
            return this.status

        throw new Error('Conta Inválida')
    }
}