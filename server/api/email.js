// const apiKey = '16c62cba4b06b2e507d9b35899def431-us17';
// const listId = 'da74a128e9';
// const mailURL = 'https://us17.api.mailchimp.com/3.0';

// const request = require('superagent');

// const Mailchimp = require('mailchimp-api-v3');
// const mailchimp = new Mailchimp(apiKey);

const router = require('express').Router();

module.exports = router

const email = require('emailjs');
const server = email.server.connect({
  user: "persistentrecords@gmail.com",
  password: "graceshopper",
  host: "smtp.gmail.com",
  port: 465,
  ssl: true,
});

router.post('/', (req, res, next) => {
  server.send({
    text: "Please work",
    from: "PERSISTENT <persistentrecords@gmail.com>",
    to: 'mtamahori@gmail.com',
    cc: "Christian, <christiansadi@gmail.com>",
    subject: "EMAILJS YO YO YO HELLO"
  }, function (err, message) { console.log(err || message); })
    .catch(next);
})

// router.use('/email', require('./email'));

// export const purchaseOrder = (id, shipping, order) => (dispatch) => {
//   axios.put(`/api/orders/${id}`, order)
//     .then(res => dispatch(update(res.data)))
//     .then(() => axios.put(`/api/orders/${id}/shipping`, shipping))
//     .then(() => axios.post('/api/email', { email: shipping.email }))
//     .then(() => dispatch(clearCart()))
//     .catch(err => console.error(`Updating order: ${shipping} unsuccesful`, err))
// };




// example email
// const email = 'persistentrecords@gmail.com'

// const md5 = require('md5');

// Send purchase confirmation email

// router.post('/', (req, res, next) => {
//   request
//     .post('https://us17.api.mailchimp.com/3.0/lists/da74a128e9/members')
//     .set('Content-Type', 'application/json;charset=utf-8')
//     .set('Authorization', `Basic ${new Buffer('any:' + apiKey).toString('base64')}`)
//     .send({
//       email_address: req.body.email,
//       status: 'subscribed',
//     })
//     .catch(next)
// })





// router.get(`/lists${listId}/members/:${md5(email)}`, (req, res, next) => {

// })

// console.log('md5(email)', md5(email));

// router.post(`/lists${listId}/members`, (req, res, next) => {

// })

//

// mailchimp.get({
//   path: `/lists${listId}/members`
// })
//   .then((members) => {
//     console.log(members);
//   })


// POST request example:

// {
//   "name": "Persistent Records",
//   "contact": {
//     "company": "MailChimp",
//     "address1": "675 Ponce De Leon Ave NE",
//     "address2": "Suite 5000",
//     "city": "Atlanta",
//     "state": "GA",
//     "zip": "30308",
//     "country": "US",
//     "phone": ""
//   },
//   "permission_reminder": "You're receiving this email so you are aware of your order's status!",
//   "campaign_defaults": {
//     "from_name": "Persistent Records",
//     "from_email": "orders@persistentrecords.com",
//     "subject": "Order Status Update",
//     "language": "en"
//   },
//   "email_type_option": true
// }
