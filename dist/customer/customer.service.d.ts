import { Model } from 'mongoose';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './schema/customer.schema';
export declare class CustomerService {
    private readonly customerModel;
    constructor(customerModel: Model<Customer>);
    create(createCustomerDto: CreateCustomerDto): Promise<Customer>;
    searchCustomerByName(name: string): Promise<Customer[]>;
    findById(id: string): Promise<Customer>;
    update(id: string, updateCustomerDto: UpdateCustomerDto): Promise<Customer>;
    delete(id: string): Promise<Customer>;
}
