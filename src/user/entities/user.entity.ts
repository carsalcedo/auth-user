import { hash } from "bcrypt";
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 255})
    name: string;

    @Column({name: 'last_name', type: 'varchar', length: 255})
    lastName: string;

    @Column({type: 'varchar', length: 255, nullable: false})
    email: string;

    @Column({type: 'varchar', length: 255, nullable: false, select: false}) //select: false impide que se muestre la contraseña en la consulta
    password: string;

    @Column({type: 'bool', default: true})
    status: boolean;

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword(){
        if (!this.password){
            return;
        }
        this.password = await hash(this.password, 10)
    }
}
