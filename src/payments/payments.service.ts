import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { Repository } from 'typeorm';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentStatusDto } from './dto/update-payment-status.dto';

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

    async updateStatus(id: string, updateStatusDto: UpdatePaymentStatusDto): Promise<Payment> {
        const payment = await this.findOne(id);
        if (!payment) {
            throw new NotFoundException(`Pago con ID ${id} no encontrado`);
        }
        payment.status = updateStatusDto.status;
        return await this.paymentsRepository.save(payment);
    }

    async remove(id: string): Promise<void> {
        const result = await this.paymentsRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Pago con ID ${id} no encontrado`);
        }
        
    }
}
