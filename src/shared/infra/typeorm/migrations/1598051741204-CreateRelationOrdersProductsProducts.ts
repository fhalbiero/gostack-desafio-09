import {MigrationInterface, QueryRunner, TableForeignKey} from "typeorm";

export default class CreateRelationOrdersProductsProducts1598051741204 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createForeignKey(
        'orders_products',
        new TableForeignKey({
          name: 'ordersProductsProduct',
          columnNames: ['product_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'products',
          onDelete: 'SET NULL',
          onUpdate: 'CASCADE'
        })
      )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropForeignKey('orders_products', 'ordersProductsProduct');
    }

}
