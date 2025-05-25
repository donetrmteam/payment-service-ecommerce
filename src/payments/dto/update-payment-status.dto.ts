import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsOptional, IsString, IsUUID, Length, Matches, MaxLength } from "class-validator";

export class UpdatePaymentStatusDto {
  @ApiProperty({
          description: 'ID de la orden relacionada',
          example: '34e4567-e89b-12d3-a456-426614174def',
      })
      @IsUUID('4', { message: 'orderId debe ser un UUID válido' })
      orderId: string;

  @ApiProperty({
    description: 'Nuevo estado de pago',
    example: 'PAGADO',
    enum: ['PENDIENTE', 'PAGADO', 'FALLO'],
  })
  @IsIn(['PENDIENTE', 'PAGADO', 'FALLO'], {
    message: 'El estado debe ser uno de los siguientes: PENDIENTE, PAGADO, FALLO',
  })
  status: string;

   @ApiProperty({
        description: 'Método de pago utilizado',
        example: 'Tarjeta',
    })
    @IsString({ message: 'El método de pago debe ser una cadena de texto' })
    @MaxLength(50, { message: 'El metodo de pago no puede exceder los 50 caracteres' })
    paymentMethod: string;

    @ApiProperty({
        description: 'Numero de tarjeta',
        example: '4215361897451236',
    })
    @IsString({ message: 'El número de tarjeta es una cadena' })
    @MaxLength(16, { message: 'El número de tarjeta no puede exceder los 16 caracteres' })
    cardNumber: string;

}
