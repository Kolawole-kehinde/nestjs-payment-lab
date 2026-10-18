export interface PaymentProvider  {
    createPayment (amount: number): Promise<{
        reference: string;
        status: string;
        amount: number

    }>
}