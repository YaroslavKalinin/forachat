const app = require('../app');
const supertest = require('supertest');
const request = supertest(app);
const mongoose = require('mongoose');

//connect to test db
beforeAll(async() => {
    const url = 'mongodb://127.0.0.1/chat_test';
    await mongoose.connect(url, { useNewUrlParser: true });
});

async function removeAllCollections () {
  const collections = Object.keys(mongoose.connection.collections)
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName]
    await collection.deleteMany()
  }
}
//clear db after each test
afterEach(async () => {
  await removeAllCollections()
})

it('Should create user to db', async done => {
    //create user
    let res = await request.post('/signup')
    .send({
        username: 'test',
        password: '123'
    });
    expect(res.status).toBe(200);
    //no user dublications
    res = await request.post('/signup')
    .send({
        username: 'test',
        password: '123'
    });
    expect(res.status).toBe(409);

    done();
});

it('Should check user validation', async done => {
    //create invalid username
    let res = await request.post('/signup')
    .send({
        username: 'te',
        password: '123'
    });
    expect(res.status).toBe(409);
    expect(res.body.message).toBe('User validation failed');
    done();
    //create invalid password
    res = await request.post('/signup')
    .send({
        username: 'test',
        password: '12'
    });
    expect(res.status).toBe(409);
    expect(res.body.message).toBe('User validation failed');
    done();
})