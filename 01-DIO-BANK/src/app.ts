import { AnotherAccount } from "./classes/AnotherAccount";
import { CorporateAccount } from "./classes/CorporateAccount";
import { IndividualAccount } from "./classes/IndividualAccount";

const joaoAccount = new IndividualAccount(17000000000, 'João', 1);
const walmartAccount = new CorporateAccount('Walmart', 2);
const anyAccount = new AnotherAccount('Zé ninguem', 3)


console.log(joaoAccount);
console.log('\n###############\n')
console.log(walmartAccount);
console.log('\n###############\n')
console.log(anyAccount)
console.log('\n###############\n')

joaoAccount.deposit(10)
console.log(`Saldo de João: ${joaoAccount.getBalance()}`);
console.log('\n###############\n')

walmartAccount.getLoan(10000);
console.log(`Saldo de Walmart: ${walmartAccount.getBalance()}`);
console.log('\n###############\n')

anyAccount.deposit(100);
console.log(`Saldo de Zé Ninguem: ${anyAccount.getBalance()}`);

