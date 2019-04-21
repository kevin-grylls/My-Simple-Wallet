import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import Layout from '../components/Layout';
import Locator from '../components/Locator';
import { Container, Divider } from 'semantic-ui-react';
import TEXT from '../config/STRINGS.json';

export default class TransactionPage extends Component {
    state = {

    }

    render() {

        return (
            <Layout>
            <Container>
                <div style={{ height: "20px" }} />
                <Divider hidden />
                <Locator
                    header={TEXT.MENU.transaction.title}
                    main={TEXT.MENU.transaction.transation}
                />
                <Divider />
            </Container>
            </Layout>
        )
    }
}