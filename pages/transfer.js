import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import API from '../api';
import Layout from '../components/Layout';
import Locator from '../components/Locator';
import { Container, Divider, Table, Button, Icon, Label } from 'semantic-ui-react';
import TEXT from '../config/STRINGS.json';

export default class TransferPage extends Component {

    state = {
        accounts: [],
        from: null,
        to: null,
        onReady: false,
        onRequest: false
    }

    loadAccounts = () => {
        API.getAccounts()
            .then(response => {
                console.log(response.data);
                this.onRequest();
                setTimeout(() => {
                    this.setAccounts(response.data)
                    this.onRequest();
                }, 1000);
            })
    };

    setAccounts = data => this.setState({ accounts: data });

    rollback = () => this.setState({
        accounts: [],
        from: null,
        to: null,
        onReady: false,
        onRequest: false
    })

    onRequest = () => this.setState({ onRequest: !this.state.onRequest })

    setSender = index => this.setState({ from: index, onReady: this.state.to != null });

    setReceiver = index => this.setState({ to: index, onReady: this.state.from != null });

    makeTransaction = () => {

        const { from, to, onReady } = this.state;

        if (from === to) {
            alert(TEXT.ALERT.validationError);
        } else if ( from == null || to == null) {
            alert(TEXT.ALERT.validationError);
        } else if(onReady == false) {
            alert(TEXT.ALERT.validationError);
        } else {
            const sender = this.state.accounts[from];
            const receiver = this.state.accounts[to];
            this.onRequest();

            API.transfer(sender.address, receiver.address)
                .then(response => {
                    console.log(response.data);
                    this.onRequest();
                    this.rollback();
                    alert(TEXT.ALERT.successTransaction);
                })
                .catch(err => {
                    console.warn(err);
                    this.rollback();
                    alert(TEXT.ALERT.failTransaction);
                })
        }
    }

    render() {
        const { accounts, from, to, onRequest, onReady } = this.state;

        return (
            <Layout>
                <Container>
                    <div style={{ height: "20px" }} />
                    <Divider hidden />
                    <Locator
                        header={TEXT.MENU.transfer.title}
                        main={TEXT.MENU.transfer.transfer}
                    />
                    <Divider />

                    <Container textAlign={"right"}>
                        { onRequest == false && (<Button secondary onClick={this.loadAccounts}>불러오기</Button>)}
                        { onRequest == true && (<Button loading secondary>불러오기</Button>)}
                        { onReady == true && onRequest == false && (<Button primary onClick={this.makeTransaction}>송금하기</Button>)}
                        { onReady == true && onRequest == true && (<Button primary loading>송금하기</Button>)}

                    </Container>

                    <Table>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Address</Table.HeaderCell>
                                <Table.HeaderCell>Ether</Table.HeaderCell>
                                <Table.HeaderCell>From</Table.HeaderCell>
                                <Table.HeaderCell>To</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            { accounts.map((account, index) => (
                                <Table.Row key={index}>
                                    <Table.Cell>
                                        {index == from && <Label color={"orange"} ribbon>From</Label>}
                                        {index == to && <Label color={"blue"} ribbon>To</Label>}
                                        {account.address}
                                        </Table.Cell>
                                    <Table.Cell>{account.balance}</Table.Cell>
                                    <Table.Cell>
                                        <Button primary size={'mini'} onClick={e => this.setSender(index)}>
                                            <Icon name={"pin"}/>
                                        </Button>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Button secondary size={'mini'} onClick={e => this.setReceiver(index)}>
                                            <Icon name={"send"}/>
                                        </Button>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>

                </Container>
            </Layout>
        )
    }
}

