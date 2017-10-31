const faker = require('faker');

const User = require('../server/db/models/user');
const Product = require('../server/db/models/product');
const Review = require('../server/db/models/review');
const Order = require('../server/db/models/order');

const fakeUsers = [];
const fakeProducts = [];
const fakeReviews = [];
const fakeOrders = [];

const fakeGenres = ['rock', 'jazz', 'hip-hop', 'classical', 'electronic'];
const fakeLabels = ['Atlantic', 'Blue Note', 'Def Jam', 'Deutsche Grammophon', 'Warp']
const fakeTags = ['chill', 'upbeat', 'deep', 'funky'];


// RANDOM INTEGER GENERATOR (INCLUSIVE)
function randomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// FAKE MODEL GENERATORS
const fakeUserGenerator = () => {
  const user = {
    email: faker.internet.email(),
    password: faker.internet.password(),
  }
  fakeUsers.push(user);
}

const fakeProductGenerator = () => {
  const product = {
    releaseTitle: faker.lorem.words(),
    artists: [faker.name.firstName() + ' ' + faker.name.lastName()],
    genre: fakeGenres[randomInt(0, 4)],
    releaseYear: randomInt(1920, 2017),
    imageUrl: faker.internet.url(),
    songsInfo: [{ title: faker.fake('{{lorem.words}}'), duration: (randomInt(1,9).toString() + ":" + randomInt(0,9).toString() + randomInt(0,9).toString()) }],
    label: fakeLabels[randomInt(0, 4)],
    inventory: randomInt(0, 100),
    tags: [fakeTags[randomInt(0, 3)], fakeTags[randomInt(0, 3)]],
  }
  fakeProducts.push(product);
}

const fakeReviewGenerator = () => {
  const review = {
    text: faker.lorem.text(),
    rating: randomInt(0, 5),
    userId: randomInt(1, 20),
    productId: randomInt(1, 50),
  }
  fakeReviews.push(review);
}


const fakeOrderGenerator = () => {
  const order = {
    items: [fakeProducts[randomInt(0, 49)], fakeProducts[randomInt(0, 49)]],
    sessionId: faker.random.number().toString(),
    hasShipped: false,
    hasArrived: false,
    isPurchased: false,
    userId: randomInt(1, 20).toString(),
    isCancelled: false,
  }
  fakeOrders.push(order);
}


const createFakes = () => {
  for (let i = 0; i < 20; i++) {
    fakeUserGenerator();
  }
  for (let i = 0; i < 50; i++) {
    fakeProductGenerator();
  }
  for (let i = 0; i < 40; i++) {
    fakeOrderGenerator();
  }
}

createFakes();

for (let i = 0; i < 40; i++) {
  fakeReviewGenerator();
}

const seed = () =>
  Promise.all(fakeUsers.map(user =>
    User.create(user))
  )
    .then(() =>
      Promise.all(fakeProducts.map(product =>
        Product.create(product))
      ))
    .then(() =>
      Promise.all(fakeReviews.map(review =>
        Review.create(review))
      ))
    .then(() =>
      Promise.all(fakeOrders.map(order =>
        Order.create(order))
      ));

const db = require('../server/db');

const main = () => {
  console.log('Syncing db...');
  db.sync({ force: true })
    .then(() => {
      console.log('Seeding databse...');
      return seed();
    })
    .catch(err => {
      console.log('Error while seeding');
      console.log(err.stack);
    })
    .then(() => {
      db.close();
      return null;
    });
};

main();
