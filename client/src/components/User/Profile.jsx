import React, { useEffect, useState } from 'react';
import { getProfile } from '../../api';
import "../../styles/Profile.css";

const Profile = () => {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await getProfile();
                setProfile(res.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchProfile();
    }, []);

    return (
        <div>
            {profile ? (
                <div className='profile'>
                    <div className='profile-top'>
                        <div className="profilecontainer">
                            <div className="profile-details">
                                <div className="profile-detail">
                                    <span>Name</span>
                                    <p>{profile.name}</p>
                                </div>
                                <div className="profile-detail">
                                    <span>Age</span>
                                    <p>{profile.age}</p>
                                </div>
                                <div className="profile-detail">
                                    <span>Phone</span>
                                    <p>{profile.phone}</p>
                                </div>
                                <div className="profile-detail">
                                    <span>Date of Birth:</span>
                                    <p> {new Date(profile.dob).toLocaleDateString()}</p>
                                </div>
                                <div className="profile-detail">
                                    <span>Email Id</span>
                                    <p>{profile.email}</p>
                                </div>
                                <div className="profile-detail">
                                    <span>Role</span>
                                    <p>{profile.role}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Profile;
