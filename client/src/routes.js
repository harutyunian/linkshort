import React from 'react'
import {Switch, Route, Redirect} from "react-router-dom";
import LinksPage from "./pages/LinksPage";
import CreatePage from "./pages/CreatePage";
import DetailPage from "./pages/DetailPage";
import AuthPages from "./pages/AuthPages";


export const useRoutes = isAuth => {
    if (isAuth) {
        return (
            <Switch>
                <Route exact path='/links'>
                    <LinksPage/>
                </Route>
                <Route exact path='/create'>
                    <CreatePage/>
                </Route>
                <Route  path='/details/:id'>
                    <DetailPage/>
                </Route>
                <Redirect exact to='/create'/>
            </Switch>
        )
    }
    return (
        <Switch>
            <Route  path='/'>
                <AuthPages />
            </Route>
            <Redirect to='/'/>
        </Switch>
    )
}