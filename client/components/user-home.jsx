import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { List, Modal, Header } from 'semantic-ui-react';
import Title from './title.jsx';
/**
 * COMPONENT
 */
export const UserHome = (props) => {
  const { email, orders } = props;
  const statusObj = {
    cart: 'SHOULD NOT BE HERE',
    purchased: 'Created - Order is being processed',
    shipped: 'Shipped - En Route to Destination',
    arrived: 'Completed - Package has arrived at the destination',
    cancelled: 'Cancelled - Order has been cancelled',
  };
  return (
    <div>
      <Title title={`Welcome, ${email}`} />
      {!orders.length ? (
        // if there are no orders, render this:
        <h1>
          You have no past orders to review. Please browse our albums and make a
          purchase!
        </h1>
      ) : (
        // if there are orders, render this:
        <div>
          <h1>View your past orders below!</h1>
          <List divided relaxed>
            {// this is mapping out our order items
            
              orders
                .sort((a, b ) => b.id - a.id)
                .map((order) => {
              const preTotal = order.items
                .map(item => item.product.price * item.qty)
                .reduce((subTotal, albumTotal) => subTotal + albumTotal, 0);
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
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  const myId = state.user.id;
  const { orders } = state;
  const userOrders = orders.filter(order => +order.userId === myId);
  const actualOrders = userOrders.filter(order => order.status !== 'cart');
  return {
    email: state.user.email,
    orders: actualOrders,
  };
};

export default connect(mapState)(UserHome);

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string,
  userId: PropTypes.number,
  orders: PropTypes.array,
};
