const { v4: uuidv4 } = require('uuid')


const trasaction_type = {
    FUND: 'FUND',
    TRANSFER:'TRANSFER',
    WITHDRAWAL:"WITHDRAWAL"
   
  };

  
  const Payment_Method = {
    TRANSFER: 'TRANSFER',
    DEPOSIT:"DEPOSIT",
    WITHDRAW:"WITHDRAW"
  };


/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.table("transactions",(table)=>{
        
        table.enum("payment_method", Object.values(Payment_Method)).notNullable()
        table.uuid("withdrawalID").defaultTo(uuidv4()).notNullable()
        table.enum("trasaction_type", Object.values(trasaction_type)).notNullable()
    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {

  
};
