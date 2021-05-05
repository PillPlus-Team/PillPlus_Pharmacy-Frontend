import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import { LoginPage, ForgotPasswordPage, HomePage, ProfilePage, DispensePage, StatementPage, ManagePillStorehousePage } from './pages';

import io from 'socket.io-client';
import { SOCKET_URL } from './config';


const socket = io(SOCKET_URL);

const App = () => {
    const user = useSelector((state) => state.user);

    useEffect(() => {
        socket.emit('join', 'SelectPillStore_Room');
        console.log('join -> SelectPillStore_Room :', socket.id);

        socket.emit('room', 'SelectPillStore_Room');
        console.log('knock SelectPillStore_Room!');

        socket.emit('leave', 'SelectPillStore_Room');
        console.log('leave -> SelectPillStore_Room :', socket.id);
    }, [user]);

    return (
        <BrowserRouter>
            {user && (
                <Switch>
                    <Route exact path="/home" component={HomePage} />

                    <Route exact path="/profile" component={ProfilePage} />

                    <Route exact path="/dispense">
                        <DispensePage socket={socket} />
                    </Route>
                    <Route exact path="/statement" component={StatementPage} />

                    <Route exact path="/manage-pillstorehouse" component={ManagePillStorehousePage} />

                    <Redirect to="/home" />
                </Switch>
            )}

            {!user && (
                <Switch>
                    <Route exact path="/login" component={LoginPage} />
                    <Route exact path="/forgot-password" component={ForgotPasswordPage} />
                    <Redirect to="/login" />
                </Switch>
            )}
        </BrowserRouter>
    );
};

export default App;
