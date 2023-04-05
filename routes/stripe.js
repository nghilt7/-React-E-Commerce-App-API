const router = require("express").Router();
const stripe = require("stripe")(
  "sk_test_51Msy3jKlbj8oLUcO5J9JyQlhnMbjLKIQYNGKQmR8ZOG4EgKs3Y7MTasQFE6VL8T2j5T4BRQPW9C0nlGSbywMUxef00CfnDSY5w"
);

router.post("/payment", (req, res) => {
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "usd",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).json(stripeErr);
      } else {
        res.status(200).json(stripeRes);
      }
    }
  );
});

// router.post("/payment", async (req, res) => {
//   try {
//     console.log("hello fuck");
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: 1000,
//       currency: "usd",
//       payment_method_types: ["card"],
//     });

//     return res.status(200).json({ client_secret: paymentIntent.client_secret });
//   } catch (error) {
//     return res.status(500).json(error);
//   }
// });

module.exports = router;
