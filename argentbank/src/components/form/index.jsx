import React, {useEffect} from 'react';
import './form.css'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setProfile, setToken  } from '../../feature/userSlice';
import { useNavigate } from 'react-router-dom';
import Profile from '../../pages/profile';

const Form = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (event) => {
        const { id,value } = event.target;
        setFormData({
            ...formData,
            [id]: value,
        })  
    };

    const handleSubmit =  (event) => {
        event.preventDefault();

        const error = document.querySelector(".error")
        if (formData.email === "" && formData.password === ""){
            error.innerText  = "Missing email and password";
            return
        }

        // Si données OK on envoi au serveur
       fetch ('http://localhost:3001/api/v1/user/login', {
            method : 'POST',
            headers: {
                'Content-Type': 'application/Json',
            },
            body: JSON.stringify(formData),
        })
        .then(response => response.json())
        .then(data => {
            if (data && data.body && data.body.token){
                //Sauvegarde du token 
                const token = data.body.token;
                dispatch(setToken(token))
          }else {
            error.innerText  = "Bad identifier or password";
            return
          }
        })
    }

    useEffect(() => {
        if(!user.token) return;

        navigate('/Profile');
    }, [user.token, navigate])

    return (
        <section className='login_container'>
            <div className="background">
                <div className="modal">

                        <i className="fa fa-user-circle sign-in-icon"></i>
                        <h1 className='modal_title' >Sign In</h1>

                    <form onSubmit={handleSubmit}>

                        <div className="input_email">
                        <label htmlFor="email">Username</label>
                        <input type="email" id='email' onChange={handleChange}/>
                        </div><br />
                        
                        <div className="input_password">
                        <label htmlFor="password">Password</label>
                        <input type="password" id='password' onChange={handleChange}/>
                        </div><br />
                        
                        <div className="input_remember">
                        <input type="checkbox" id='checkbox' checked={formData.rememberMe} onChange={handleChange} />
                        <label htmlFor="checkbox">Remember me</label>
                        </div><br />
                        
                        <div className="signin">
                        <input type="submit" className='sign_in' value="Sign In" />
                        </div>
                        <p className="error"></p>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Form;