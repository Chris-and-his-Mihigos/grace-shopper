import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { List, Modal, Header, Select } from 'semantic-ui-react';
import Title from './title.jsx';
import { adminUpdateOrder } from '../store/orders';

/**
 * COMPONENT
 */
class AdminOrders extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      status: '',
    };
    this.filterStatus = this.filterStatus.bind(this);
  }
  filterStatus(order) {
    // this is necessary as a user can be deleted and his reviews are orphaned
    const statusMatch = new RegExp(this.state.status, 'i');

    return statusMatch.test(order.status);
  }
  render() {
    const { orders, handleChange } = this.props;
    const statusObj = {
      cart: 'SHOULD NOT BE HERE',
      purchased: 'Created - Order is being processed',
      shipped: 'Shipped - En Route to Destination',
      arrived: 'Completed - Package has arrived at the destination',
      cancelled: 'Cancelled - Order has been cancelled',
    };
    return (
      <div>
        <Title title="Oh Admin! My Admin! Our fearful trip is done!" />
        {!orders.length ? (
          // if there are no orders, render this:
          <h1>
            You have no past orders to review. Please browse our albums and make
            a purchase!
          </h1>
        ) : (
            // if there are orders, render this:
            <div>
              <h1>View all past orders below!</h1>
              <Select
                placeholder="Filter by Order Status"
                options={[
                  {
                    value: 'purchased',
                    text: 'Created - Order is being processed',
                  },
                  {
                    value: 'shipped',
                    text: 'Shipped - En Route to Destination',
                  },
                  {
                    value: 'arrived',
                    text: 'Completed - Package has arrived at the destination',
                  },
                  {
                    value: 'cancelled',
                    text: 'Cancelled - Order has been cancelled',
                  },
                ]}
                onChange={(evt, data) => {
                  this.setState({ status: data.value });
                }}
              />
              <List divided relaxed>
                {// this is mapping out our order items

                  orders.length &&
                  orders
                    .filter(this.filterStatus)
                    .sort((a, b) => b.id - a.id)
                    .map((order) => {
                      const preTotal = order.items
                        .map(item => item.product.price * item.qty)
                        .reduce(
                        (subTotal, albumTotal) => subTotal + albumTotal,
                        0,
                      );
                      return (
                        <Modal
                          key={order.id}
                          trigger={
                            <List.Item key={order.id}>
                              <List.Icon
                                name="circle"
                                size="large"
                                verticalAlign="middle"
                              />
                              <List.Content>
                                <List.Header as="a">{`Order #${order.id}`}</List.Header>
                                <List.Description as="a">
                                  {`Purchased ${moment(
                                    order.updatedAt
                                      .split('T')
                                      .join(' ')
                                      .slice(0, 19),
                                    'YYYY-MM-DD HH-mm-ss',
                                  )
                                    .subtract(6, 'hours')
                                    .fromNow()}`}
                                </List.Description>
                              </List.Content>
                            </List.Item>
                          }
                        >
                          <Modal.Header>{`#${order.id}`}</Modal.Header>
                          <Modal.Content>
                            <Modal.Description>
                              <Header>
                                {`Purchased on ${moment(
                                  order.updatedAt
                                    .split('T')
                                    .join(' ')
                                    .slice(0, 19),
                                  'YYYY-MM-DD HH-mm-ss',
                                )
                                  .subtract(6, 'hours')
                                  .format('MMMM Do YYYY, h:mm:ss a')}`}
                              </Header>
                              {order.items.map(item => (
                                <div key={item.product.id}>
                                  <p>
                                    <a href={`/album/${item.product.id}`}>
                                      Release Title: {item.product.releaseTitle}{' '}
                                    </a>
                                    <br />
                                    Item Price: {item.product.price} <br />
                                    Quantity: {item.qty} <br />
                                  </p>
                                  <br />
                                  <br />
                                </div>
                              ))}
                              <p>Order Status: {statusObj[order.status]}</p>
                              <p>Subtotal: {preTotal} </p>
                              <p>Tax: {(preTotal * 0.08).toFixed(2)} </p>
                              <p>Total: {(preTotal * 1.08).toFixed(2)} </p>
                              <Select
                                onChange={(event, data) => handleChange(event, order, order.id, data)}
                                placeholder="Change Order Status"
                                options={[
                                  {
                                    value: 'purchased',
                                    text: 'Created - Order is being processed',
                                  },
                                  {
                                    value: 'shipped',
                                    text: 'Shipped - En Route to Destination',
                                  },
                                  {
                                    value: 'arrived',
                                    text:
                                    'Completed - Package has arrived at the destination',
                                  },
                                  {
                                    value: 'cancelled',
                                    text: 'Cancelled - Order has been cancelled',
                                  },
                                ]}
                              />
                            </Modal.Description>
                          </Modal.Content>
                        </Modal>
                      );
                    })}
              </List>
            </div>
          )}
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  const { orders } = state;
  const actualOrders = orders.filter(order => order.status !== 'cart');
  return {
    orders: actualOrders,
  };
};

const mapDispatch = dispatch => ({
  handleChange(event, order, orderId, data) {
    event.preventDefault();
    const newOrder = Object.assign({}, order, {
      status: data.value,
    })
    dispatch(adminUpdateOrder(orderId, newOrder))
  },
})

export default connect(mapState, mapDispatch)(AdminOrders);
