import React, { Component } from "react";
import "semantic-ui-css/semantic.min.css";
import Layout from "../components/Layout";
import Locator from "../components/Locator";
import {
  Container,
  Divider,
  Header,
  Button,
  Image,
  Card,
  Segment
} from "semantic-ui-react";
import TEXT from "../config/STRINGS.json";
import API from "../api";
import ENV from "../common/store";

export default class WalletPage extends Component {
  state = {
    wallet: [],
    coinbase: null,
    unlock: false,
    onRequest: false
  };

  onRequest = () => this.setState({ onRequest: !this.state.onRequest });

  unlockAccount = () => {
    this.onRequest();
    API.unlock()
      .then(response => {
        this.onRequest();
        this.setState({ unlock: true });
        alert(TEXT.ALERT.successUnlock);
      })
      .catch(err => {
        console.warn(err);
        this.onRequest();
        alert(TEXT.ALERT.failUnlockAccounts);
      });
  };

  loadWallet = () => {
    API.accounts()
      .then(response => {
        console.log(response.data);
        this.setState({
          wallet: response.data
        });
      })
      .catch(err => {
        console.warn(err);
      });
  };

  loadCoinbase = () => {
    API.coinbase()
      .then(response => {
        console.log(response.data);
        this.setState({ coinbase: response.data.result });
      })
      .catch(err => {
        console.warn(err);
      });
  };

  componentDidMount() {
    this.loadWallet();
    this.loadCoinbase();
  }

  render() {
    const { wallet, coinbase, unlock, onRequest } = this.state;

    const walletList = wallet.map(item => (
      <Card fluid raised>
        <Card.Content>
          <Image floated="right" size="mini" src="/static/assets/icon.png" />
          <Card.Header>{item.user_id}</Card.Header>
          <Card.Meta>{item.created_at}</Card.Meta>
          <Card.Description>{item.address}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          {item.address == coinbase && (
            <div className="ui two buttons">
              {onRequest == false ? (
                <Button primary>DEPLOY</Button>
              ) : (
                <Button primary loading>
                  DEOPLOY
                </Button>
              )}
            </div>
          )}
        </Card.Content>
      </Card>
    ));

    return (
      <Layout>
        <Container>
          <div style={{ height: "20px" }} />
          <Divider hidden />
          <Locator
            header={TEXT.MENU.wallet.title}
            main={TEXT.MENU.wallet.wallet}
          />
          <Divider />
          <Divider hidden />

          <Header as="h2">
            <b>{"지갑 목록"}</b>
          </Header>
          <Divider />
          <Header.Subheader>
            {"각 계정에 할당된 지갑 정보를 조회할 수 있습니다."}
          </Header.Subheader>

          <Divider hidden />

          <Container textAlign="right">
            {onRequest == false ? (
              <Button color="youtube" onClick={this.unlockAccount}>
                UNLOCK ACCOUNTS
              </Button>
            ) : (
              <Button color="youtube" loading>
                UNLOCK ACCOUNTS
              </Button>
            )}
          </Container>

          <Divider hidden />

          <Card.Group itemsPerRow={3}>{walletList}</Card.Group>
        </Container>
      </Layout>
    );
  }
}
