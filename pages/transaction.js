import React, { Component } from "react";
import "semantic-ui-css/semantic.min.css";
import Layout from "../components/Layout/Layout";
import Locator from "../components/Locator/Locator";
import {
  Container,
  Divider,
  Table,
  Button,
  Icon,
  Form,
  Input
} from "semantic-ui-react";
import { observer } from "mobx-react";
import TEXT from "../config/STRINGS.json";
import API from "../api";
import ENV from "../common/store";

class TransactionPage extends Component {
  state = {
    accounts: [],
    from: null,
    to: null,
    contract: null,
    amount: [],
    airdrop: [],
    onReady: false,
    onRequest: false
  };

  loadAccounts = () => {
    this.onRequest();
    API.accounts().then(response => {
      setTimeout(() => {
        this.loadBalance(response.data);
      }, 1000);
    });
  };

  loadBalance = accounts => {
    API.balanceAll(ENV.contract)
      .then(response => {
        const result = accounts.map(account => {
          response.data.result.filter(item => {
            if (item.userId == account.user_id) {
              account.balance = item.balance;
            }
          });
          return account;
        });
        this.setState({ accounts: result });
        this.onRequest();
      })
      .catch(err => {
        console.warn(err);
        this.setState({ accounts: accounts });
        this.onRequest();
        alert("스마트 컨트랙트 주소가 올바른지 확인해주세요.");
      });
  };

  rollback = () =>
    this.setState({
      accounts: [],
      from: null,
      to: null,
      contract: null,
      amount: [],
      airdrop: [],
      onReady: false,
      onRequest: false
    });

  refresh = async () => {
    this.rollback();
    await this.loadAccounts();
  };

  setAccounts = data => this.setState({ accounts: data });

  onRequest = () => this.setState({ onRequest: !this.state.onRequest });

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleArrayChange = (e, { name, value, id }) => {
    e.preventDefault();
    const target = this.state[name];
    target[id] = value;
    this.setState({ [target]: target });
  };

  registContract = () => {
    const { contract } = this.state;

    if (contract == null) return alert("컨트랙트 주소를 입력하세요.");

    this.onRequest();

    setTimeout(() => {
      ENV.regist(contract);
      this.onRequest();
      alert("컨트랙트 주소를 등록 하였습니다.");
    }, 500);
  };

  handleAirDrop = (e, { name, id }) => {
    const { airdrop, accounts } = this.state;

    if (
      airdrop[id] == undefined ||
      airdrop[id] <= 0 ||
      airdrop.length == 0 ||
      Number.isNaN(parseInt(airdrop[id]))
    ) {
      return alert("올바른 토큰 수량을 정해주세요.");
    } else if (ENV.contract == null) {
      return alert("스마트 컨트랙트를 등록해주세요.");
    }

    const to = {
      userId: accounts[id].user_id,
      address: accounts[id].address
    };

    this.onRequest();

    API.transferToken(to, airdrop[id], ENV.contract)
      .then(response => {
        console.log("Result of tranferToken: ", response.data);
        this.onRequest();
        alert("토큰 전송을 완료하였습니다.");
      })
      .then(() => {
        this.refresh();
      })
      .catch(err => {
        console.warn(err);
        this.onRequest();
        alert("토큰 전송이 실패하였습니다.");
      });
  };

  setSender = index =>
    this.setState({ from: index, onReady: this.state.to != null });

  setReceiver = index =>
    this.setState({ to: index, onReady: this.state.from != null });

  handleTransaction = () => {
    const { accounts, amount, from, to, onReady } = this.state;

    if (from === to) {
      alert(TEXT.ALERT.validationError);
      return;
    } else if (from == null || to == null) {
      alert(TEXT.ALERT.validationError);
      return;
    } else if (onReady == false) {
      alert(TEXT.ALERT.validationError);
      return;
    } else if (
      amount[from] == 0 ||
      amount[from] == undefined ||
      amount[from] <= 0
    ) {
      alert(TEXT.ALERT.validationError);
      return;
    } else if (ENV.contract == null) {
      alert(TEXT.ALERT.needToRegistCA);
      return;
    } else {
      console.log("From: ", from);
      console.log("To: ", to);

      const sender = accounts[from];
      const receiver = accounts[to];

      console.log("Sender: ", sender);
      console.log("Receiver: ", receiver);

      const From = {
        userId: sender.user_id,
        address: sender.address
      };

      const To = {
        userId: receiver.user_id,
        address: receiver.address
      };

      const quantity = amount[from];

      console.log("From Template: ", From);
      console.log("To Template: ", To);
      console.log("Quantity: ", quantity);

      this.onRequest();

      API.transferTokenFrom(From, To, quantity, ENV.contract)
        .then(response => {
          console.log(response.data);
          this.onRequest();
          alert(TEXT.ALERT.successTransaction);
        })
        .then(() => {
          this.refresh();
        })
        .catch(err => {
          console.warn(err);
          this.onRequest();
          alert(TEXT.ALERT.failTransaction);
        });
    }
  };

