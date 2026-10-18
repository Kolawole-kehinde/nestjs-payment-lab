export interface PrividerInterface {
    createPayment (amount: number): Promise<{
        refrence: string;
        status: string;
        amount: number

    }>
}