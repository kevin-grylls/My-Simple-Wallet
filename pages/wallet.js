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
  Segment,
  Step,
  Icon
} from "semantic-ui-react";
import TEXT from "../config/STRINGS.json";
import API from "../api";
import ENV from "../common/store";
import { observer } from "mobx-react";

class WalletPage extends Component {
  state = {
    wallet: [],
    coinbase: null,
    unlocked: false,
    mining: false,
    deployed: false,
    contract: null,
    onRequest: false
  };

  onRequest = () => this.setState({ onRequest: !this.state.onRequest });

  loadWallet = () => {
    API.accounts()
      .then(response => {
        console.log(response.data);
        this.setState({
          wallet: response.data
        });
      })
      .catch(err => {
        this.setState({
          wallet: []
        });
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

  getMiningStatus = () => {
    this.onRequest();
    API.statusMining()
      .then(response => {
        console.log("Mining Status: ", response.data.result);
        this.setState({ mining: response.data.result });
        this.onRequest();
      })
      .catch(err => {
        console.warn(err);
        this.onRequest();
        alert("마이닝 상태를 가져올 수 없습니다.");
      });
  };

  setMining = (e, { value }) => {
    console.log(value);
    this.onRequest();
    setTimeout(() => {
      API.setMining(value)
        .then(response => {
          console.log("Mining Setting Result :", response.data.result);
          this.setState({ mining: response.data.result });
          this.onRequest();
        })
        .catch(err => {
          console.warn(err);
          this.onRequest();
          alert("마이닝 설정에 오류가 있습니다.");
        });
    }, 1000);
  };

  unlockAccount = () => {
    this.onRequest();
    API.unlock()
      .then(() => {
        this.onRequest();
        this.setState({ unlocked: true });
        alert(TEXT.ALERT.successUnlock);
      })
      .catch(err => {
        console.warn(err);
        this.onRequest();
        this.setState({ unlocked: false });
        alert(TEXT.ALERT.failUnlockAccounts);
      });
  };

  deployContract = (e, userId, address) => {
    const { unlocked, deployed } = this.state;

    e.preventDefault();

    if (!unlocked) return alert("계정 언락을 실행하세요.");
    if (deployed) return alert("이미 배포된 컨트랙트입니다.");

    this.onRequest();
    API.deploy(userId, address)
      .then(response => {
        this.onRequest();
        console.log(response.data);
        ENV.regist(response.data.contractAddress);
        console.log("Contract Address: ", ENV.contract);
        this.setState({ deployed: true, contract: response.data });
        alert("스마트 컨트랙트 배포를 완료 하였습니다.");
      })
      .catch(err => {
        this.onRequest();
        this.setState({ deployed: false });
        console.warn(err);
        alert("계정 언락을 다시 시도하거나 EVM을 확인해 주세요.");
      });
  };

  componentDidMount() {
    this.loadWallet();
    this.loadCoinbase();
    this.getMiningStatus();
  }

  render() {
    const {
      wallet,
      coinbase,
      mining,
      unlocked,
      deployed,
      contract,
      onRequest
    } = this.state;

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
                <Button
                  primary
                  onClick={e =>
                    this.deployContract(e, item.user_id, item.address)
                  }
                >
                  DEPLOY
                </Button>
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
            <b>{"스마트 컨트랙트"}</b>
          </Header>
          <Divider />
          <Header.Subheader>
            {"스마트 컨트랙트 배포 프로세스를 시연하는 페이지입니다."}
          </Header.Subheader>

          <Divider hidden />
          <Divider hidden />

          <Step.Group ordered>
            {wallet.length > 0 ? (
              <Step completed>
                <Step.Content>
                  <Step.Title>LOADED</Step.Title>
                  <Step.Description>사용자 지갑 조회</Step.Description>
                </Step.Content>
              </Step>
            ) : (
              <Step active>
                <Step.Content>
                  <Step.Title>LOAD</Step.Title>
                </Step.Content>
              </Step>
            )}

            {mining == true ? (
              <Step completed>
                <Step.Content>
                  <Step.Title>MINING</Step.Title>
                  <Step.Description>채굴 진행 중</Step.Description>
                </Step.Content>
              </Step>
            ) : (
              <Step active>
                <Step.Content>
                  <Step.Title>MINE</Step.Title>
                </Step.Content>
              </Step>
            )}

            {unlocked == true ? (
              <Step completed>
                <Step.Content>
                  <Step.Title>UNLOCKED</Step.Title>
                  <Step.Description>계정 잠금 해제</Step.Description>
                </Step.Content>
              </Step>
            ) : (
              <Step active>
                <Step.Content>
                  <Step.Title>UNLOCK</Step.Title>
                </Step.Content>
              </Step>
            )}

            {deployed == true ? (
              <Step completed>
                <Step.Content>
                  <Step.Title>DEPLOYED</Step.Title>
                  <Step.Description>스마트 컨트랙트를 배포</Step.Description>
                </Step.Content>
              </Step>
            ) : (
              <Step active>
                <Step.Content>
                  <Step.Title>DEPLOY</Step.Title>
                </Step.Content>
              </Step>
            )}

            {contract == null ? (
              <Step active>
                <Step.Content>
                  <Step.Title>RECEIVE</Step.Title>
                </Step.Content>
              </Step>
            ) : (
              <Step completed>
                <Step.Content>
                  <Step.Title>RECEIVED</Step.Title>
                  <Step.Description>컨트랙트 주소 수신</Step.Description>
                </Step.Content>
              </Step>
            )}
          </Step.Group>

          <Divider hidden />
          <Divider hidden />
          <Divider />
          <Divider hidden />
          <Divider hidden />

          <Container textAlign="right">
            {onRequest == false && mining == true && (
              <Button color="blue" value={false} onClick={this.setMining}>
                <Icon loading name="spinner" />
                ENABLE MINING
              </Button>
            )}

            {onRequest == false && mining == false && (
              <Button color="red" value={true} onClick={this.setMining}>
                <Icon name="exclamation triangle" />
                DISABLE MINING
              </Button>
            )}

            {onRequest == true && (
              <Button color="blue" disabled loading>
                ENABLE MINING
              </Button>
            )}

            {onRequest == false ? (
              <Button color="green" onClick={this.unlockAccount}>
                UNLOCK ACCOUNTS
              </Button>
            ) : (
              <Button color="green" loading>
                UNLOCK ACCOUNTS
              </Button>
            )}
          </Container>

          <Divider hidden />

          <Card.Group itemsPerRow={3}>{walletList}</Card.Group>

          <Divider hidden />
          <Divider hidden />
          <Divider hidden />
          <Divider />
          <Divider hidden />
          <Divider hidden />
          <Divider hidden />

          {contract != null && (
            <div>
              <Header as="h5" color="olive" attached="top">
                Contract Address
              </Header>
              <Segment attached>{contract.contractAddress}</Segment>
              <Header as="h5" color="olive" attached>
                Created At
              </Header>
              <Segment attached="bottom">{contract.createdAt}</Segment>
            </div>
          )}
        </Container>
      </Layout>
    );
  }
}

export default observer(WalletPage);
