const config = {
  hashingSecret: "NxwxZBTu4ntWTRY42utvpftv@geff{Fh",
  stripe: {
    url: "api.stripe.com",
    key: "<STRIP-APIKEY>",
    currency: "gbp",
    paymentMethods: "card"
  },
  mailgun: {
    apiKey: "<MAILGUN-APIKEY>",
    host: "api.mailgun.net",
    domain: "<MAILGUN-DOMAIN-SETUP>",
    from: "Pizza Delivery <pizzy-delivery@pirple.com>"
  }
};

module.exports = config;
