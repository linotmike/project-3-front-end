import React from 'react';
import { useState, useEffect } from 'react';
import {NavLink as Link, useNavigate } from 'react-router-dom';
import API from '../../utils/Api';
import UploadWidget from '../../components/UploadWidget';
import './style.css';

export default function CreateProfile({ userId }) { 
    const navigate = useNavigate()
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [bio, setBio] = useState('');
    const [picture, setPicture] = useState('https://placekitten.com/200/300');
    const [languages, setLanguages] = useState([]);
    const [bestWorks, setBestWorks] = useState([]);
    
    const handleChange = (e) => {
        const { name, value } = e.target;

        switch (name) {
            case 'first-name':
                setFirstName(value);
                break;

            case 'last-name':
                setLastName(value);
                break;

            case 'bio':
                setBio(value);
                break;

            case 'languages': 
                setLanguages(value);
                break;

            default:
                break;
        }
    }

    const handleWorksChange = (e) => {
        const { name, value } = e.target;
        let arr = [ ...bestWorks ];

        switch ( name ) {
            case 'best-works-0':
                arr[0] = value;
                setBestWorks(arr);
                break;

            case 'best-works-1':
                arr[1] = value;
                setBestWorks(arr);
                break;

            case 'best-works-2':
                arr[2] = value;
                setBestWorks(arr);
                break;

            default:
                break;
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        let langArray;

        if (languages.length > 0) {
            langArray = languages.split(',').join(' ').split(' ');
        }

        const newProfile = {
            firstName: firstName,
            lastName: lastName,
            bio: bio,
            picture: picture,
            bestWorks: JSON.stringify(bestWorks),
            user_id: userId,
        }

        const dbCreateProfile = await API.createProfile(newProfile);
        const dbUserLanguage = await API.createLanguageUser( userId, langArray );
        console.log('LANGUAGES');
        console.log(dbUserLanguage);
        console.log('WORKS');
        // console.log(worksArray);
        console.log('PROFILE');
        console.log(dbCreateProfile);

        setFirstName('');
        setLastName('');
        setBio('');
        setLanguages([]);
        setBestWorks([]);
        navigate('/profile')
    }

    return (
        <form className='profile-create' onSubmit={handleSubmit}>
            <div className='row d-flex justify-content-center align-items-center p-2'>
                <div className='col-6 d-flex flex-column align-items-center justify-content-center profile-create-form p-2'>
                    <h2>Create Profile</h2>
                    <div className='col-8 d-flex flex-column align-self-center align-items-center justify-content-center text-center profile-create-input-container p-2'>
                        <label className='profile-create-label' for='first-name'>First name:</label>
                        <input className='profile-create-input' name='first-name' type='text' onChange={handleChange} value={firstName}/>
                        <label className='profile-create-label' for='last-name'>Last name:</label>
                        <input className='profile-create-input' name='last-name' type='text' onChange={handleChange} value={lastName}/>
                    </div>
                    <hr />
                    <div className='col-8 d-flex flex-column align-self-center align-items-center justify-content-center text-center profile-create-input-container p-2'>
                        <label className='profile-create-label' for='bio'>Bio:</label>
                        <input className='profile-create-input' name='bio' type='text' onChange={handleChange} value={bio}/>
                    </div>
                    <hr />
                    <div className='col-8 d-flex flex-column align-self-center align-items-center justify-content-center text-center profile-create-input-container p-2'>
                        <label className='profile-create-label' for='best-works'>Best Works:</label>
                        <input className='profile-create-input' name='best-works-0' type='text' placeholder='Links to Best Works' value={bestWorks[0]} onChange={handleWorksChange}/>
                        <input className='profile-create-input' name='best-works-1' type='text' placeholder='Links to Best Works' value={bestWorks[1]} onChange={handleWorksChange}/>
                        <input className='profile-create-input' name='best-works-2' type='text' placeholder='Links to Best Works' value={bestWorks[2]} onChange={handleWorksChange}/>
                    </div>
                    <hr />
                    <div className='col-8 d-flex flex-column align-self-center align-items-center justify-content-center text-center profile-create-input-container p-2'>
                        <label className='profile-create-label' for='languages'>Languages:</label>
                        <input className='profile-create-input' name='languages' type='text' placeholder='languages' value={languages} onChange={handleChange} />
                    </div>
                    <hr />
                    <div className='col-3 d-flex align-self-center align-items-center justify-content-center text-center p-2'>
                        <UploadWidget setPicture={setPicture} />
                        <button className='profile-create-btn submit m-2' type='submit'>Create</button>
                    </div>
                        <Link to={{pathname:"/profile"}}><button>cancel</button></Link>
                    <hr />
                </div>
            </div>
        </form>
    )
}