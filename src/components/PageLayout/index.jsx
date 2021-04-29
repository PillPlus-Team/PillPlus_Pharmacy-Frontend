import AccountCard from './AccountCard';
import PageTitle from './PageTitle';
import Sidebar from './Sidebar';

const PageLayout = ({ userInfo, menuList, pageTitle, children }) => {
    const havePageTitle = pageTitle !== undefined;

    return (
        <div className="flex flex-row w-full h-screen overflow-x-auto">
            <div className="flex justify-center w-96">
                <Sidebar menuList={menuList} />
            </div>
            <div className="flex flex-col w-full">
                <div className="flex flex-row justify-end items-center h-24 min-w-min">
                    <AccountCard
                        phamacy={userInfo.phamacy}
                        name={userInfo.name}
                        avatarUri={userInfo.avatarUri}
                        activatedStatus={userInfo.activated}
                    />
                </div>
                <div className="w-full h-full pt-8 pb-8 pl-16 pr-16 overflow-y-auto">
                    <div className="flex flex-col w-full h-full ">
                        {havePageTitle && <PageTitle title={pageTitle} />}
                        <div className={`w-full h-full ${havePageTitle ? 'mt-10' : ''}`}>{children}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PageLayout;
