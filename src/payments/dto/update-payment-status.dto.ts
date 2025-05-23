import { ApiProperty } from '@nestjs/swagger';
import { IsIn } from 'class-validator';

export class UpdatePaymentStatusDto {
  @ApiProperty({
    description: 'Nuevo estado del pago',
    example: 'PAID',
    enum: ['PENDING', 'PAID', 'FAILED'],
  })
  @IsIn(['PENDING', 'PAID', 'FAILED'], {
    message: 'El estado debe ser uno de los siguientes: PENDING, PAID, FAILED',
  })
  status: string;
}
