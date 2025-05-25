import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { Repository } from 'typeorm';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { simulatePayment } from 'src/utils/payment-simulado';

@Injectable()
export class PaymentsService {
    constructor(
        @InjectRepository(Payment)
        private paymentsRepository: Repository<Payment>,
    ) {}

    async create(createPaymentDto: CreatePaymentDto): Promise<Payment> {
        try {
            const payment = this.paymentsRepository.create(createPaymentDto);
            return await this.paymentsRepository.save(payment);
        } catch (error) {
            throw new InternalServerErrorException('Error al crear el pago');
        }
    }

    async findAll(): Promise<Payment[]> {
       return await this.paymentsRepository.find(); 
    }

    async findOne(id: string): Promise<Payment> {
      const payment = await this.paymentsRepository.findOne({ where: { id } });
        if (!payment) {
            throw new InternalServerErrorException('Pago no encontrado');
        }
        return payment;
  } 

    async findByOrderId(orderId: string): Promise<Payment[]> {
        return await this.paymentsRepository.find({ where: { orderId } });
    }

    async findByUserId(userId: string): Promise<Payment[]> {
        return await this.paymentsRepository.find({ where: { userId } });
    }

    async updateStatus(orderId: string, status: string, paymentMethod: string, cardNumber: string): Promise<Payment> {
        const payment = await this.paymentsRepository.findOne({ where: { orderId }})
        if (!payment) {
            throw new NotFoundException(`Pago con ID ${orderId} no encontrado`);
        }

        const resultPayment = await simulatePayment(cardNumber);

        if(!resultPayment.success) {
            throw new BadRequestException(resultPayment.message)
        }

        payment.status = status;
        payment.paymentMethod = paymentMethod;
        payment.transactionId = resultPayment.transactionId;
        return await this.paymentsRepository.save(payment);
    }

    async removeByOrderId(orderId: string): Promise<void> {
        const result = await this.paymentsRepository.findOne({ where: { orderId }})
        if (!result) {
            throw new NotFoundException(`Pago con ID ${orderId} no encontrado`);
        }
        await this.paymentsRepository.remove(result)
        
    }
}
