import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import Layout from '../components/Layout'
import Locator from '../components/Locator';
import { Form, Container, Segment, Divider, Header, Button } from 'semantic-ui-react'
import TEXT from '../config/STRINGS.json';
import ENV from '../common/store';

export default class WalletPage extends Component {

    state = {
        id: "",
        password: "",
        address: "",
        privateKey: "",
        balance: 0,
        onRequest: false
    }

    loadWallet = () => {
        this.onRequest();
        setTimeout(() => {
            this.setState({
                id: ENV.user.userId,
                password: ENV.user.password,
                address: ENV.user.address,
                privateKey: ENV.user.privateKey,
                balance: ENV.user.balance
            })
            this.onRequest();
        }, 1000)
    }

    onRequest = () => this.setState({ onRequest: !this.state.onRequest });

    render() {
        const { id, password, address, privateKey, balance, onRequest } = this.state;

        return (
            <Layout>
                <Container>
                    <div style={{ height: "20px" }} />
                    <Divider hidden />
                    <Locator
                        header={TEXT.MENU.wallet.title}
                        main={TEXT.MENU.wallet.wallet}
                    />
                    <Divider/>
                    <Header as="h2">
                        <b>{"나의 스마트 월렛"}</b>
                    </Header>
                    <Divider />
                    <Header.Subheader>
                        {"나의 월렛 정보를 확인하실 수 있는 페이지입니다."}
                    </Header.Subheader>
                    <Segment>
                        <Form>
                            <Form.Group widths="equal">
                                <Form.Input
                                    readOnly
                                    required
                                    fluid
                                    name="id"
                                    value={id}
                                    label={"ID"}
                                    placeholder="ID"
                                />
                            </Form.Group>
                            <Form.Group widths="equal">
                                <Form.Input
                                    readOnly
                                    required
                                    fluid
                                    name="password"
                                    value={password}
                                    label={"Password"}
                                    placeholder="Password"
                                    type="password"
                                />
                            </Form.Group>
                            <Form.Group widths="equal">
                                <Form.Input
                                    readOnly
                                    required
                                    fluid
                                    name="address"
                                    value={address}
                                    label={"Address"}
                                    placeholder="Address"
                                />
                            </Form.Group>
                            <Form.Group widths="equal">
                                <Form.Input
                                    readOnly
                                    required
                                    fluid
                                    name="privateKey"
                                    value={privateKey}
                                    label={"Private Key"}
                                    placeholder="Private Key"
                                />
                            </Form.Group>
                            <Form.Group widths="equal">
                                <Form.Input
                                    readOnly
                                    required
                                    fluid
                                    name="balance"
                                    value={balance}
                                    label={"Balance"}
                                    placeholder="Balance"
                                />
                            </Form.Group>
                            {onRequest == false ? (
                                <Button primary onClick={this.loadWallet}>
                                    {TEXT.MENU.wallet.load}
                                </Button>
                            ) : (
                                <Button loading secondary>
                                    {TEXT.MENU.wallet.load}
                                </Button>
                            )}
                        </Form>
                    </Segment>
                </Container>
            </Layout>
        )
    }
}