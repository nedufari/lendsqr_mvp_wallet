const { table } = require("console");
const { v4: uuidv4 } = require('uuid')


const trasaction_type = {
    FUND: 'FUND',
    TRANSFER:'TRANSFER'
   
  };

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
exports.up = async function(knex) {
    return await knex.schema.createTable("transactions",(table)=>{
        table.increments("id").primary()
        // table.uuid("wallet_address").defaultTo(uuidv4()).notNullable()
        table.integer("amount").notNullable().notNullable()
        table.enum("currency",Object.values(Currency)).notNullable()
        table.uuid("senderUUID").defaultTo(uuidv4()).notNullable()
        table.enum("trasaction_type", Object.values(trasaction_type)).notNullable()
        table.uuid("recieverID").defaultTo(uuidv4()).notNullable()
        table.enum("payment_method", Object.values(Payment_Method)).notNullable()
        table.timestamp("transaction_time").defaultTo(knex.fn.now())
    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
