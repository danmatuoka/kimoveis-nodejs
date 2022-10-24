import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, ManyToOne, OneToMany } from "typeorm"
import { Address } from "./adresses.entities"
import Category from "./category.entity"
import { Schedule_user_propertie } from "./schedules_user_properties.entity"


@Entity('properties')
class Property {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({default: false})
    sold: boolean

    @Column()
    value: number

    @Column()
    size: number

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToOne(() => Address, { eager: true }) @JoinColumn()
    address: Address

    @ManyToOne(() => Category)
    category: Category;

    @OneToMany(() => Schedule_user_propertie, (schedules) => schedules.properties, {eager: true})
    schedules: Schedule_user_propertie[];

}

export { Property }