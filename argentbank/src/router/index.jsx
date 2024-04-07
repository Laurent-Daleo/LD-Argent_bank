import React, {useState, useEffect} from "react";
import { BrowserRouter, Routes, Route,} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Home from "../pages/home";
import Login from "../pages/login";
import Notfound from "../pages/notfound";
import Profile from "../pages/profile";
import routes from './routes'
import { setToken } from "../feature/userSlice";
import { setProfile } from "../feature/userSlice";
import '../style/root.css'

function Router () {

    const dispatch = useDispatch();
    const user = useSelector(state => state.user);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token){
            dispatch(setToken(token))
        } else {
            setIsLoading(false)
        }    
    }, [dispatch]);


    useEffect(() => {
        if(!user.token) return;

        fetch ('http://localhost:3001/api/v1/user/profile', {
            method : 'POST',
            headers: {
                'Content-Type': 'application/Json',
                'Authorization' : `Bearer ${user.token}`
            },
        })
        .then(response => {
            if(response.status !== 200){
                throw new Error('Bad request')
            }
            return response.json()
        })
        .then(data => {
            dispatch(setProfile({
                email : data.body.email,
                firstname: data.body.firstName,
                lastname: data.body.lastName,
                username: data.body.userName
            }))

            setIsLoading(false)
        })
        .catch(err => {
            // redirection vers la page connexion
            console.error('redirection vers login')
        })

    }, [dispatch, user.token])


    if(isLoading) return <p>chargements en cours </p>

    return (
        <BrowserRouter>
            <Routes>
                <Route path={routes.home} element={<Home />} />
                <Route path={routes.login} element={<Login />} />
                <Route path={routes.profile} element={<Profile />} />
                <Route path="*" element={<Notfound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Router;