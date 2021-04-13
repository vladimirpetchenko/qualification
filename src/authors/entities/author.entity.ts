import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Book } from '../../books/entities/book.entity';

@Entity()
export class Author {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  midname: string;

  @Column()
  lastname: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  bio: string;

  @OneToMany(() => Book, (book) => book.author)
  books: Book[];
}
