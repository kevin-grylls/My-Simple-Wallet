import React, { Component } from "react";
import Link from "next/link";
import { observer } from "mobx-react";
import "semantic-ui-css/semantic.min.css";
import Locator from "../components/Locator";
import Layout from "../components/Layout";
import TEXT from "../config/STRINGS.json";
import IMAGE from "../config/ASSETS.json";
import {
  Container,
  Divider,
  Grid,
  Form,
  Segment,
  Message,
  Button,
  Image
} from "semantic-ui-react";
import API from "../api";
import ENV from "../common/store";

class Index extends Component {
  state = {
    id: "",
    password: "",
    onRequest: false
  };

  onRequest = () => this.setState({ onRequest: !this.state.onRequest });

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = () => {
    const { id, password } = this.state;

    if (id == "" || password == "") {
      alert(TEXT.ALERT.checkLoginEssentials);
    } else {
      this.onRequest();
      API.login(id, password)
        .then(response => {
          console.log(response.data);
          setTimeout(() => {
            ENV.login(response.data);
            this.onRequest();
          }, 1000);
        })
        .catch(err => {
          console.warn(err.response);
          this.onRequest();
          alert(TEXT.ALERT.invalidAccount);
        });
    }
  };

  render() {
    const { id, password, onRequest } = this.state;

    return (
      <Layout>
        <Container>
          <div style={{ height: "20px" }} />

          <Divider hidden />

          {ENV.loginStatus == false && (
            <React.Fragment>
              <Locator
                header={TEXT.MENU.login.title}
                main={TEXT.MENU.login.login}
              />
              <Divider />
            </React.Fragment>
          )}

          <Divider hidden />
          <Divider hidden />
          <Divider hidden />

          {ENV.loginStatus == true && (
            <Grid
              textAlign="center"
              style={{ height: "100%" }}
              verticalAlign="middle"
            >
              <Segment basic raised clearing>
                <Image src={IMAGE.FRONT} size={"medium"} floated />
              </Segment>
            </Grid>
          )}

          {ENV.loginStatus == false && (
            <Grid
              textAlign="center"
              style={{ height: "100%" }}
              verticalAlign="middle"
            >
              <Grid.Column style={{ maxWidth: 450 }}>
                <Form size="large">
                  <Segment stacked>
                    <Form.Input
                      fluid
                      icon="user"
                      iconPosition="left"
                      placeholder="ID"
                      name="id"
                      value={id}
                      onChange={this.handleChange}
                    />
                    <Form.Input
                      fluid
                      icon="lock"
                      iconPosition="left"
                      placeholder="Password"
                      type="password"
                      name="password"
                      value={password}
                      onChange={this.handleChange}
                    />

                    {onRequest == false && (
                      <Button
                        color="red"
                        fluid
                        size="large"
                        onClick={this.handleSubmit}
                      >
                        {TEXT.MENU.login.login}
                      </Button>
                    )}

                    {onRequest == true && (
                      <Button loading color="red" fluid size="large">
                        {TEXT.MENU.login.login}
                      </Button>
                    )}
                  </Segment>
                </Form>
                <Message>
                  {TEXT.MENU.login.newbie}{" "}
                  <Link href={"/signup"}>
                    <a>
                      <b style={{ color: "#4B66A0" }}>
                        {TEXT.MENU.login.signup}
                      </b>
                    </a>
                  </Link>
                </Message>
              </Grid.Column>
            </Grid>
          )}
        </Container>
      </Layout>
    );
  }
}

export default observer(Index);
