import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './schema/customer.schema';
export declare class CustomerController {
    private readonly customerService;
    constructor(customerService: CustomerService);
    getallCustomer(): Promise<(import("mongoose").Document<unknown, {}, Customer> & Customer & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    getCustomer(id: string): Promise<Customer>;
    create(createCustomerDto: CreateCustomerDto): Promise<Customer>;
    searchCustomer(name: string): Promise<Customer[]>;
    update(id: string, updateCustomerDto: UpdateCustomerDto): Promise<Customer>;
    delete(id: string): Promise<Customer>;
}
