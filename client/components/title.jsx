import React from 'react';
import {
  Button,
  Container,
  Grid,
  Header,
  Image,
  List,
  Segment,
  Card,
  Checkbox,
  Form,
  Icon,
  Select,
  Input,
} from 'semantic-ui-react';

const Title = props => (
  <Segment
    inverted
    textAlign="center"
    style={{
        paddingBottom: 1,
        paddingTop: 2,
      }}
    vertical
  >
    <Container text>
      <Header
        as="h1"
        content={props.title}
        inverted
        style={{
            fontSize: '4em',
            fontWeight: 'normal',
            marginBottom: 20,
            padding: '0em 0em',
          }}
      />
    </Container>
  </Segment>
);

export default Title;
