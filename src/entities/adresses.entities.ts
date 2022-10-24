import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"


@Entity('addresses')
class Address {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({length: 60})
    district: string

    @Column({length: 120})
    zipCode: string

    @Column({length: 120})
    number: string

    @Column()
    city: string

    @Column()
    state: string
}

export { Address }