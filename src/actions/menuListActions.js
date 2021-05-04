import { MENULIST_FETCH } from './types';

import { menuList } from './ultis';

export const menuListFetch = () => {
    return {
        type: MENULIST_FETCH,
        menuList: menuList,
    };
};
