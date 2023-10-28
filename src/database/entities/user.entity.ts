import { Entity,PrimaryGeneratedColumn,Column } from "typeorm";
import { CreatedUpdatedModel } from "./common/created-updated.model";

@Entity('user')
export class UserEntity extends CreatedUpdatedModel {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "text", nullable: false })
  name: string;

  @Column({ type: "int", nullable: false })
  age: number;

  @Column({ type: "boolean", nullable: false })
  status: boolean;

  @Column({ type: "text", nullable: false, unique: true })
  email: string
}