
const Roles = {
    COMPANY: 'COMPANY',
    MASTER: 'MASTER',
    
    
  };

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.table("company",(table)=>{
        table.dropColumn("user_role")
        
    })
 
};;

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.dropColumn("user_role")
    
  
};
