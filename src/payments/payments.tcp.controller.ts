import { Controller } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { Payment } from './entities/payment.entity';
import { UpdatePaymentStatusDto } from './dto/update-payment-status.dto';

@Controller('payments')
export class PaymentsController {
    constructor(private readonly paymentsService: PaymentsService) {}

    @MessagePattern({ cmd: 'create_payment' })
    async create(@Payload() data: { createPaymentDto: CreatePaymentDto }): Promise<Payment> {
        return this.paymentsService.create(data.createPaymentDto);
    }

    @MessagePattern({ cmd: 'find_all_payments' })
    async findAll(): Promise<Payment[]> {
        return this.paymentsService.findAll();
    }

    @MessagePattern({ cmd: 'find_payment_by_id' })
    async findOne(@Payload() data: { id: string }): Promise<Payment> {
        return  this.paymentsService.findOne(data.id);
    }

    @MessagePattern({ cmd: 'find_payments_by_order_id' })
    async findByOrderId(@Payload() data: { orderId: string }): Promise<Payment[]> {
        return this.paymentsService.findByOrderId(data.orderId);
    }

    @MessagePattern({ cmd: 'find_payments_by_user_id' })
    async findByUserId(@Payload() data: { userId: string }): Promise<Payment[]> {
        return this.paymentsService.findByUserId(data.userId);
    }

    @MessagePattern({ cmd: 'update_payment_status' })
    async updateStatus(@Payload() data: { id: string; status: string }): Promise<Payment> {
        return this.paymentsService.updateStatus(data.id, data.status);
    }

    @MessagePattern({ cmd: 'remove_payment' })
    async remove(@Payload() data: { id: string }): Promise<{succes: boolean}> {
        await this.paymentsService.remove(data.id);
        return { succes: true}
    }

}

