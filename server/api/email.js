const router = require('express').Router();
const Shipping = require('../db/models/shipping');

module.exports = router

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'persistentrecords@gmail.com',
    pass: 'graceshopper',
  },
})

router.post('/purchase', (req, res, next) => {
  const purchasedEmail = {
    from: '"Persistent Records" <persistentrecords@gmail.com>',
    to: `${req.body.email}`,
    subject: 'Thank you!',
    text: 'Thank you for your order. We will let you know when your shipment is on its way!',
  };

  transporter.sendMail(purchasedEmail, (error, info) => {
    if (error) console.error(error);
    console.log('Message sent: %s', info.messageId);
  })
})

router.post('/update', (req, res, next) => {

  let emailAddress = 'mtamahori@gmail.com';

  const shippedEmail = {
    from: '"Persistent Records" <persistentrecords@gmail.com>',
    to: `${emailAddress}`,
    subject: 'Order Shipped',
    text: 'Your order is on its way!',
  };

  const deliveredEmail = {
    from: '"Persistent Records" <persistentrecords@gmail.com>',
    to: `${emailAddress}`,
    subject: 'Woooo!',
    text: 'Your order has been delivered!',
  };

  const cancelledEmail = {
    from: '"Persistent Records" <persistentrecords@gmail.com>',
    to: `${emailAddress}`,
    subject: 'Oh no!',
    text: 'Your order has been cancelled!',
  };

  let updateEmail;

  if (req.body.status === 'shipped') updateEmail = shippedEmail;
  if (req.body.status === 'arrived') updateEmail = deliveredEmail;
  if (req.body.status === 'cancelled') updateEmail = cancelledEmail;

  Shipping.findOne({
    where: {
      orderId: req.body.id,
    },
  })
    .then((shipping) => {
      emailAddress = shipping.email;
    })

  transporter.sendMail(updateEmail, (error, info) => {
    if (error) console.error(error);
    console.log('Message sent: %s', info.messageId);
  });
})
