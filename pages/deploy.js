import React, { Component } from "react";
import "semantic-ui-css/semantic.min.css";
import Locator from "../components/Locator";
import Layout from "../components/Layout";
import { Container, Divider, Message } from "semantic-ui-react";
import TEXT from "../config/STRINGS.json";
import API from "../api";

export default class DeployPage extends Component {
  state = {
    coinbase: null,
    userId: "",
    address: ""
  };

  loadCoinbase = () => {
    API.coinbase()
      .then(response => {
        this.setState({ coinbase: response.data.result });
      })
      .catch(err => {
        console.warn(err);
      });
  };

  loadWallet = () => {
    const { coinbase } = this.state;

    API.accounts()
      .then(response => {
        console.log(response.data);
        console.log(response.data.filter(item => item.address == coinbase));
        console.log(result);
        this.setState({
          userId: result != null ? result.user_id : null,
          address: result != null ? result.address : null
        });
      })
      .catch(err => {
        console.warn(err);
      });
  };

  async componentDidMount() {
    await this.loadCoinbase();
    await this.loadWallet();
    console.log(this.state);
  }

  render() {
    const { coinbase } = this.state;

    return (
      <Layout>
        <Container>
          <div style={{ height: "20px" }} />
          <Divider hidden />
          <Locator
            header={TEXT.MENU.deploy.title}
            main={TEXT.MENU.deploy.deploy}
          />
          <Divider />
          <Divider hidden />

          <Message success header="COIN BASE" content={coinbase} />
        </Container>
      </Layout>
    );
  }
}
