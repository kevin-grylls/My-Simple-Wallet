import React, { Component } from "react";
import "semantic-ui-css/semantic.min.css";
import Locator from "../components/Locator";
import Layout from "../components/Layout";
import TEXT from "../config/STRINGS.json";
import IMAGE from "../config/ASSETS.json";
import { Container, Divider, Grid, Segment, Image } from "semantic-ui-react";

export default class Index extends Component {
  render() {
    return (
      <Layout>
        <Container>
          <div style={{ height: "20px" }} />

          <Divider hidden />

          <React.Fragment>
            <Locator header={TEXT.MENU.main.title} main={TEXT.MENU.main.main} />
            <Divider />
          </React.Fragment>

          <Divider hidden />
          <Divider hidden />
          <Divider hidden />

          <Grid
            textAlign="center"
            style={{ height: "100%" }}
            verticalAlign="middle"
          >
            <Segment basic raised clearing>
              <Image src={IMAGE.FRONT} size={"medium"} />
            </Segment>
          </Grid>
        </Container>
      </Layout>
    );
  }
}
