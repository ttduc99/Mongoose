require('dotenv').config();
// require('dotenv').config({ path: './mongo.env' });
// const express = require('express');
const mongoose = require('mongoose');

// const app = express();
const PORT = process.env.PORT || 3000;

// Dùng biến môi trường MONGO_URI, nếu không có thì fallback URI để FCC test
const MONGO_URI = process.env.MONGO_URI;
// Kết nối MongoDB
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch((err) => console.error('❌ Connection error:', err));

// // Test route
// app.get('/', (req, res) => {
//   res.send('Hello World! MongoDB connected.');
// });

// Start server
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

const personSchema = new mongoose.Schema({
  name: { type: String, required: true }, // name bắt buộc
  age: Number, // age kiểu Number
  favoriteFoods: [String], // favoriteFoods là mảng String
});

let Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
  const person = new Person({
    name: 'Ductt',
    age: 26,
    favoriteFoods: ['sushi', 'ramen'],
  });

  person.save(function (err, data) {
    if (err) return done(err);
    done(null, data);
  });
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, people) => {
    if (err) return done(err);
    done(null, people);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, peopleFound) => {
    if (err) return done(err);
    return done(null, peopleFound);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, personFound) => {
    if (err) return done(err);
    return done(null, personFound);
  });
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (err, personFound) => {
    if (err) return done(err);
    return done(null, personFound);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = 'hamburger';
  Person.findById(personId, (err, personFound) => {
    if (err) return done(err);
    if (!personFound) return done(new Error('Person not found'));
    personFound.favoriteFoods.push(foodToAdd);
    personFound.save((err, updatedPerson) => {
      if (err) return done(err);
      return done(null, updatedPerson);
    });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate(
    { name: personName },
    { age: ageToSet },
    { new: true },
    (err, updatedPerson) => {
      if (err) return done(err);
      return done(null, updatedPerson);
    }
  );
};

const removeById = (personId, done) => {
  Person.findByIdAndDelete(personId, (err, removedPeron) => {
    if (err) return done(err);
    return done(null, removedPeron);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = 'Mary';
  Person.remove({ name: nameToRemove }, (err, result) => {
    if (err) return done(err);
    return done(null, result);
  });
};

const queryChain = (done) => {
  const foodToSearch = 'burrito';
  Person.find({ favoriteFoods: foodToSearch })
    .sort({ name: 1 }) //inceased sort
    .limit(2) // limit 2 person
    .select('-age') //hide field age
    .exec((err, data) => {
      if (err) return done(err);
      return done(null, data);
    });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
