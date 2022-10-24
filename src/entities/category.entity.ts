import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Property } from "./properties.entities";

@Entity("categories")
export class Category {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column()
  name: string

  @OneToMany(() => Property, (property) => property.category)
  properties: Property[];
}

export default Category