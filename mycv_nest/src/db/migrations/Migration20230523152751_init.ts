import { Migration } from '@mikro-orm/migrations';

export class Migration20230523152751_init extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table `user` (`id` int unsigned not null auto_increment primary key, `email` varchar(50) not null, `password` varchar(255) not null,`created_at` timestamp not null default current_timestamp, `updated_at` timestamp not null default current_timestamp on update current_timestamp) default character set utf8mb4 engine = InnoDB;'
    );
    this.addSql('alter table `user` add unique `user_email_unique`(`email`);');
  }

  async down(): Promise<void> {
    this.addSql('drop table `user`');
  }
}
