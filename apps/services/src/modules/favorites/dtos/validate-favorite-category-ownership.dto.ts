import { FavoriteCategoryObject, UserObject } from '@scheduler/shared';

export class ValidateCategoryOwnershipData {
  categoryId: string;
  currentUser: UserObject;
  action: 'update' | 'delete';
}

export class ValidateCategoryOwnershipResult {
  category: FavoriteCategoryObject;
}
