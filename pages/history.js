import React, { Component } from "react";
import "semantic-ui-css/semantic.min.css";
import Locator from "../components/Locator/Locator";
import Layout from "../components/Layout/Layout";
import { Container, Divider, Grid, Message, Search } from "semantic-ui-react";
import Router from "next/router";
import TEXT from "../config/STRINGS.json";
import API from "../api";
import _ from "lodash";
import Proptypes from "prop-types";
import TransactionTable from "../components/Transaction";

const resultRenderer = ({ blockNumber, amount }) => (
  <React.Fragment>
    <div>{`Block Number: ${blockNumber}`}</div>
    <br />
    <div>{`Amount: ${amount}`}</div>
  </React.Fragment>
);

resultRenderer.propTypes = {
  blockNumber: Proptypes.number,
  amount: Proptypes.number
};

export default class HistoryPage extends Component {
  state = {
    list: [],
    isLoading: false,
    results: [],
    value: ""
  };

  resetComponent = () =>
    this.setState({ isLoading: false, results: [], value: "" });

  handleDetail = txHash => Router.push(`/detail?txHash=${txHash}`);

  handleResultSelect = (e, { result }) => this.handleDetail(result.txHash);

  handleSearchChange = (e, { value }) => {
    const { list } = this.state;

    this.setState({ isLoading: true, value });

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent();

      const re = new RegExp(_.escapeRegExp(this.state.value), "i");
      const isMatch = list => re.test(list.txHash);

      this.setState({
        isLoading: false,
        results: _.filter(list, isMatch)
      });
    }, 300);
  };

  loadTransactionAll = () => {
    API.transactionAll()
      .then(response => {
        console.log(response.data.result);
        this.setState({ list: response.data.result });
      })
      .catch(err => {
        console.warn(err);
        alert("거래기록 조회 실패.");
      });
  };

  componentWillMount() {
    this.resetComponent();
  }

  async componentDidMount() {
    await this.loadTransactionAll();
  }

  render() {
    const { list, isLoading, value, results } = this.state;

    return (
      <Layout>
        <Container>
          <div style={{ height: "20px" }} />
          <Divider hidden />
          <Locator
            header={TEXT.MENU.history.title}
            main={TEXT.MENU.history.history}
          />
          <Divider />
          <Divider hidden />

          <Grid>
            <Grid.Column width={6}>
              <Search
                loading={isLoading}
                onResultSelect={this.handleResultSelect}
                onSearchChange={_.debounce(this.handleSearchChange, 500, {
                  leading: true
                })}
                resultRenderer={resultRenderer}
                results={results}
                value={value}
                {...this.props}
              />
            </Grid.Column>
          </Grid>

          <Divider hidden />

          {list.length > 0 ? (
            <Message
              success
              floating
              header={"조회된 거래 내역"}
              content={`${list.length} 건`}
            />
          ) : (
            <Message
              negative
              floating
              header={"조회된 거래 내역"}
              content={"거래 내역이 없습니다."}
            />
          )}

          <Divider hidden />

          {list.reverse().map(item => (
            <TransactionTable item={item} handleDetail={this.handleDetail} />
          ))}

          <Divider hidden />
          <Divider hidden />
        </Container>
      </Layout>
    );
  }
}
