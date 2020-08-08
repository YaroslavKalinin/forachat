import React from 'react';
import Login from './LoginComponent';
import Signup from './SignupComponent';
import Room from './RoomComponent';
import Error from './ErrorComponent';
import {
    Switch,
    Route,
    Link
} from "react-router-dom";


function App() {
    return(
        <Switch>
            <Route exact path={["/", "/:id"]} children={<Room/>}/>
            <Route path="/login">
                <Login/>
            </Route>
            <Route path="/signup">
                <Signup/>
            </Route>
            <Route>
                <Error message="404, page not found..."/>
            </Route>
        </Switch>
    )
}

export default App;