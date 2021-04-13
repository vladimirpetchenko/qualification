import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Book } from '../../books/entities/book.entity';

@Entity()
export class Publisher {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @OneToMany(() => Book, (book) => book.publisher, {
    nullable: true,
  })
  books: Book[];
}
