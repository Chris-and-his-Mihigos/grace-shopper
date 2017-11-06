const faker = require('faker');
const chance = require('chance')(123);

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
  return Math.floor(Math.random() * ((Math.floor(max) - Math.ceil(min)) + 1)) + min;
}

const emails = chance.unique(chance.email, 20);

// FAKE MODEL GENERATORS
const fakeUserGenerator = () => {
  const user = {
    email: emails.pop(),
    password: faker.internet.password(),
  }
  fakeUsers.push(user);
}

const releaseTitles = chance.unique(chance.word, 50);

const fakeProductGenerator = () => {
  const product = {
    releaseTitle: releaseTitles.pop(),
    artists: [faker.name.firstName() + ' ' + faker.name.lastName()],
    genre: fakeGenres[randomInt(0, 4)],
    releaseYear: randomInt(1920, 2017),
    imageUrl: faker.image.imageUrl(),
    songsInfo: [{ title: faker.fake('{{lorem.words}}'), duration: (randomInt(1,9).toString() + ":" + randomInt(0,9).toString() + randomInt(0,9).toString()) }],
    label: fakeLabels[randomInt(0, 4)],
    inventory: randomInt(0, 100),
    price: randomInt(1, 50),
    tags: [fakeTags[randomInt(0, 3)], fakeTags[randomInt(0, 3)]],
  }
  fakeProducts.push(product);
}

const fakeReviewGenerator = () => {
  const review = {
    text: 'Here is my review of this record. Much taste and forward thinking opinions.',
    rating: randomInt(0, 5),
    userId: randomInt(1, 20),
    productId: randomInt(1, 50),
  }
  fakeReviews.push(review);
}


const fakeOrderGenerator = () => {
  const order = {
    items: [fakeProducts[randomInt(0, 49)], fakeProducts[randomInt(0, 49)]],
    status: 'cart',
    sessionId: faker.random.number().toString(),
    userId: randomInt(1, 20).toString(),
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
    User.create(user)))
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
