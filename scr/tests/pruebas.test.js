
const request = require('supertest');
const express = require('express');
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const apiRouter = require('../routes/citas'); 
const uri = "mongodb+srv://223208:Jaguares34.1@cluster0.swir3km.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


beforeAll(async () => {
  await client.connect();
  await client.db("admin").command({ ping: 1 });
  app.use(express.json());
  app.use('/api', apiRouter(client)); 
});


afterAll(async () => {
  await client.close();
});

describe('CRUD Tests', () => {
  let newItemId;

  it('Debería crear un nuevo elemento', async () => {
    const newItemData = {
        IDCliente: '652605357c5aa90ffac5ec91',
        FechaCita: new Date('2023-10-10T12:00:00Z'),
        EstatusCita: 'Programada',
        NotasCitas: 'Notas sobre la cita',
       };
    const response = await request(app)
      .post('/api')
      .send(newItemData);

    expect(response.statusCode).toBe(201);
    expect(response.body.name).toBe(newItemData.name);
    newItemId = response.body._id;
  });

  it('Debería obtener todos los elementos', async () => {
    const response = await request(app)
      .get('/api');

    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('Debería obtener un elemento por ID', async () => {
    const response = await request(app)
      .get(`/api/12`);

    expect(response.statusCode).toBe(200);
  });

  it('Debería actualizar un elemento', async () => {
    const updatedItemData = { name: 'Elemento Actualizado' };
    const response = await request(app)
      .put(`/api/${newItemId}`)
      .send(updatedItemData);

    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe(updatedItemData.name);
  });

  it('Debería eliminar un elemento', async () => {
    const response = await request(app)
      .delete(`/api/${newItemId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('El objeto fue eliminado');
  });

  it('Debería devolver 404 al intentar obtener un elemento eliminado', async () => {
    const response = await request(app)
      .get(`/api/${newItemId}`);

    expect(response.statusCode).toBe(404);
  });
});
