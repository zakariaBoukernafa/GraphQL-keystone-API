import { permissionsList } from './schemas/fields';
import { ListAccessArgs } from './types';

export function isSignedIn({ session }: ListAccessArgs) {
  return !!session;
}

// permissions to check criterias
const generatePermissions = Object.fromEntries(
  permissionsList.map((permission) => [
    permission,
    function ({ session }: ListAccessArgs) {
      return !!session?.data.role?.[permission];
    },
  ])
);
export const permissions = {
  ...generatePermissions,
};

// rule based permissions
// rules can return a boolean or filter wihch product they can crud
export const rules = {
  canManageProducts({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false;
    }
    // do they have permission ?
    if (permissions.canManageProducts({ session })) {
      return true;
    }
    // do they own it ?
    return { user: { id: session.itemId } };
  },
  canOrder({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false;
    }
    // do they have permission ?
    if (permissions.canManageCart({ session })) {
      return true;
    }
    // do they own it ?
    return { user: { id: session.itemId } };
  },

  canManageOrderItems({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false;
    }
    // do they have permission ?
    if (permissions.canManageCart({ session })) {
      return true;
    }
    // do they own it ?
    return { order: { user: { id: session.itemId } } };
  },
  canReadProducts({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false;
    }
    // they can see everyproduct
    if (permissions.canManageProducts({ session })) {
      return true;
    }
    // the user can only see the available products
    return { status: 'AVAILABLE' };
  },

  canManageUsers({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false;
    }
    // do they have permission ?
    if (permissions.canManageUsers({ session })) {
      return true;
    }
    // they can only update themselves
    return { id: session.itemId };
  },
};
