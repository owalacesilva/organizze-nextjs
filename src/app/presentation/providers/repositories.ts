import { Provider } from '@angular/core';
import {
  TransactionFirebaseRepository,
  CategoryFirebaseRepository,
} from '@org/data';

export default (): Provider[] => {
  return [
    {
      provide: 'TRANSACTION_REPOSITORY',
      useClass: TransactionFirebaseRepository,
    },
    {
      provide: 'CATEGORY_REPOSITORY',
      useClass: CategoryFirebaseRepository,
    },
  ];
};
