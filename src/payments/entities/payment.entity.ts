import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Optional } from "@nestjs/common";
import { IsOptional, IsString } from "class-validator";

@Entity('payments')
@Unique(['orderId']) 
export class Payment {
    @ApiProperty({
        description: 'ID unico del pago',
        example: 'a12e4567-e89b-12d3-a456-426614174abc',
    })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({
        description: 'ID de la orden asociada al pago',
        example: '34e4567-e89b-12d3-a456-426614174def',
    })
    @Column({type: 'uuid'})
    orderId: string;

    @ApiProperty({
        description: 'ID del usuario que realiza el pago',
        example: 'c56e4567-e89b-12d3-a456-426614174ghi',
    })
    @Column({type: 'uuid'})
    userId: string;

    @ApiProperty({
        description: 'Monto del pago',
        example: 100.50,
    })
    @Column({type: 'decimal', precision: 10, scale: 2})
    amount: number;

    @ApiProperty({
        description: 'Método de pago utilizado',
        example: 'Tarjeta',
    })
    @Column({length: 50})
    paymentMethod: string;

    @ApiProperty({
        description: 'Estado del pago',
        example: 'PAID',
    })
    @Column({
        type: 'enum',
        enum: ['PENDIENTE', 'PAGADO', 'FALLO'],
        default: 'PENDIENTE'
    })
    status: string;

    
    @ApiProperty({
        description: 'ID de la transacción asociada al pago',
        example: 'tx_1234567890',
    })
    @Column({length: 100, nullable: true})
    transactionId: string;


    @ApiProperty({ 
        example: '4111111111111111', 
        required: false 
    })
    @IsOptional()
    @IsString()
    cardNumber? : string


    @ApiProperty({
        description: 'Fecha de creación del pago',
        example: '2023-10-01T12:00:00Z',
    })  
    @CreateDateColumn()
    createdAt: Date;

    @ApiProperty({
        description: 'Fecha de actualización del pago',
        example: '2023-10-01T12:00:00Z',
    })
    @UpdateDateColumn()
    updatedAt: Date;
}