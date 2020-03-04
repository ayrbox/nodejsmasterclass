const makeSMSClient = require('../lib/smsClient');

const config = {
  fromPhone: '+12055089327',
  accountSID: 'ACc041fe75158c333bbb87681773ece9e9',
  authToken: '8838feaaddc81ba35f1931d40cf853a6',
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

