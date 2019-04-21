import React from 'react';
import { Breadcrumb, Container } from 'semantic-ui-react';

const Locator = props => (
    <Container textAlign={"right"}>
        <Breadcrumb size={"small"}>
            <Breadcrumb.Section>HOME</Breadcrumb.Section>
            <Breadcrumb.Divider icon="right chevron" />
            <Breadcrumb.Section>{props.header}</Breadcrumb.Section>
            <Breadcrumb.Divider icon="right chevron" />
            <Breadcrumb.Section active>{props.main}</Breadcrumb.Section>
        </Breadcrumb>
    </Container>
)

export default Locator;