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
import { connect } from 'react-redux';
import AlbumCard from './albumcard.jsx';

class AllAlbums extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      artist: '',
      genre: '',
    };

    this.filterTitle = this.filterTitle.bind(this);
    this.renderTitleSearch = this.renderTitleSearch.bind(this);
  }

  filterTitle(album) {
    // this is necessary as a user can be deleted and his stories are orphaned
    const artistName = album.artists[0];
    const titleMatch = new RegExp(this.state.title, 'i');
    const artistMatch = new RegExp(this.state.artist, 'i');
    const genreMatch = new RegExp(this.state.genre, 'i');

    return titleMatch.test(album.releaseTitle)
      && artistMatch.test(artistName)
      && genreMatch.test(album.genre);
  }
  renderTitleSearch() {
    const { products } = this.props;
    const genres = [{ key: 'all', value: '', text: 'All' }];
    const genreNames = [];
    products.forEach((product) => {
      const name = product.genre[0].toUpperCase() + product.genre.substr(1)
      if (!genreNames.includes(name)) { genreNames.push(name) }
    })
    genreNames.forEach((genre) => {
      const key = genre.substr(0, 2);
      genres.push({ key, value: genre, text: genre })
    })
    return (
      <Segment inverted id="filter">
        <Form inverted >
          <Form.Group size="small">

            <Icon id="searchIcon" name="search" size="large" />

            <Form.Field
              label="Album Release Title"
              control={Input}
              placeholder="Album Release Title"
              onChange={evt => this.setState({ title: evt.target.value })}
            />

            <Form.Field
              label="Album Artist"
              control={Input}
              placeholder="Album Artist"
              onChange={evt => this.setState({ artist: evt.target.value })}
            />
            <Form.Field
              label="Genre"
              control={Select}
              options={genres}
              placeholder="Genre"
              onChange={(evt, data) => { this.setState({ genre: data.value }) }
              }

            />
          </Form.Group>


        </Form>
      </Segment>

    );
  }

  render() {
    const { products } = this.props;
    return (
      <div>
        <div className="container">
          {this.renderTitleSearch()}
          <br />
        </div>

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
              content="Albums"
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

        <Card.Group id="albumcards">
          {products.length ?
            products
              .filter(this.filterTitle)
              .map(product => <AlbumCard key={product.id} product={product} />) : <div />}
        </Card.Group>
      </div>
    )
  }
}

const mapState = ({ products }) => ({ products })
const mapDispatch = null;

export default connect(mapState, mapDispatch)(AllAlbums);

