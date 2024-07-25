import { DioAccount } from "./DioAccount";

export class IndividualAccount extends DioAccount {
    private readonly doc_id: number

    constructor(doc_id:number, name:string, accountNumber:number){
        super(name, accountNumber)
        this.doc_id = doc_id;
    }

    getDocId(): number{
        return this.doc_id;
    }
}