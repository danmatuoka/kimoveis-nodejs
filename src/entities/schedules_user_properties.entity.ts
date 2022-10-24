import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from "typeorm"
import { Property } from "./properties.entities"
import { User } from "./user.entity"


@Entity('schedules_user_properties')
class Schedule_user_propertie {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({type: "date"})
    date: Date

    @Column({type: "time"})
    hour: Date

    @ManyToOne(() => Property) @JoinColumn()
    properties: Property;
  
    @ManyToOne(() => User, { eager: true }) @JoinColumn()
    user: User;

}

export { Schedule_user_propertie }
