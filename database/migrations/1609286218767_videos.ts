import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Videos extends BaseSchema {
  protected tableName = 'videos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('titulo').notNullable()
      table.string('nome').nullable()
      table.string('transcricao', 5000).nullable()
      table.string('imagem').nullable()
      table.time('duracao').nullable()
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
