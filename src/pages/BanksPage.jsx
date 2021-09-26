import { observer } from "mobx-react-lite";
import Input from "../components/input";

import React, { useState, useEffect } from "react";

import banks from "../store/banks";
import { Table, Navbar, Nav, Button, Modal, ModalBody } from "react-bootstrap";
import "./BanksPage.css";
import edit from "../images/edit.png";
import del from "../images/delete.png";

export const BanksPage = observer(() => {
  const [bankName, setBankName] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [maximumLoan, setMaximumLoan] = useState("");
  const [minimumDownPayment, setMinimumDownPayment] = useState("");
  const [loanTerm, setLoanTerm] = useState("");
  const [bankID, setBankID] = useState("");
  const [show, setShow] = useState(false);
  const [emptyError, setEmptyError] = useState(true);
  const [disabeled, setDisabeled] = useState(true);

  useEffect(() => {
    if (
      !bankName ||
      !interestRate ||
      !maximumLoan ||
      !minimumDownPayment ||
      !loanTerm
    ) {
      setEmptyError(true);
      setDisabeled(true);
    } else {
      setEmptyError(false);
      setDisabeled(false);
    }
  }, [bankName, interestRate, maximumLoan, minimumDownPayment, loanTerm]);

  const minimumDownPaymentValidation = () => {
    if (minimumDownPayment < 0) {
      setMinimumDownPayment(0);
    } else if (minimumDownPayment > maximumLoan) {
      setMinimumDownPayment(maximumLoan);
    } else {
      setMinimumDownPayment;
    }
    return;
  };

  let editedBank = {
    id: Date.now(),
    bankName: bankName,
    interestRate: interestRate,
    maximumLoan: maximumLoan,
    minimumDownPayment: minimumDownPayment,
    loanTerm: loanTerm,
    lastMortgageCount: []
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const addBank = (event) => {
    banks.addBank({
      id: Date.now(),
      bankName: bankName,
      interestRate: interestRate,
      maximumLoan: maximumLoan,
      minimumDownPayment: minimumDownPayment,
      loanTerm: loanTerm,
      lastMortgageCount: []
    });
  };

  const editBank = (it) => {
    banks.editBank(editedBank, bankID);
  };

  const handleDelete = (id) => {
    banks.banksList = banks.banksList.filter((it) => {
      return it.id !== id;
    });
  };

  let tbody = banks.banksList.map((it) => {
    return (
      <>
        <tr>
          <td key="{it.id + it.bankName}" className="">
            {it.bankName}
          </td>
          <td key="{it.id + it.interestRate}" className="">
            {it.interestRate}
          </td>
          <td key="{it.id + it.maximumLoan}" className="">
            {it.maximumLoan}
          </td>
          <td key="{it.id + it.minimumDownPayment}" className="">
            {it.minimumDownPayment}
          </td>
          <td key="{it.id + it.iloanTermd}" className="">
            {it.loanTerm}
          </td>
          <td>
            <img
              className="icon"
              alt="edit"
              src={edit}
              onClick={() => {
                setBankID(it.id);

                handleShow(it.id);
              }}
            />

            <img
              className="icon"
              alt="delete"
              src={del}
              onClick={() => handleDelete(it.id)}
            />
          </td>
        </tr>
      </>
    );
  });

  return (
    <div className="App">
      <div>
        <>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>Edit bank</Modal.Header>
            <ModalBody>
              <Input
                className="input"
                value={bankName}
                setValue={setBankName}
                type="text"
                placeholder="Input here new bank name"
              />
              <Input
                value={interestRate}
                setValue={
                  interestRate < 0 ? setInterestRate(0) : setInterestRate
                }
                type="number"
                placeholder="Input here new interest rate"
              />
              <Input
                value={maximumLoan}
                setValue={maximumLoan < 0 ? setMaximumLoan(0) : setMaximumLoan}
                type="number"
                placeholder="Input here new maximum loan value"
              />

              <Input
                value={minimumDownPayment}
                setValue={minimumDownPaymentValidation()}
                type="number"
                placeholder="Input here new minimum loan down payment value"
              />

              <Input
                value={loanTerm}
                setValue={loanTerm < 0 ? setLoanTerm(0) : loanTerm}
                type="number"
                placeholder="Input here new maximum loan term"
              />

              <Button
                className="editBtn"
                type="button"
                variant="primary"
                onClick={editBank}
              >
                Edit Bank
              </Button>
            </ModalBody>
          </Modal>

          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand>Banks</Navbar.Brand>

            <Nav className="mr-auto"></Nav>
          </Navbar>
        </>
      </div>

      <div className="bankInfo">
        <h1>Banks</h1>
        <div>
          <Table striped bordered borderless hover size="sm">
            <thead>
              <tr>
                <th>Bank Name</th>
                <th>Interest rate</th>
                <th>Maximum loan</th>
                <th>Minimum down payment</th>
                <th>loanTerm</th>
                <th>Edit / delete</th>
              </tr>
            </thead>
            <tbody>{tbody}</tbody>
          </Table>
        </div>

        <h1>Add new bank</h1>
        <div className="inputsBlock">
          <Input
            className="input"
            value={bankName}
            setValue={setBankName}
            type="text"
            placeholder="Input here bank name"
          />
          <Input
            value={interestRate}
            setValue={setInterestRate}
            type="number"
            placeholder="Input here interest rate"
          />
          <Input
            value={maximumLoan}
            setValue={setMaximumLoan}
            type="number"
            placeholder="Input here maximum loan value"
          />

          <Input
            value={minimumDownPayment}
            setValue={setMinimumDownPayment}
            type="number"
            placeholder="Input here minimum loan down payment value"
          />

          <Input
            value={loanTerm}
            setValue={setLoanTerm}
            type="number"
            placeholder="Input here maximum loan term"
          />
        </div>

        {emptyError && (
          <div style={{ color: "red" }}> Empty field not allowed </div>
        )}

        <div>
          <Button
            className="addBtn "
            type="button"
            variant="primary"
            onClick={addBank}
            disabled={disabeled}
          >
            Add Bank
          </Button>

          <Button
            className="linkToCalc"
            href="/calc"
            type="button"
            variant="primary"
          >
            Calculate mortgage
          </Button>
        </div>
      </div>
    </div>
  );
});
