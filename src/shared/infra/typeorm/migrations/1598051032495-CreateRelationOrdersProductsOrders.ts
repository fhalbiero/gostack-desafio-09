import {MigrationInterface, QueryRunner, TableForeignKey} from "typeorm";

export default class CreateRelationOrdersProductsOrders1598051032495 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createForeignKey(
          'orders_products',
          new TableForeignKey({
            name: 'ordersProductsOrder',
            columnNames: ['order_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'orders',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
          })
      )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('orders_products','ordersProductsOrder')
    }

}
