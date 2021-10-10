import { IBaseInterface } from '../../common/interfaces/IBaseInterface';
import { TRole } from '../types/TRole';

export interface IAccount extends IBaseInterface {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: TRole;
}
