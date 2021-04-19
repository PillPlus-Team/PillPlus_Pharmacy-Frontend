import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { PageLayout } from '../../components';

import ProfileDisplay from './components/ProfileDisplay';
import ProfileEditor from './components/ProfileEditor';

import { pillStoresFetch } from '../../actions/pillStoresAction';

const ProfilePage = () => {
    const dispatch = useDispatch();

    const user = useSelector((state) => state.user);
    const menuList = useSelector((state) => state.menuList);
    const pillStores = useSelector((state) => state.pillStores);

    useEffect(() => {
        dispatch(pillStoresFetch());
    }, []);

    return (
        <PageLayout pageTitle="บัญชีผู้ใช้" userInfo={user} menuList={menuList}>
            {!user.editing && <ProfileDisplay userInfo={user} />}
            {user.editing && <ProfileEditor userInfo={user} pillStores={pillStores.list} />}
        </PageLayout>
    );
};
export default ProfilePage;
