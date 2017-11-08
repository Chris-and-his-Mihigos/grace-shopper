import React from 'react';
import {
  Container,
  Grid,
  Header,
  List,
  Segment,
  Modal,
} from 'semantic-ui-react';

const Footer = () => (
  <Segment inverted vertical style={{ padding: '5em 0em' }}>
    <Container>
      <Grid divided inverted stackable>
        <Grid.Row>
          <Grid.Column width={3}>
            <Header inverted as="h4" content="About" />
            <List link inverted>
              <List.Item as="a" href="/aboutus">
                About Us
              </List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={3}>
            <Header inverted as="h4" content="Policies" />
            <List link inverted>
              <Modal trigger={<List.Item as="a">Shipping</List.Item>}>
                <Modal.Header>Shipping Policy</Modal.Header>
                <Modal.Content image>
                  <Modal.Description>
                    <h3>Order Processing:</h3>
                    <p>
                      Normal order processing can take between 1-3 business days
                      (Monday – Friday).
                    </p>
                    <h3>Shipping Fees:</h3>
                    <p>
                      All orders are shipped with complimentary free shipping.
                      Enjoy your music!
                    </p>
                    <h3>Shipping Delivery</h3>
                    <p>
                      All packages are shipped with UPS Standard Ground (5–7
                      business days). Business days do not include weekends and
                      there is no weekend delivery for any shipping method.
                      Currently, we do not ship to U.S. Territories, APO/FPO,
                      Canada or other international addresses. Orders shipped to
                      Alaska and Hawaii will take an additional 2 – 5 days for
                      delivery.
                    </p>
                  </Modal.Description>
                </Modal.Content>
              </Modal>

              <Modal trigger={<List.Item as="a">Returns</List.Item>}>
                <Modal.Header>Return and Order CancellationPolicy</Modal.Header>
                <Modal.Content image>
                  <Modal.Description>
                    <h3>After an order has shipped:</h3>

                    <p>
                      Persistent Records does not offer returns or reimbursement
                      after an order has been shipped.
                    </p>
                    <h3>Before an order has shipped:</h3>
                    <p>
                      If your order has not yet been shipped, please call us at
                      one of our locations to cancel your order. <br />You can
                      find our number on the About Us page.
                    </p>
                  </Modal.Description>
                </Modal.Content>
              </Modal>
            </List>
          </Grid.Column>
          <Grid.Column width={7}>
            <Header as="h4" inverted>
              Interested in working with us?
            </Header>
            <p>
              Get to know who we are in the About Us page, call one of our
              stores, and tell us your story.
            </p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  </Segment>
);

export default Footer;
