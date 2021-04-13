import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Author } from '../../authors/entities/author.entity';
import { Publisher } from '../../publishers/entities/publisher.entity';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({
    type: 'text',
  })
  description: string;

  @Column({
    nullable: true,
  })
  rating: number;

  @ManyToOne(() => Author, (author) => author.books, {
    nullable: true,
    eager: true,
  })
  @JoinColumn()
  author: Author;

  @Column({
    nullable: true,
  })
  genre: string;

  @ManyToOne(() => Publisher, (publisher) => publisher.books, {
    nullable: true,
    eager: true,
  })
  @JoinColumn()
  publisher: Publisher;

  @Column({
    type: 'datetime',
    default: 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
}
