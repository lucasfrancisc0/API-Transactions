import { it, beforeAll, afterAll, expect, describe, beforeEach } from 'vitest'
import { execSync } from 'node:child_process'
import request from 'supertest'

import { app } from '../src/app'

describe('Transactions Routes', () => {

  beforeAll(async () => {
    await app.ready()
  
  })
  
  afterAll(async () => {
    await app.close()
  })

  beforeEach(async () => {
    execSync('npm run knex migrate:rollback --all')
    execSync('npm run knex migrate:latest')
  })
  
  it('should be able to create a new transaction', async () => {
    await request(app.server)
    .post('/transactions')
    .send({
      title: "Test",
      amount: 5000,
      type: 'credit',
    })
    .expect(201)
  })

  it('should be able to list all transactions', async () => {
    const createTransactionResponse = await request(app.server)
    .post('/transactions')
    .send({
      title: "Test",
      amount: 5000,
      type: 'credit',
    })

    const cookies = createTransactionResponse.get('Set-Cookie')

    if(!cookies){
      throw new Error('Cookies undefined')
    }

    const listTransactionsResponse = await request(app.server)
    .get('/transactions')
    .set('Cookie', cookies)
    .expect(200)

    expect(listTransactionsResponse.body.transactions).toEqual([
      expect.objectContaining({
        title: 'Test',
        amount: 5000,
      })
    ])

  })

  it('should be able to get a specific transaction', async () => {
    const createTransactionResponse = await request(app.server)
    .post('/transactions')
    .send({
      title: "Test",
      amount: 5000,
      type: 'credit',
    })

    const cookies = createTransactionResponse.get('Set-Cookie')

    if(!cookies){
      throw new Error('Cookies undefined')
    }

    const listTransactionsResponse = await request(app.server)
    .get('/transactions')
    .set('Cookie', cookies)

    const transactionId = listTransactionsResponse.body.transactions[0].id

    const getTransactionResponse = await request(app.server)
      .get(`/transactions/${transactionId}`)
      .set('Cookie', cookies)

    expect(getTransactionResponse.body.transaction).toEqual(
      expect.objectContaining({
        title: 'Test',
        amount: 5000
      })
    )

  })

  it('should be able to get a summary', async () => {
    const createTransactionResponse = await request(app.server)
    .post('/transactions')
    .send({
      title: "Test Credit",
      amount: 5000,
      type: 'credit',
    })

    const cookies = createTransactionResponse.get('Set-Cookie')

    if(!cookies){
      throw new Error('Cookies undefined')
    }


    await request(app.server)
    .post('/transactions')
    .set('Cookie', cookies)
    .send({
      title: "Test debit",
      amount: 2000,
      type: 'debit',
    })

    const listTransactionsResponse = await request(app.server)
    .get('/transactions/summary')
    .set('Cookie', cookies)
    .expect(200)

    expect(listTransactionsResponse.body.summary).toEqual({
      amount: 3000,
    })

  })

})