// process.env.NODE_ENV = "test";

const request = require('supertest');

const app = require('./app');

const inspiration = require('./mockDb');

beforeEach(function() {
  inspiration.length = 0;
  inspiration.push("hello", "there");
});

describe('GET /inspiration', function() {
  it("Gets the array of inspiration", async function() {
    const response = await request(app).get('/inspiration');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({"inspiration": ["hello", "there"]})
  });
});

describe('POST /inspiration', function() {
  it("Prepends a string to the server's inspiration array", async function() {
    let response = await request(app).get('/inspiration');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({"inspiration": ["hello", "there"]})

    const inspiration = "hi";
    response = await request(app)
      .post('/inspiration')
      .send({
        "inspiration": inspiration
      });
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ "inspiration": inspiration })

    response = await request(app).get('/inspiration');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({"inspiration": ["hi", "hello", "there"]})
  });

  it('Returns with a status 400 if request is not appropriate form', async function() {
    const inspiration = 5; // number, not a string
    response = await request(app)
      .post('/inspiration')
      .send({
        inspiration: inspiration,
      });
    expect(response.statusCode).toBe(400);
    expect(response.error.text).toEqual(
      'Expecting request body to be { "inspiration": /string/ }'
    );
  });
})