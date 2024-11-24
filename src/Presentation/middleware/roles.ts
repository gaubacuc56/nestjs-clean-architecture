
import { SetMetadata } from '@nestjs/common';

import { Role } from '@Domain/common/enum/user';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
