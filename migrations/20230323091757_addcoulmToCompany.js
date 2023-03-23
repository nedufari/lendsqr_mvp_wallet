
const Roles = {
    MASTER: 'Master',
    COMPANY: 'company',
    
  };

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    return await knex.schema.alterTable("company", (table)=>{
        table.enum("user_role",Object.values(Roles)).notNullable()
        table.timestamp("createdAt").defaultTo(knex.fn.now())
    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
