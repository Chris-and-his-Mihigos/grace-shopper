import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Title from './title.jsx';
import {
  List,
  Modal,
  Header,
} from 'semantic-ui-react';
/**
 * COMPONENT
 */
export const UserHome = (props) => {
  const { email, orders } = props;
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
            orders.map(order => (
              <Modal
                trigger={
                  <List.Item key={order.id}>
                    <List.Icon
                      name="circle"
                      size="large"
                      verticalAlign="middle"
                    />
                    <List.Content>
                      <List.Header as="a">{`#${order.id}`}</List.Header>
                      <List.Description as="a">{`Purchased on ${moment(
                        order.updatedAt
                          .split('T')
                          .join(' ')
                          .slice(0, 19),
                        'YYYY-MM-DD HH-mm-ss',
                      )
                        .subtract(6, 'hours')
                        .format('MMMM Do YYYY, h:mm:ss a')}`}
                      </List.Description>
                    </List.Content>
                  </List.Item>
                }
              >
                <Modal.Header>{`#${order.id}`}</Modal.Header>
                <Modal.Content>

                  <Modal.Description>
                    <Header>{`Purchased on ${moment(
                      order.updatedAt
                        .split('T')
                        .join(' ')
                        .slice(0, 19),
                      'YYYY-MM-DD HH-mm-ss',
                    )
                      .subtract(6, 'hours')
                      .format('MMMM Do YYYY, h:mm:ss a')}`}
                    </Header>
                    { order.items.map(item =>
                     (
                       <div>
                         <p>
                           Release Title: {item.releaseTitle}
                         </p>
                         <p>
                           Item Price: {item.price}
                         </p>
                         <br />
                         <br />
                       </div>))}
                  </Modal.Description>
                </Modal.Content>
              </Modal>
            ))}
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
  return {
    email: state.user.email,
    orders: userOrders,
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
