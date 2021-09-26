import { makeAutoObservable } from "mobx";

class Banks {
  defaultBanksList = [
    {
      id: 1,
      bankName: "One",
      interestRate: 7,
      maximumLoan: 500000,
      minimumDownPayment: 1000,
      loanTerm: 10,
      lastMortgageCount: []
    },
    {
      id: 2,
      bankName: "Two",
      interestRate: 8,
      maximumLoan: 100000,
      minimumDownPayment: 10000,
      loanTerm: 7,
      lastMortgageCount: []
    },
    {
      id: 3,
      bankName: "Three",
      interestRate: 10,
      maximumLoan: 1000000,
      minimumDownPayment: 150000,
      loanTerm: 5,
      lastMortgageCount: []
    }
  ];

  banksList = [
    ...(JSON.parse(localStorage.getItem("banks")) ?? this.defaultBanksList)
  ];

  mortgageArray = [];

  constructor() {
    makeAutoObservable(this);
  }

  addBank(bank) {
    this.banksList.push(bank);
    localStorage.setItem("banks", JSON.stringify(this.banksList));
  }
  editBank(editedBank, bankID) {
    for (let i = 0; i < this.banksList.length; i++) {
      if (bankID === this.banksList[i].id) {
        this.banksList[i] = editedBank;
      }
    }
    localStorage.setItem("banks", JSON.stringify(this.banksList));
  }
}

export default new Banks();
