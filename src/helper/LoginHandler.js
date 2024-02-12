import { useEffect } from "react";
import { AuthData } from "../App";
import { fetchCurrUserAttributes } from "./utility";

const LoginHandler = () => {

    const {updateUser} = AuthData();

    useEffect(() => {
        fetchCurrUserAttributes(updateUser);
    }, []);


    return (
        <div className="LoginHandler-page minHeight">
            user signed in successfully
        </div>
    )
}

export default LoginHandler;