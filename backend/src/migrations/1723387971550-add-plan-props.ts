import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddPlanProps1723387971550 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'plan',
      new TableColumn({
        name: 'name',
        type: 'varchar',
        length: '255',
        isNullable: true,
      }),
    );
    await queryRunner.addColumn(
      'plan',
      new TableColumn({
        name: 'output',
        type: 'varchar',
        length: '65535',
        isNullable: false,
      }),
    );
    await queryRunner.addColumn(
      'plan',
      new TableColumn({
        name: 'input',
        type: 'varchar',
        length: '65535',
        isNullable: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('plan', 'name');
    await queryRunner.dropColumn('plan', 'output');
    await queryRunner.dropColumn('plan', 'input');
  }
}
