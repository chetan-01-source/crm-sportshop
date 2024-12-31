import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly userModel;
    private readonly jwtService;
    constructor(userModel: Model<any>, jwtService: JwtService);
    signup(username: string, password: string): Promise<any>;
    login(username: string, password: string): Promise<{
        access_token: string;
    }>;
}
