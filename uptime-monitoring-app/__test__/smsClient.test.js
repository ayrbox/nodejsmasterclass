const makeSMSClient = require('../lib/smsClient');

const config = {
  fromPhone: '+12',
  accountSID: 'ACc041fe7515',
  authToken: '8838feaaddc81',
  apiHost: 'api.twilio.com',
};

const smsClient = makeSMSClient(config);

smsClient.send({
  phone: '+447508665459',
  message: 'Hello Sabin',
}, function(err) {
  if(err) {
    console.log('Error sendind message.\n\n\n');
    console.log(err);
  } else {
    console.log('SMS sent. Check your phone');
  }
})

