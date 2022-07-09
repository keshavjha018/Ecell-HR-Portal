import React from 'react';
import {Route, Navigate, Outlet} from "react-router-dom";

function Protection({isAuth, component: Component, ...rest}) {
    
    // let auth = false;
    // return auth=true ? <Outlet /> : <Navigate to="/login" />

    return (
        <Route
            {...rest}
            render = {(props)=>{
                if(isAuth){
                    return <Component/>;
                }
                else{
                    return(
                        <Navigate to={{pathname: "/login"}} />
                    );
                }
            }}
        />
    );
}

export default Protection;