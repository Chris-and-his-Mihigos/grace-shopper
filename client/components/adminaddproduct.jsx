import React from 'react';
import {
  Button,
  Form,
  Segment,
  Input,
  Header,
  Icon,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import history from '../history.js';
import { addProduct } from '../store';


class AdminAddProduct extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this)
  }


  handleSubmit(evt, data) {
    evt.preventDefault();
    const newAlbum = {
      releaseTitle: evt.target.title.value,
      label: evt.target.label.value,
      price: +evt.target.price.value,
      genre: evt.target.genre.value,
      releaseYear: evt.target.year.value,
      inventory: +evt.target.inventory.value,
      artists: [evt.target.artists.value],
    }
    this.props.createAlbum(newAlbum)
    history.push('/allalbums')
  }

  render() {
    const { isAdmin } = this.props;
    return (
      <div >


        <Header as="h2">
          <Icon name="add" />
          <Header.Content>
            Add New Product
          </Header.Content>
        </Header>
        <br />
        <br />
        <Segment inverted>
          <Form inverted onSubmit={this.handleSubmit}>
            <Form.Group widths="equal">
              <Form.Field name="title" control={Input} label="Title" placeholder="Release Title" />
              <Form.Field name="artists" control={Input} label="Artists" placeholder="Album Artists" />
            </Form.Group>
            <Form.Field name="photo" control={Input} label="Photo" placeholder="Photo URL" />
            <Form.Group>
              <Form.Field name="label" control={Input} label="Label" placeholder="Label" width={4} />
              <Form.Field name="genre" control={Input} label="Genre" placeholder="Album Genre" width={2} />

              <Form.Field name="price" control={Input} label="Price $" placeholder="Album Price" width={2} />
              <Form.Field name="inventory" control={Input} label="Inventory" placeholder="Album Inventory" width={2} />
              <Form.Field name="year" control={Input} label="Release Year" placeholder="Album Release Year" width={2} />
            </Form.Group>

            <Button
              type="submit"
              color="green"
            >
              <Icon name="add square" /> Add Product
            </Button>

          </Form>
        </Segment>
        <br />
        <br />
      </div>
    )
  }
}


const mapState = (state, ownProps) => {
  return {
    isLoggedIn: !!state.user.id,
    userId: state.user.id,
    isAdmin: !!state.user.id && state.user.isAdmin,
  };
};

const mapDispatch = dispatch => ({

  createAlbum: (albumId, albumUpdate) => {
    dispatch(addProduct(albumId, albumUpdate))
  },
});
export default connect(mapState, mapDispatch)(AdminAddProduct);
