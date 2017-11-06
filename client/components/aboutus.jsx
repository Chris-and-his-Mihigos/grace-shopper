import React from 'react';
import { Grid, Header, Image, Segment } from 'semantic-ui-react';
import Title from './title.jsx';

const AboutUs = () => (
  <div>
    <Title title="About Us" />
    <Segment style={{ padding: '8em 0em' }} vertical>
      <Grid container stackable verticalAlign="middle">
        <Grid.Row>
          <Grid.Column width={8}>
            <Header as="h3" style={{ fontSize: '2em' }}>
              Who We Are
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              Since 1990, Maximal Records has welcomed independent music lovers
              of all kinds to our unique, vibrant stores in Berkeley, San
              Francisco and Hollywood. We stock every kind of music and movies
              -- from the top 40 to the best in underground rock and hip-hop,
              soul, electronica, new and classic jazz, world music, roots music
              and experimental music. We also have the biggest, most diverse and
              affordable selection of vinyl LPs found anywhere. Our stock
              changes daily and just about anything you're looking for can be
              found here. We're more than just a record store -- we're a 21st
              century music outlet, a website, a popular live performance venue,
              and together with our customers we're a meeting place for
              California's most colorful community of progressive and creative
              minds.
              <br />
              <br />
              Our staff is an all-star team of music retail veterans, with a
              collective depth of knowledge that is virtually unparalleled in
              the business. Many of us are musicians, or make music our lives in
              one way or another, and we take seriously the importance of our
              customers' relationship to music. We put customer service first
              and foremost -- our mission is to bring people and music together
              and to make everyone feel at home.
              <br />
              <br />
              Maximal Records began at a time when the huge chain stores were
              mercilessly swallowing up independent stores and local chain
              stores, depriving communities across the country of a personal
              relationship with their music outlets, and destroying the
              opportunity to discover a whole world of music beyond what
              corporate retailers wanted them to see. Maximal Records arose out of that
              community of music lovers that wanted a better place for music
              than a corporate chain store -- one with the widest possible
              selection, better service, and more respect for people's ideas and
              lives. Together with you, we are that community of independent
              artists and listeners that wanted something more, and with you
              we've been able to take root and thrive in California's most
              amazing cities. We're humbled by and thankful for the continuing
              support and success we've found in trying to create a store and a
              venue that's worthy of great music.
              <br />
              <br />
              Our San Francisco and Hollywood stores are big-city sized but have
              that same independent Berkeley spirit. These easy-to-get-to
              locations in the classic Haight-Ashbury and Sunset Strip locales
              feature vast, unbeatable selection, and are constantly hosting
              incredible free live performances and musical events. If you love
              music, let us be your ultimate source for inspiration!
            </p>
            <Header as="h3" style={{ fontSize: '2em' }}>
              Come Visit
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              <h3>Berkeley</h3>
              2455 Telegraph Ave. Berkeley, CA 94704
              <br />
              Sunday - Thursday: 11:00am - 8pm Friday - Saturday: 11:00am - 10pm
              <br />
              510.549.1125
              <br />
              <h3>San Francisco</h3>
              1855 Haight St. San Francisco, CA 94117
              <br />
              Monday - Sunday: 11am - 8pm
              <br />
              415.831.1200
              <br />
              <h3>Hollywood</h3>
              6400 Sunset Blvd. Los Angeles, CA 90028
              <br />
              Monday - Saturday: 10:30am - 11pm Sunday: 11am - 10pm
              <br />
              323.245.6400
            </p>
          </Grid.Column>
          <Grid.Column floated="right" width={6}>
            <Image bordered rounded size="large" />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  </div>
);

export default AboutUs;
