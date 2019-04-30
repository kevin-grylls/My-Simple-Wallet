import React, { Component } from "react";
import "semantic-ui-css/semantic.min.css";
import {
  Form,
  Button,
  Container,
  Divider,
  Header,
  Segment
} from "semantic-ui-react";
import API from "../api";
import TEXT from "../config/STRINGS.json";
import Layout from "../components/Layout";
import Locator from "../components/Locator";

export default class SignupPage extends Component {
  state = {
    id: null,
    idError: false,
    password: null,
    passwordError: false,
    onRequest: false
  };

  updateAllErrors = () =>
    this.setState({
      idError: this.state.email == null ? true : false,
      passwordError: this.state.password == null ? true : false
    });

  updateError = targetName =>
    this.setState({
      idError: false,
      passwordError: false,
      [targetName + "Error"]: true
    });

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  onRequest = () => this.setState({ onRequest: !this.state.onRequest });

  handleSubmit = () => {
    const { id, password } = this.state;

    if (id == null) {
      this.updateError("id");
      this.updateAllErrors();
      alert(TEXT.ALERT.checkSignupEssentials);
    } else if (password == null) {
      this.updateError("password");
      this.updateAllErrors();
    } else {
      this.onRequest();
      API.signup(id, password)
        .then(response => {
          this.onRequest();
          alert(TEXT.ALERT.successSignup);
        })
        .catch(err => {
          console.warn(err.response.data);
          this.onRequest();
          alert(TEXT.ALERT.invalidAccount);
        });
    }
  };

  render() {
    const { id, idError, password, passwordError, onRequest } = this.state;

    return (
      <Layout>
        <Container>
          <div style={{ height: "20px" }} />
          <Divider hidden />
          <Locator
            header={TEXT.MENU.signup.title}
            main={TEXT.MENU.signup.signup}
          />

          <Divider />
          <Divider hidden />

          <Header as="h2">
            <b>{"회원가입"}</b>
          </Header>
          <Divider />
          <Header.Subheader>
            {"지금 스마트 월렛을 만들어 보세요!"}
          </Header.Subheader>

          <Divider hidden />
          <Divider hidden />

          <Segment>
            <Form>
              <Form.Group widths="equal">
                {idError == true && (
                  <Form.Input
                    error
                    required
                    name="id"
                    value={id}
                    onChange={this.handleChange}
                    label={"id"}
                    placeholder={TEXT.MENU.signup.idDescription}
                  />
                )}
                {idError == false && (
                  <Form.Input
                    width={8}
                    required
                    name="id"
                    value={id}
                    onChange={this.handleChange}
                    label={"id"}
                    placeholder={TEXT.MENU.signup.idDescription}
                  />
                )}
              </Form.Group>
              <Form.Group widths="equal">
                {passwordError == true && (
                  <Form.Input
                    error
                    required
                    name="password"
                    value={password}
                    onChange={this.handleChange}
                    label={"Password"}
                    placeholder={TEXT.MENU.signup.passwordDescription}
                    type="password"
                  />
                )}
                {passwordError == false && (
                  <Form.Input
                    required
                    name="password"
                    value={password}
                    onChange={this.handleChange}
                    label={"Password"}
                    placeholder={TEXT.MENU.signup.passwordDescription}
                    type="password"
                  />
                )}
              </Form.Group>
              {onRequest == true && (
                <Button loading secondary>
                  {"등록"}
                </Button>
              )}

              {onRequest == false && (
                <Button secondary type="submit" onClick={this.handleSubmit}>
                  {"등록"}
                </Button>
              )}
            </Form>
          </Segment>
        </Container>
      </Layout>
    );
  }
}
