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
const fakeStatus = [
  'cart',
  'purchased',
  'shipped',
  'arrived',
  'cancelled',
]
const fakeGenres = ['rock', 'jazz', 'hip-hop', 'classical', 'electronic'];
const fakeLabels = ['Atlantic', 'Blue Note', 'Def Jam', 'Deutsche Grammophon', 'Warp']
const fakeTags = ['chill', 'upbeat', 'deep', 'funky'];
const fakeImage = [
  faker.image.imageUrl(),
  faker.image.image(),
  faker.image.abstract(),
  faker.image.animals(),
  faker.image.business(),
  faker.image.cats(),
  faker.image.city(),
  faker.image.food(),
  faker.image.nightlife(),
  faker.image.fashion(),
  faker.image.people(),
  faker.image.nature(),
  faker.image.sports(),
  faker.image.technics(),
  faker.image.transport(),
]
const fakeTitle = [
  'No Discounts',
  'Five-leaf Clover',
  'Bursting Bubbles',
  'Methodical Madness',
  'All Ears',
  'Chaos',
  'Balls to the Wall',
  'Here We Go',
  'Once Bitten',
  'Advantage',
  'Form Over Function',
  'Favoritism',
  'Grains of Salt',
  'Bare to the Bone',
  'Badge of Honor',
  'Forever Alone',
  'Last Candidate',
  'No Justice',
  'Creative Director',
  'Cherry',
  'Feast of Nothing',
  'Zero Gravity',
  'The Last Laugh',
  'Wild Goose Chase',
  'Fight and Flight',
  'Blue Moon',
  'Unchained',
  'Here We Go Again',
  'Cloud Nine',
  'Cat Napped',
  'Blissful Ignorance',
  'Death\'s Dead',
  'Beggars and Thieves',
  'Honesty',
  'Concept Art',
  'Crocodile Tears',
  'Calm After the Storm',
  'Battle Grounds',
  'Fluke',
  'Just a Tease',
  'Basket Case',
  'Cemetery of the Living',
  'Bent Out of Shape',
  'Function Over Form',
  'Atmos',
]


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

// const releaseTitles = chance.unique(chance.word, 50);

const fakeProductGenerator = () => {
  const product = {
    releaseTitle: fakeTitle.pop(),
    artists: [`${faker.name.firstName()} ${faker.name.lastName()}`],
    genre: fakeGenres[randomInt(0, 4)],
    releaseYear: randomInt(1920, 2017),
    image: fakeImage[randomInt(0, 14)],
    songsInfo: [{ title: faker.fake('{{lorem.words}}'), duration: (`${randomInt(1, 9).toString()}:${randomInt(0, 9).toString() }${randomInt(0, 9).toString()}`) }],
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
    productId: randomInt(1, 40),
  }
  fakeReviews.push(review);
}


const fakeOrderGenerator = () => {
  const order = {
    items: [fakeProducts[randomInt(0, 39)], fakeProducts[randomInt(0, 39)]],
    status: fakeStatus[randomInt(0, 4)],
    sessionId: faker.random.number().toString(),
    userId: randomInt(1, 20).toString(),
  }
  fakeOrders.push(order);
}


const createFakes = () => {
  for (let i = 0; i < 20; i++) {
    fakeUserGenerator();
  }
  for (let i = 0; i < 40; i++) {
    fakeProductGenerator();
  }
  for (let i = 0; i < 200; i++) {
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
        Product.create(product)) ))
    .then(() =>
      Promise.all(fakeReviews.map(review =>
        Review.create(review)) ))
    .then(() =>
      Promise.all(fakeOrders.map(order =>
        Order.create(order)) ));

const db = require('../server/db');

const main = () => {
  console.log('Syncing db...');
  db.sync({ force: true })
    .then(() => {
      console.log('Seeding databse...');
      return seed();
    })
    .catch((err) => {
      console.log('Error while seeding');
      console.log(err.stack);
    })
    .then(() => {
      db.close();
      return null;
    });
};

main();
