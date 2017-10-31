import React from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'

const AlbumCard = () => (
  <Card>
    <Image src="abbey_road.jpg" />
    <Card.Content>
      <Card.Header>
        Abbey Road
      </Card.Header>
      <Card.Meta>
        <span className="date">
          Released in 1969
        </span>
      </Card.Meta>
      <Card.Description>
        The Beatles
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <a>
        <Icon name="add to cart" />
        Add to Cart
      </a>
    </Card.Content>
  </Card>
)

export default AlbumCard
