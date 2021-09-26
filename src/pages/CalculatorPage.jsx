import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import Input from "../components/input";
import banks from "../store/banks";
import { Table, Navbar, Nav, Button } from "react-bootstrap";
import "./CalculatorPage.css";

export const CalculatorPage = observer(() => {
  const [bankID, setBankID] = useState("");
  let [incomeLoanBalance, setIncomeLoanBalance] = useState("");
  let [loanDownPayment, setLoanDownPayment] = useState("");
  const [emptyError, setEmptyError] = useState(true);
  const [disabeled, setDisabeled] = useState(true);
  const [summError, setSummError] = useState("");
  const [downPaymentError, setDownPaymentSummError] = useState("");
  const [termError, setTermError] = useState("");

  let selectedBank;

  useEffect(() => {
    if (!bankID || !incomeLoanBalance || !loanDownPayment) {
      setEmptyError(true);
      setDisabeled(true);
    } else {
      setEmptyError(false);
      setDisabeled(false);
    }
  }, [bankID, incomeLoanBalance, loanDownPayment]);

  useEffect(() => {
    let selectedBank = banks.banksList[0];

    if (incomeLoanBalance > selectedBank.maximumLoan) {
      setSummError("Imputed loan sum bigger then allowed");
      setDisabeled(true);
    } else {
      setSummError("");
      setDisabeled(false);
    }
  }, [incomeLoanBalance, loanDownPayment]);

  useEffect(() => {
    let selectedBank = banks.banksList[0];
    if (
      loanDownPayment < selectedBank.minimumDownPayment &&
      loanDownPayment > 0
    ) {
      setDownPaymentSummError("Imputed down payment sum less then allowed");
      setDisabeled(true);
    } else {
      setDownPaymentSummError("");
      setDisabeled(false);
    }
  }, [incomeLoanBalance, loanDownPayment]);

  useEffect(() => {
    let selectedBank = banks.banksList[0];
    if (incomeLoanBalance / loanDownPayment > selectedBank.loanTerm * 12) {
      setTermError(
        "According to imputed values loan term will be bigger then allowed"
      );
      setDisabeled(true);
    } else {
      setTermError("");
      setDisabeled(false);
    }
  }, [incomeLoanBalance, loanDownPayment]);

  let count = () => {
    banks.mortgageArray = [];
    countMortgage();
  };

  let banksToSelect = banks.banksList.map((it, index) => {
    return (
      <option key="{it.id}" value={it.id}>
        {it.bankName}
      </option>
    );
  });

  [selectedBank] = banks.banksList.filter((it) => {
    return it.id === bankID;
  });

  let month = 0;
  let equity = 0;
  let interestPayment, totalPayment, outcomeLoanBalance;

  let countMortgage = () => {
    interestPayment = parseFloat(
      ((incomeLoanBalance * selectedBank.interestRate) / 100 / 12).toFixed(2)
    );
    outcomeLoanBalance = incomeLoanBalance - loanDownPayment;

    totalPayment = parseFloat(+loanDownPayment + interestPayment);
    equity = equity + totalPayment;
    month++;
    banks.mortgageArray = [
      ...banks.mortgageArray,
      {
        month,
        incomeLoanBalance,
        interestPayment,
        totalPayment,
        outcomeLoanBalance,
        equity
      }
    ];

    incomeLoanBalance = outcomeLoanBalance;
    if (incomeLoanBalance <= loanDownPayment && 0 < incomeLoanBalance) {
      loanDownPayment = incomeLoanBalance;
      totalPayment = incomeLoanBalance + interestPayment;
      outcomeLoanBalance = incomeLoanBalance - loanDownPayment;
      month++;
      banks.mortgageArray = [
        ...banks.mortgageArray,
        {
          month,
          incomeLoanBalance,
          interestPayment,
          totalPayment,
          outcomeLoanBalance,
          equity
        }
      ];
    } else {
      countMortgage();
    }
  };

  let mortgageOutputData = banks.mortgageArray.map((it, index) => {
    return (
      <tr>
        <td key="{index+it.month}">{it.month}</td>
        <td key="{index+it.incomeLoanBalance}">{it.incomeLoanBalance}</td>
        <td key="{index+it.interestPayment}">{it.interestPayment}</td>
        <td key="{index+totalPayment}">{it.totalPayment}</td>
        <td key="{index+outcomeLoanBalance}">{it.outcomeLoanBalance}</td>
        <td key="{index+equity}">{it.equity}</td>
      </tr>
    );
  });

  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand>Calculator Page</Navbar.Brand>

        <Nav className="mr-auto">
          <Button
            className="linkToCalc"
            href="/banks"
            type="button"
            variant="primary"
          >
            Back to banks
          </Button>
        </Nav>
      </Navbar>
      <div className="container">
        <div className="bankSelect">
          <h3>Choose the bank</h3>

          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <label class="input-group-text" for="inputGroupSelect01">
                Choose the bank:
              </label>
            </div>
            <select
              class="custom-select"
              id="inputGroupSelect04"
              onInput={(e) => {
                setBankID(+e.target.value);
              }}
            >
              <option selected>Choose you bank...</option>
              {banksToSelect}
            </select>
          </div>
        </div>

        <div className="loanParam">
          <h3>Choothe you loan parameters</h3>
          <Input
            className="input"
            type="number"
            placeholder="Input here you loan amount"
            value={incomeLoanBalance}
            setValue={setIncomeLoanBalance}
          />
          <Input
            className="input"
            value={loanDownPayment}
            setValue={setLoanDownPayment}
            type="number"
            placeholder="Input you down-payment amount"
          />
        </div>

        {emptyError && (
          <div style={{ color: "red" }}> Empty field not allowed </div>
        )}

        {summError && <div style={{ color: "red" }}> {summError} </div>}
        {downPaymentError && (
          <div style={{ color: "red" }}> {downPaymentError} </div>
        )}
        {termError && <div style={{ color: "red" }}> {termError} </div>}
        <Button
          disabled={false}
          class="btnCount btn  "
          type="button"
          onClick={count}
          disabled={disabeled}
        >
          Mortgage count
        </Button>

        <div>
          <Table striped bordered borderless hover size="sm">
            <thead>
              <tr>
                <th>Month</th>
                <th>Income loan balance</th>
                <th>Interest payment</th>
                <th>Total payment</th>
                <th>Outcome loan balance</th>
                <th>Equity</th>
              </tr>
            </thead>
            <tbody>{mortgageOutputData}</tbody>
          </Table>
        </div>
      </div>
    </div>
  );
});
