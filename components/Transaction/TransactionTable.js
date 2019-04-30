import React from "react";
import { Segment, Button, Grid, Header } from "semantic-ui-react";

export default props => (
  <Segment.Group
    key={
      new Date().getTime().toString() +
      (props.item.txHash != null ? props.item.txHash : props.item.blockHash)
    }
  >
    <Segment color="green">
      {props.item.txHash ? (
        <Button inverted>
          <Header as="h4">TRANSACTION</Header>
        </Button>
      ) : (
        <Button inverted>
          <Header as="h4">BLOCK</Header>
        </Button>
      )}

      {props.item.txHash && (
        <Button
          inverted
          color="green"
          onClick={e => props.handleDetail(props.item.txHash)}
        >
          상세보기
        </Button>
      )}
    </Segment>
    <Segment.Group>
      {props.item.contractAddress && (
        <Segment>
          <Grid>
            <Grid.Column width={2}>CA:</Grid.Column>
            <Grid.Column width={6}>{props.item.contractAddress}</Grid.Column>
          </Grid>
        </Segment>
      )}

      {props.item.origin && (
        <Segment>
          <Grid>
            <Grid.Column width={2}>From:</Grid.Column>
            <Grid.Column width={6}>{props.item.origin}</Grid.Column>
          </Grid>
        </Segment>
      )}

      {props.item.destination && (
        <Segment>
          <Grid>
            <Grid.Column width={2}>To:</Grid.Column>
            <Grid.Column width={6}>{props.item.destination}</Grid.Column>
          </Grid>
        </Segment>
      )}

      {props.item.from && (
        <Segment>
          <Grid>
            <Grid.Column width={2}>From:</Grid.Column>
            <Grid.Column width={6}>{props.item.from}</Grid.Column>
          </Grid>
        </Segment>
      )}

      {props.item.to && (
        <Segment>
          <Grid>
            <Grid.Column width={2}>To:</Grid.Column>
            <Grid.Column width={6}>{props.item.to}</Grid.Column>
          </Grid>
        </Segment>
      )}

      {props.item.amount && (
        <Segment>
          <Grid>
            <Grid.Column width={2}>Amount:</Grid.Column>
            <Grid.Column width={6}>{props.item.amount}</Grid.Column>
          </Grid>
        </Segment>
      )}

      {props.item.gasUsed && (
        <Segment>
          <Grid>
            <Grid.Column width={2}>Gas Used:</Grid.Column>
            <Grid.Column width={6}>{props.item.gasUsed}</Grid.Column>
          </Grid>
        </Segment>
      )}

      {props.item.blockNumber && (
        <Segment>
          <Grid>
            <Grid.Column width={2}>Block Number:</Grid.Column>
            <Grid.Column width={6}>{props.item.blockNumber}</Grid.Column>
          </Grid>
        </Segment>
      )}

      <Segment>
        {props.item.txHash ? (
          <Grid>
            <Grid.Column width={2}>Transaction Hash:</Grid.Column>
            <Grid.Column width={6}>{props.item.txHash}</Grid.Column>
          </Grid>
        ) : (
          <Grid>
            <Grid.Column width={2}>Block Hash:</Grid.Column>
            <Grid.Column width={6}>{props.item.blockHash}</Grid.Column>
          </Grid>
        )}
      </Segment>

      <Segment>
        <Grid>
          <Grid.Column width={2}>Transaction Index: </Grid.Column>
          <Grid.Column width={6}>{props.item.transactionIndex}</Grid.Column>
        </Grid>
      </Segment>

      {props.item.gas && (
        <Segment>
          <Grid>
            <Grid.Column width={2}>Gas: </Grid.Column>
            <Grid.Column width={6}>{props.item.gas}</Grid.Column>
          </Grid>
        </Segment>
      )}

      {props.item.gasPrice && (
        <Segment>
          <Grid>
            <Grid.Column width={2}>Gas Price: </Grid.Column>
            <Grid.Column width={6}>{props.item.gasPrice}</Grid.Column>
          </Grid>
        </Segment>
      )}

      {props.item.hash && (
        <Segment>
          <Grid>
            <Grid.Column width={2}>Hash: </Grid.Column>
            <Grid.Column width={6}>{props.item.hash}</Grid.Column>
          </Grid>
        </Segment>
      )}

      {/* {props.item.input && (
        <Segment>
          <Grid>
            <Grid.Column width={2}>Input: </Grid.Column>
            <Grid.Column width={6}>{props.item.input}</Grid.Column>
          </Grid>
        </Segment>
      )} */}

      {props.item.nonce && (
        <Segment>
          <Grid>
            <Grid.Column width={2}>Nonce: </Grid.Column>
            <Grid.Column width={6}>{props.item.nonce}</Grid.Column>
          </Grid>
        </Segment>
      )}

      <Segment>
        <Grid>
          <Grid.Column width={2}>Value: </Grid.Column>
          <Grid.Column width={6}>{props.item.value}</Grid.Column>
        </Grid>
      </Segment>

      {props.item.v && (
        <Segment>
          <Grid>
            <Grid.Column width={2}>V: </Grid.Column>
            <Grid.Column width={6}>{props.item.v}</Grid.Column>
          </Grid>
        </Segment>
      )}

      {props.item.r && (
        <Segment>
          <Grid>
            <Grid.Column width={2}>R: </Grid.Column>
            <Grid.Column width={6}>{props.item.r}</Grid.Column>
          </Grid>
        </Segment>
      )}

      {props.item.s && (
        <Segment>
          <Grid>
            <Grid.Column width={2}>S: </Grid.Column>
            <Grid.Column width={6}>{props.item.s}</Grid.Column>
          </Grid>
        </Segment>
      )}

      {props.item.createdAt && (
        <Segment>
          <Grid>
            <Grid.Column width={2}>Created At:</Grid.Column>
            <Grid.Column width={6}>{props.item.createdAt}</Grid.Column>
          </Grid>
        </Segment>
      )}
    </Segment.Group>
  </Segment.Group>
);
