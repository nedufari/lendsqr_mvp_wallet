// const {Currency, Payment_Method}= require ("../src/transactions/transaction.interface")
const { v4: uuidv4 } = require('uuid')


const Currency = {
    NGR: 'NGR',
    USD: 'USD',
    EUR: 'EUR',
    GBP: 'GBP'
  };
  
  const Payment_Method = {
    TRANSFER: 'TRANSFER',
    CARD: 'CARD',
    USSD: 'USSD',
    DEPOSIT:"DEPOSIT"
  };


/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("wallet",(table)=>{
        table.uuid("wallet_address").primary().defaultTo(uuidv4())
        table.integer("balance").notNullable().defaultTo(0)
        table.enum("currency",Object.values(Currency)).defaultTo(Currency.NGR)
        table.enum("payment_method", Object.values(Payment_Method)).defaultTo(Payment_Method.TRANSFER)
        table.timestamp("createdAt").defaultTo(knex.fn.now())
        table.uuid("owner_id").defaultTo(uuidv4())
        table.foreign("owner_id").references("company.companyID")
  
});
}


/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("wallet")
  
}

