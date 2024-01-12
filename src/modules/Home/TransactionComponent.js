import styled from "styled-components";
import { useEffect, useState } from "react";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 22px;
  font-size: 18px;
  width: 100%;
  gap: 10px;
  font-weight: bold;

  & input {
    padding: 10px 12px;
    border-radius: 12px;
    outline: none;
    background: #e6e8e9;
    border: 1px solid #e6e8e9;
    width: 100%;
  }
`;

const Cell = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px 15px;
  font-size: 14px;
  font-weight: normal;
  justify-content: space-between;
  width: 100%;
  border-radius: 2px;
  border: 1px solid #e6e8e9;
  border-right: 4px solid ${(props) => (props.isExpense ? "red" : "green")};
`;

const TransactionCell = (props) => {
  return (
    <Cell isExpense={props.payload?.type === "EXPENSE"}>
      <span> {props.payload.desc}</span>
      <span>${props.payload.amount}</span>
    </Cell>
  );
};

const TransactionComponent = (props) => {
  const [searchText, updateSearchText] = useState("");
  const [filteredTransaction, updateTxt] = useState(props.transactions);

  const filterData = (searchText) => {
    if (!searchText || !searchText.trim().length) {
      updateTxt(props.transactions);
      return;
    }
    let txt = [...props.transactions];
    txt = txt.filter((payload) =>
      payload.desc.toLowerCase().includes(searchText.toLowerCase().trim())
    );

    updateTxt(txt);
  };

  useEffect(() => filterData(searchText), [props.transactions]);

  return (
    <Container>
      Transaction
      <input
        placeholder="Search"
        value={searchText}
        onChange={(e) => {
          updateSearchText(e.target.value);
          filterData(e.target.value);
        }}
      />
      {filteredTransaction?.length
        ? filteredTransaction.map((payload) => (
            <TransactionCell payload={payload} />
          ))
        : ""}
    </Container>
  );
};
export default TransactionComponent;
