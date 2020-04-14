/**
 * Seeder function to generate pizza menu
 * and other data to for testing
 */

const path = require('path');
const makePizzas = require('../lib/makeDataHandlers');
const makeRandomString = require('../lib/makeRandomString');

const pizzas = [{
  name: 'Cheese & Tomato Pizza',
  description: 'Simple Cheese and tomato pizza'
}, {
  name: 'Vegetarian Pizza',
  description: 'Mushroom, green peppers & sweet corn',
}, {
  name: 'Super Chicken Pizza',
  description: 'Chicken, mushroom, tukey, ham, green peppers & ground beef',
}, {
  name: 'Mighty Meat Pizza',
  description: 'Turkey ham, chicken, ground beef & pepperoni'
}, {
  name: 'Perfect Special Pizza',
  description: 'Turkey ham, ground beef, mushroom, green peppers, onions & sweetcorns',
}, {
  name: 'Seafood Pizza',
  description: 'Tuna & Prawns',
}, {
  name: 'Doner Pizza',
  description: 'Doner meat, mushroom, green peppers & onions',
}, {
  name: 'Hawaiian Pizza',
  descriptoin: 'Turkey ham & Pineapple',
}, {
  name: 'Gourment Pepperoni Pizza',
  description: 'Pepperoni, green peppers, turkey, ham & mushrooms',
}, {
  name: 'Doner Pizza',
  description: 'Chicken doner, mushroom, green peppers & onions',
}, {
  name: 'Four Seasons  Pizza',
  description: 'Turkey hame, mushrooms, onions & jalapeno peppers'
}, {
  name: 'Hot & Spicy Pizza',
  description: "Pepperoni, mushrooms, onion, green peppers & jalapenos",
}, {
  name: 'BBQ Chicken Pizza',
  description: 'BBQ chicken, mushrooms, green peppers & sweetcorn.',
}, {
  name: 'Chinese Chicken Pizza',
  description: 'Chinese chicken, mushrooms, green peppers & sweetcorn',
}, {
  name: 'Farmhouse Pizza',
  description: 'Ham & mushroom',
}, {
  name: 'American Hot Pizza',
  description: 'Pepperoni, onions, green peppers & jalapenons',
}, {
  name: 'Beef Eater Pizza',
  description: 'Beef, mushroom, onion & sweetcorn',
}, {
  name: 'Pepperoni Plus Pizza',
  description: 'Double pepperoni & double cheese',
}];

const pizzaOptions = [{
  name: '9 inches',
  price: 11.5,
}, {
  name: '12 inches',
  price: 16.5,
}, {
  name: '15 inches',
  price: 17.5,
}];

const pizza = makePizzas(path.join(__dirname, '../.data'), 'menu');
const randomString = makeRandomString(20);

pizzas.forEach(({ name, description }) => {
  const id = randomString();
  pizza.create(id, {
    id,
    name,
    description,
    options: pizzaOptions,
  }, (err) => {
    if(err) {
      console.log('ERROR', name, ' not creatd.')
      return;
    }
    console.log(name, 'created');
  });
});
