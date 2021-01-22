import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Placas extends BaseSchema {
  protected tableName = 'placas'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('nome').nullable()
      table.string('mac').notNullable()
      table.string('numero').nullable()
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
