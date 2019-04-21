import React, { Component } from 'react';
import Link from "next/link"
import Head from 'next/head'
import Router from 'next/router'
import { observer } from 'mobx-react'
import ICON from '../../config/ASSETS.json'
import TEXT from '../../config/STRINGS.json'
import { Image, Menu, Container, Segment, Icon, Button } from 'semantic-ui-react'
import '../../common/variables.scss';
import ENV from '../../common/store';

class Header extends Component {

    logout = () => {
        ENV.logout();
        alert(TEXT.ALERT.successLogout);
        Router.push('/index');
    }

    login = () => Router.push('/login');

    render() {

        const navbar = TEXT.HEADER.navbar.map(item =>
                <Menu.Item name={item.value} key={item.value + new Date()}>
                    <Link prefetch scroll={false} href={"/" + item.path} key={item.path}>
                        <a>{item.value}</a>
                    </Link>
                </Menu.Item>
            )


        return (
            <header>
                <Head>
                    <title>Smart Wallet</title>
                    <link rel="shortcut icon" type="image/x-icon" href="/static/assets/favicon.ico" />
                </Head>
                <Segment inverted>
                    <Menu
                        borderless
                        fixed={"top"}
                        style={{
                            backgroundColor: "#fff",
                            border: "1px solid #ddd",
                            boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.2)"
                        }}
                    >

                        <Container>
                            <Menu.Item>
                                <Link href={"/index"}>
                                    <Image
                                        size="mini"
                                        src={ICON.CI}
                                    />
                                </Link>
                            </Menu.Item>
                            {navbar}
                            {ENV.loginStatus == true && (
                                <Menu.Item position="right">
                                    <Button secondary animated="fade" onClick={this.logout}>
                                        <Button.Content visible><Icon name={"log out"} /></Button.Content>
                                        <Button.Content hidden>{"Logout"}</Button.Content>
                                    </Button>
                                </Menu.Item>
                            )}
                        </Container>
                    </Menu>
                </Segment>
            </header>
        )
    }
}

export default observer(Header);