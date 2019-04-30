import React, { Component } from "react";
import "semantic-ui-css/semantic.min.css";
import Locator from "../components/Locator/Locator";
import Layout from "../components/Layout/Layout";
import { Container, Divider } from "semantic-ui-react";
import TEXT from "../config/STRINGS.json";
import API from "../api";
import TransactionTable from "../components/Transaction";

export default class DetailPage extends Component {
  static async getInitialProps({ query }) {
    return { txHash: query.txHash };
  }

  constructor(props) {
    super(props);

    this.state = {
      txHash: props.txHash,
      transaction: null
    };
  }

  loadBlock = () => {
    const { txHash } = this.state;

    API.transactionOf(txHash)
      .then(response => this.setState({ transaction: response.data.result }))
      .catch(err => {
        console.warn(err);
        alert("트랜잭션 조회 실패.");
      });
  };

  async componentDidMount() {
    await this.loadBlock();
  }

  render() {
    const { transaction } = this.state;

    return (
      <Layout>
        <Container>
          <div style={{ height: "20px" }} />
          <Divider hidden />
          <Locator
            header={TEXT.MENU.detail.title}
            main={TEXT.MENU.detail.detail}
          />
          <Divider />
          <Divider hidden />

          {transaction && (
            <TransactionTable item={transaction} handleDetail={null} />
          )}
        </Container>
      </Layout>
    );
  }
}