  async componentWillMount() {
    await this.loadAccounts();
  }

  render() {
    const { accounts, from, to, onRequest, onReady } = this.state;

    return (
      <Layout>
        <Container>
          <div style={{ height: "20px" }} />
          <Divider hidden />
          <Locator
            header={TEXT.MENU.transaction.title}
            main={TEXT.MENU.transaction.transaction}
          />

          <Divider />
          <Divider hidden />

          <Container textAlign={"right"}>
            <Button inverted onClick={this.registContract}>
              <Form.Input
                placeholder="컨트랙트 등록"
                type="text"
                action={{
                  color: "teal",
                  icon: "tag"
                }}
                name={"contract"}
                onChange={this.handleChange}
              />
            </Button>

            {onRequest == false && (
              <Button color="green" onClick={this.refresh}>
                새로고침
              </Button>
            )}
            {onRequest == true && (
              <Button loading color="green">
                새로고침
              </Button>
            )}

            {onReady == false && onRequest == false && (
              <Button disabled primary>
                송금하기
              </Button>
            )}

            {onReady == false && onRequest == true && (
              <Button disabled primary loading>
                송금하기
              </Button>
            )}

            {onReady == true && onRequest == false && (
              <Button primary onClick={this.handleTransaction}>
                송금하기
              </Button>
            )}

            {onReady == true && onRequest == true && (
              <Button primary loading>
                송금하기
              </Button>
            )}
          </Container>

          <Table>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>ID</Table.HeaderCell>
                <Table.HeaderCell>Address</Table.HeaderCell>
                <Table.HeaderCell>From</Table.HeaderCell>
                <Table.HeaderCell>To</Table.HeaderCell>
                <Table.HeaderCell>Amount</Table.HeaderCell>
                <Table.HeaderCell>Air Drop</Table.HeaderCell>
                <Table.HeaderCell>Balance</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {accounts.map((account, index) => (
                <Table.Row key={index}>
                  <Table.Cell>
                    {index == from && <Icon color="blue" name={"send"} />}
                    {index == to && <Icon color="orange" name={"pin"} />}
                    {account.user_id}
                  </Table.Cell>

                  <Table.Cell>{account.address}</Table.Cell>
                  <Table.Cell>
                    <Button primary onClick={e => this.setSender(index)}>
                      <Icon fitted name={"send"} />
                    </Button>
                  </Table.Cell>
                  <Table.Cell>
                    <Button
                      color="orange"
                      onClick={e => this.setReceiver(index)}
                    >
                      <Icon fitted name={"pin"} />
                    </Button>
                  </Table.Cell>
                  <Table.Cell>
                    {index == from ? (
                      <Input
                        size={"mini"}
                        name={"amount"}
                        id={index}
                        defaultValue="0"
                        onChange={this.handleArrayChange}
                      />
                    ) : (
                      <Input
                        disabled
                        size={"mini"}
                        name={"amount"}
                        id={index}
                        defaultValue="0"
                        onChange={this.handleArrayChange}
                      />
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    {onReady == false && onRequest == false ? (
                      <Input
                        action={
                          <Button
                            color="teal"
                            icon="cart"
                            name={"airdrop"}
                            id={index}
                            onClick={this.handleAirDrop}
                          />
                        }
                        size={"mini"}
                        defaultValue="0"
                        name={"airdrop"}
                        id={index}
                        onChange={this.handleArrayChange}
                      />
                    ) : (
                      <Input
                        disabled
                        action={
                          <Button
                            color="teal"
                            icon="cart"
                            name={"airdrop"}
                            id={index}
                            onClick={this.handleAirDrop}
                          />
                        }
                        size={"mini"}
                        defaultValue="0"
                        name={"airdrop"}
                        id={index}
                        onChange={this.handleArrayChange}
                      />
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    <Input
                      size={"mini"}
                      readOnly
                      defaultValue={account.balance}
                    />
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Container>
      </Layout>
    );
  }
}

export default observer(TransactionPage);
