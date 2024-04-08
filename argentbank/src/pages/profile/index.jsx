import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../../components/header';
import Footer from '../../components/footer';
import { setProfile } from '../../feature/userSlice';
import './user.css'
import { useNavigate } from 'react-router-dom';
import AccountElement from '../../components/accountElement';

const Profile = () => {
    const [isEditFormVisible, setIsEditFormVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const [accountsData, setAccountsData] = useState([]);

    const [userName, setUserName] = useState('');

    useEffect(() => {
      if(!user.token){
        navigate('/Login')
      } else {
        setUserName(user.username); 
    }
    }, [navigate,user.username,user.token])

     const handleEditName = () => {
        setIsEditFormVisible(!isEditFormVisible);
     }
     const handleCancel = () => {
        setIsEditFormVisible(false)
     }
     const handleSubmit = (e) => {
        e.preventDefault();
        // Check si username est pas vide sinon affichage d'erreur
        if (!userName.trim()) { // Vérifie si le champ userName est vide ou contient uniquement des espaces
            setErrorMessage("Veuillez rentrer un nom dans User name !");
            return; // Arrête la fonction ici pour ne pas soumettre le formulaire
        }
        fetch ('http://localhost:3001/api/v1/user/profile', {
            method : 'PUT',
            headers: {
                'Content-Type': 'application/Json',
                'Authorization' : `Bearer ${user.token}`,
                'Accept': 'application/json'
            },
            body: JSON.stringify({ userName: userName }),
        })
        .then(response => {
            console.log(response)
        if (response.status === 200){
            
        // mettre à jour redux
        dispatch(setProfile(userName))
        dispatch(setProfile(user))
        // Si ok on ferme le formulaire
        setIsEditFormVisible(false)
        }else{
            setErrorMessage("Bad request to server !");
            return
        }
        })
        setErrorMessage('');
     }
     useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(process.env.PUBLIC_URL + '/accounts.json');
                const data = await response.json();
                setAccountsData(data);
            } catch (error) {
                console.error('Error fetching accounts data:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className='user_page' >
            <Header />
            <main className='background_dark' >
                <div className="edit_name_banner">
                    <h1 className="edit_name_title">
                        Welcome back
                    </h1>
                    <button className="edit_name_btn" onClick={handleEditName} >
                        Edit Name
                    </button>
                    {isEditFormVisible && (
                    <form  onSubmit={handleSubmit} className='edit_user_container' >
                        <div className='user_name_content'>
                                <label htmlFor="user_name">User name:</label>
                                <input type="text" id='user_name' defaultValue={userName} onChange={(e) => setUserName(e.target.value)}/>
                        </div>
                        <div className='first_name_content'>
                                <label htmlFor="first_name">First name:</label>
                                <input type="text" id='first_name' defaultValue={user.firstname} readOnly disabled/>
                        </div>
                        <div className='last_name_content'>
                                <label htmlFor="last_name">Last name:</label>
                                <input type="text" id='last_name' defaultValue={user.lastname} readOnly disabled/>
                        </div>
                            <div className="save_user_name">
                                <div className="save_content">
                                    <button className="save" type={'submit'}>
                                    Save
                                    </button>
                                </div>
                                <div className="cancel_content">
                                    <button className="cancel" onClick={handleCancel}>
                                    Cancel
                                    </button>
                                </div>
                            </div>
                            {errorMessage && <p className="display_error">{errorMessage}</p>}
                    </form>
                    )}
                </div>
                {accountsData.map((account, index) => (
                    <AccountElement key={index} account={account} />
                ))}
            </main>
            <Footer />
        </div>
    );
};

export default Profile;