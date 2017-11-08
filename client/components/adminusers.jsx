import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { List, Modal, Header, Select, Button } from 'semantic-ui-react';
import Title from './title.jsx';
import { adminFetchUsers, adminRemoveUser, adminUpdateUser } from '../store/users'
/**
 * COMPONENT
 */
class AdminUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        status: '',
      };
      this.filterStatus = this.filterStatus.bind(this);
    }
    filterStatus(user) {
        // this is necessary as a user can be deleted and his reviews are orphaned
        const statusMatch = new RegExp(this.state.status, 'i');

        return statusMatch.test(user.isAdmin);
      }

  componentDidMount() {
    this.props.loadUsers()
  }

  render() {
    const { users, deleteUser, promoteUser, state } = this.props;
    return (
      <div>
        <Title title="User Management" />
        {!users ? (
          // if there are no users, render this:
          <h1>
            There are no users to display.
          </h1>
        ) : (
          // if there are users, render this:
          <div>
            <h1>View all users below!</h1>
            <Select
              placeholder="Filter by User Status"
              options={[
                {
                  value: 'true',
                  text: 'Admins',
                },
                {
                  value: 'false',
                  text: 'Users',
                },
              ]}
              onChange={(evt, data) => {
                this.setState({ status: data.value });
              }}
            />
            <List divided relaxed>
              {// this is mapping out our order items

              users &&
                users
                .filter(this.filterStatus)
                  .sort((a, b) => a.id - b.id)
                  .map(user => (
                    <Modal
                      key={user.id}
                      trigger={
                        <List.Item key={user.id}>
                          <List.Icon
                            name="circle"
                            size="large"
                            verticalAlign="middle"
                          />
                          <List.Content>
                            <List.Header as="a">{`User #${user.email}`}</List.Header>
                            <List.Description as="a">
                              {`Last Updated ${moment(
                                  user.updatedAt
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
                      <Modal.Header>{`Email: ${user.email}`}</Modal.Header>
                      <Modal.Content>
                        <Modal.Description>
                          <Header>
                            {`Last Updated on ${moment(
                                user.updatedAt
                                  .split('T')
                                  .join(' ')
                                  .slice(0, 19),
                                'YYYY-MM-DD HH-mm-ss',
                              )
                                .subtract(6, 'hours')
                                .format('MMMM Do YYYY, h:mm:ss a')}`}
                          </Header>
                          <Header>
                            {`User Created on ${moment(
                              user.createdAt
                                .split('T')
                                .join(' ')
                                .slice(0, 19),
                              'YYYY-MM-DD HH-mm-ss',
                            )
                              .subtract(6, 'hours')
                              .format('MMMM Do YYYY, h:mm:ss a')}`}
                          </Header>
                         {!user.isAdmin && <Button onClick={(evt)=>promoteUser(evt,user.id,user)}>Promote User</Button>}
                         <Button onClick={(evt)=>deleteUser(evt,user.id)}>Delete User</Button>
                        </Modal.Description>
                      </Modal.Content>
                    </Modal>
                    ))}
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
  const { users } = state;
  return {
    users,
    state,
  };
};

const mapDispatch = dispatch => ({
  loadUsers() {
    dispatch(adminFetchUsers())
  },
  deleteUser(evt, userId) {
    evt.preventDefault();
    dispatch(adminRemoveUser(userId))
  },
  promoteUser(evt, userId, user) {
    evt.preventDefault();
    const newAdmin = Object.assign({}, user, {
      isAdmin: true,
    })
    dispatch(adminUpdateUser(userId, newAdmin))
  },
})


export default connect(mapState, mapDispatch)(AdminUsers);
