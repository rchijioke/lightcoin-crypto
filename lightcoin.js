// let balance = 500.00;

class Account {
  constructor(username) {
    this.username = username;
    // Have the account balance start at $0 since that makes more sense.

    this.transactions = [];
  }
  get balance() {
    // Calculate the balance using the transaction objects.
    let sum = 0;
    for (let i of this.transactions) {
      sum += i.value;
    }
    return sum;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
}

class Transaction {
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }

  get value() {
    return this.amount;
  }
  // isAllowed(){
  //   return true
  // }
  commit() {
    if (!this.isAllowed())
    return false;
    this.time = new Date();
    // this.account.balance += this.value;
    this.account.addTransaction(this);
    return true;
  }
}
class Deposit extends Transaction {
  get value() {
    return this.amount;
  }
  isAllowed() {
    return true;
  }
}

class Withdrawal extends Transaction {
  get value() {
    return -this.amount;
  }
  isAllowed() {
    if (this.account.balance - this.amount >= 0) {
      return true;
    }
    return false;
  }
}

const myAccount = new Account("snow-patrol");
console.log("this is my starting balance", myAccount.balance)
t1 = new Withdrawal(50.25, myAccount);
t1.commit();
// console.log("Transaction 1:", t1);

t2 = new Withdrawal(9.99, myAccount);
t2.commit();
//console.log("Transaction 2:", t2);

t3 = new Deposit(120.0, myAccount);
t3.commit();
//console.log("Transaction 3:", t3);

t4 = new Deposit(200, myAccount);
t4.commit();
//console.log("Transaction 4:", t4);
console.log("this is my ending balance", myAccount.balance)
console.log("Transaction history", myAccount.transactions)
