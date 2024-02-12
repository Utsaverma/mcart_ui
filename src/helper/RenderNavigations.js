import { Route, Routes } from "react-router-dom";
import { AuthData } from "../App";
import { nav } from "./navigations";


export const RenderRoutes = () => {

    const { currUser } = AuthData();
    
    return (
            <Routes>
            { 
                nav.map((r, i) => {
                    
                    if (!currUser.isAuthenticated || !r.shouldBeAuthenticated) {
                        return <Route key={i} path={r.path} element={r.element}/>
                    }
                })
            }
            { 
                nav.map((r, i) => {

                    if (currUser.isAuthenticated && r.shouldBeAuthenticated) {
                        return <Route key={i} path={r.path} element={r.element}/>
                    }
                })
            }
            </Routes>
    )
}