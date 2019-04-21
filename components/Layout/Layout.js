import React, { Component } from 'react';
import Header from '../Header';
import { Responsive, Divider } from 'semantic-ui-react';

export default class Layout extends Component {
    render () {
        return (
            <Responsive>
                <Header />
                <Divider hidden clearing />
                <main>{this.props.children}</main>
                <Divider hidden clearing/>
            </Responsive>
        )
    }
}