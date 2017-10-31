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
    // artist names aren't seeding as an array of strings
    artists: [faker.name.firstName()],
    genre: fakeGenres[randomInt(0, 4)],
    releaseYear: randomInt(1920, 2017),
    imageUrl: faker.internet.url(),
    // songInfo JSON format isn't perfect
    songsInfo: [{ title: faker.fake('{{lorem.words}}') }, { duration: (randomInt(1,9).toString() + ":" + randomInt(0,9).toString() + randomInt(0,9).toString()) }],
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
    // items JSON format isn't perfect
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

for (let i = 0; i < 20; i++) {
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

// BOILERMAKER BUILT-IN SEED FILE //

// /**
//  * Welcome to the seed file! This seed file uses a newer language feature called...
//  *
//  *                  -=-= ASYNC...AWAIT -=-=
//  *
//  * Async-await is a joy to use! Read more about it in the MDN docs:
//  *
//  * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
//  *
//  * Now that you've got the main idea, check it out in practice below!
//  */
// const db = require('../server/db')
// const {User} = require('../server/db/models')

// async function seed () {
//   await db.sync({force: true})
//   console.log('db synced!')
//   // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
//   // executed until that promise resolves!

//   const users = await Promise.all([
//     User.create({email: 'cody@email.com', password: '123'}),
//     User.create({email: 'murphy@email.com', password: '123'})
//   ])
//   // Wowzers! We can even `await` on the right-hand side of the assignment operator
//   // and store the result that the promise resolves to in a variable! This is nice!
//   console.log(`seeded ${users.length} users`)
//   console.log(`seeded successfully`)
// }

// // Execute the `seed` function
// // `Async` functions always return a promise, so we can use `catch` to handle any errors
// // that might occur inside of `seed`
// seed()
//   .catch(err => {
//     console.error(err.message)
//     console.error(err.stack)
//     process.exitCode = 1
//   })
//   .then(() => {
//     console.log('closing db connection')
//     db.close()
//     console.log('db connection closed')
//   })

// /*
//  * note: everything outside of the async function is totally synchronous
//  * The console.log below will occur before any of the logs that occur inside
//  * of the async function
//  */
// console.log('seeding...')
