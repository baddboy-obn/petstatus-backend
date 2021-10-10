import { IBaseInterface } from '../../common/interfaces/IBaseInterface';

export interface IAuth extends IBaseInterface {
  secretKey: string;
  publicKey: string;
  secretExpiredAt?: Date;
}
