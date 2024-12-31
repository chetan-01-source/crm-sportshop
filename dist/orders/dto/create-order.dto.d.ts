export declare class CreateOrderDto {
    customerId: string;
    items: {
        itemId: string;
        quantity: number;
    }[];
    totalAmount: number;
    status: string;
}
