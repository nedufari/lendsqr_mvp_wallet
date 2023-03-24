// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'mysql',
    connection: {
        password:'@nedupoetry98654449' ,
        database:'mvpwallet',
        port:3306,
        host:"127.0.0.1",
        user:"root"
    }
  },

  // staging: {
  //   client: 'postgresql',
  //   connection: {
  //     database: 'my_db',
  //     user:     'username',
  //     password: 'password'
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations'
  //   }
  // },

  production: {
    client: 'mysql',
    connection: {
      database: 'railway',
      user:     'root',
      password: '1C5OoYRLYql1GcM1P7Pm',
      port:6887,
      uri:"mysql://root:1C5OoYRLYql1GcM1P7Pm@containers-us-west-159.railway.app:6887/railway"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
