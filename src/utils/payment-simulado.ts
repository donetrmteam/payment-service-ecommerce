import { v4 as uuidv4 } from 'uuid';

export interface SimulatedPaymentResult {
  success: boolean;
  message: string;
  transactionId?: string;
}

export async function simulatePayment(cardNumber: string): Promise<SimulatedPaymentResult> {
  
  await new Promise(resolve => setTimeout(resolve, 2000));

  const isValidCard = cardNumber.startsWith('4');
  const isApproved = true;

  if (!isValidCard) {
    return {
      success: false,
      message: 'Tarjeta no válida. Solo se aceptan Visa.',
    };
  }

  if (!isApproved) {
    return {
      success: false,
      message: 'Pago rechazado por el banco.',
    };
  }

  return {
    success: true,
    message: 'Pago procesado exitosamente.',
    transactionId: `${uuidv4()}`,
  };
}
