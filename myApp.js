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

// 2. Tạo Model từ schema
let Person = mongoose.model('Person', personSchema);

// let Person;

// const createAndSavePerson = (done) => {
//   const john = new Person({
//     name: 'John Doe',
//     age: 30,
//     favoriteFoods: ['pizza', 'pasta'],
//   });

//   john.save((err, data) => {
//     if (err) return done(err);
//     done(null, data);
//   });
//   // done(null /*, data*/);
// };

const createAndSavePerson = (done) => {
  // Tạo một document instance từ model Person
  const person = new Person({
    name: 'Jane Doe', // kiểu String, bắt buộc
    age: 25, // kiểu Number
    favoriteFoods: ['sushi', 'ramen'], // mảng String
  });

  // Lưu document vào database
  person.save(function (err, data) {
    if (err) return done(err); // nếu lỗi thì trả về err
    done(null, data); // nếu thành công, trả về document đã lưu
  });
};

// // Gọi hàm test
createAndSavePerson((err, data) => {
  if (err) console.error(err);
  else console.log('Saved person:', data);

  // Ngắt kết nối sau khi xong
  mongoose.connection.close();
});

const createManyPeople = (arrayOfPeople, done) => {
  done(null /*, data*/);
};

const findPeopleByName = (personName, done) => {
  done(null /*, data*/);
};

const findOneByFood = (food, done) => {
  done(null /*, data*/);
};

const findPersonById = (personId, done) => {
  done(null /*, data*/);
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = 'hamburger';

  done(null /*, data*/);
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  done(null /*, data*/);
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = 'Mary';

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = 'burrito';

  done(null /*, data*/);
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
