const app = require('../app');
const supertest = require('supertest');
const request = supertest(app);
const mongoose = require('mongoose');

//connect to test db
beforeAll(async() => {
    const url = 'mongodb://127.0.0.1/test_login';
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

it('Should authenticate user', async done => {
    //create user
    let res = await request.post('/signup')
    .send({
        username: 'test',
        password: '123'
    });
    expect(res.status).toBe(200);
    //login user
    res = await request.post('/login')
    .send({
        username: 'test',
        password: '123'
    });
    expect(res.status).toBe(200);
    done();
});

it('Should not authenticate user', async done => {
    //create user
    let res = await request.post('/signup')
    .send({
        username: 'test',
        password: '123'
    });
    expect(res.status).toBe(200);
    //Incorrect password
    res = await request.post('/login')
    .send({
        username: 'test',
        password: '12'
    });
    expect(res.status).toBe(401);
    done();
    //Incorrect username
    res = await request.post('/login')
    .send({
        username: 'tes',
        password: '123'
    });
    expect(res.status).toBe(401);
    done();
});