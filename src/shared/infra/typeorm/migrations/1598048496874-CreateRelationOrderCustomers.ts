import {MigrationInterface, QueryRunner, TableForeignKey} from "typeorm";

export default class CreateRelationOrderCustomers1598048496874 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createForeignKey(
        'orders',
        new TableForeignKey({
          name: 'ordersCustomer',
          columnNames: ['customer_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'customers',
          onDelete: 'SET NULL',
          onUpdate: 'CASCADE'
        })
      )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropForeignKey('orders','ordersCustomer');
    }

}
