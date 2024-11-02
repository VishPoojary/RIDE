// import React, { useState, useEffect } from 'react';
// import { bookRide, bidRide, getRides } from '../../api';
// import "../../styles/Ride.css";

// const Ride = ({ user }) => {
//     const [rides, setRides] = useState([]);
//     const [formData, setFormData] = useState({
//         startpoint: '',
//         destination: '',
//         totalPassengers: '',
//         seats: '',
//         bid: ''
//     });

//     const { startpoint, destination, totalPassengers, seats, bid } = formData;

//     const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

//     const fetchRides = async () => {
//         try {
//             const res = await getRides();
//             setRides(res.data);
//         } catch (err) {
//             console.error(err);
//         }
//     };

//     useEffect(() => {
//         fetchRides();
//     }, []);

//     const onSubmit = async e => {
//         e.preventDefault();
//         try {
//             if (user.role === 'passenger') {
//                 await bookRide({ startpoint, destination, totalPassengers });
//             } else if (user.role === 'driver') {
//                 await bidRide({ startpoint, destination, seats, bid });
//             }
//             fetchRides();
//         } catch (err) {
//             console.error(err);
//         }
//     };

//     console.log('User role:', user.role);
//     return (
//         <div>
//             <div className="ride">

//                 <form onSubmit={onSubmit}> 
//                 <h2>{user.role === 'passenger' ? 'Book a Ride' : 'Bid for a Ride'}</h2>
//                     <div className="ride-detail">
//                         <input type="text" name="startpoint" value={startpoint} onChange={onChange} placeholder="Start Point" required /></div>
//                     <div className="ride-detail">
//                         <input type="text" name="destination" value={destination} onChange={onChange} placeholder="Destination" required /></div>
//                     {user.role === 'passenger' ? (
//                         <div className="ride-detail">
//                             <input type="number" name="totalPassengers" value={totalPassengers} onChange={onChange} placeholder="Total Passengers" required /></div>
//                     ) : (
//                         <>
//                             <div className="ride-detail">
//                                 <input type="number" name="seats" value={seats} onChange={onChange} placeholder="Seats" required /></div>
//                             <div className="ride-detail">
//                                 <input type="number" name="bid" value={bid} onChange={onChange} placeholder="Bid Amount" required /></div>
//                         </>
//                     )}
//                     <div className="submit">
//                         <button type="submit">{user.role === 'passenger' ? 'Book Ride' : 'Bid Ride'}</button></div>
//                 </form>
//             </div>
//             <h2>Available Rides</h2>
//             <ul>
//                 {rides.map(ride => (
//                     <li key={ride._id}>
//                         {ride.startpoint} to {ride.destination} : {ride.status}
//                         {ride.status === 'booked' && <span> (Code: {ride.rideCode})</span>}
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default Ride;


import React, { useState, useEffect } from 'react';
import { bookRide, bidRide, getRides, getUserRides, acceptBid } from '../../api';
import '../../styles/Ride.css';

const Ride = ({ user }) => {
    const [rides, setRides] = useState([]);
    const [formData, setFormData] = useState({
        startpoint: '',
        destination: '',
        totalPassengers: '',
        seats: '',
        bidAmount: '',
    });

    const { startpoint, destination, totalPassengers, seats, bidAmount } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const fetchRides = async () => {
        try {
            const res = await getRides();
            setRides(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchUserRides = async () => {
        try {
            const res = await getUserRides();
            setRides(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchRides();
    }, []);

    const onSubmit = async e => {
        e.preventDefault();
        try {
            if (user.role === 'passenger') {
                await bookRide({ startpoint, destination, totalPassengers });
            } else if (user.role === 'driver') {
                await bidRide({ rideId: formData.rideId, seats, bidAmount });
            }
            fetchUserRides();
        } catch (err) {
            console.error(err);
        }
    };

    const onAcceptBid = async (rideId, bidId) => {
        try {
            await acceptBid({ rideId, bidId });
            fetchUserRides();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <div className="ride">
                <form onSubmit={onSubmit}>
                    <h2>{user.role === 'passenger' ? 'Book a Ride' : 'Bid for a Ride'}</h2>
                    <div className="ride-detail">
                        <input type="text" name="startpoint" value={startpoint} onChange={onChange} placeholder="Start Point" required /></div>
                    <div className="ride-detail">
                        <input type="text" name="destination" value={destination} onChange={onChange} placeholder="Destination" required /></div>
                    {user.role === 'passenger' ? (
                        <div className="ride-detail">
                            <input type="number" name="totalPassengers" value={totalPassengers} onChange={onChange} placeholder="Total Passengers" required /></div>
                    ) : (
                        <>
                            <div className="ride-detail">
                                <input type="number" name="seats" value={seats} onChange={onChange} placeholder="Seats" required /></div>
                            <div className="ride-detail">
                                <input type="number" name="bidAmount" value={bidAmount} onChange={onChange} placeholder="Bid Amount" required /></div>
                        </>
                    )}
                    <div className="submit">
                        <button type="submit">{user.role === 'passenger' ? 'Book Ride' : 'Bid Ride'}</button></div>
                </form>
            </div>

            {user.role === 'passenger' && (
                <div>
                    <h2>Your Rides</h2>
                    {rides.map(ride => (
                        <div className='passenger-choice' key={ride._id}>
                            <p>{ride.startpoint} to {ride.destination} -  Passengers : {ride.totalPassengers}</p>
                            {ride.bids.length > 0 && (
                                <div className='bids'>
                                    <h3>Bids</h3>
                                    {ride.bids.map(bid => (
                                        <div className='bid-option' key={bid._id}>
                                            <p>Driver: {bid.driver.name} - Seats: {bid.seats} - Bid: {bid.bidAmount}</p>
                                            <button onClick={() => onAcceptBid(ride._id, bid._id)}>Accept Bid</button>
                                        </div>
                                    ))}
                                </div>
                            )}
                            {ride.acceptedBid && (
                                <div className='accepted-bid'>
                                    <h3>Accepted Bid</h3>
                                    <p>Driver: {ride.acceptedBid.driver.name} - Seats: {ride.acceptedBid.seats} - Bid: {ride.acceptedBid.bidAmount}</p>
                                    <p>Secret Code: {ride.secretCode}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {user.role === 'driver' && (
                <div>
                    <h2>Available Rides</h2>
                    {rides.filter(ride => ride.status === 'pending').map(ride => (
                        <div className='passenger-choice' key={ride._id}>
                            <p>{ride.startpoint} to {ride.destination} - Passengers : {ride.totalPassengers}</p>
                            <div className="bid-form">
                                <form onSubmit={(e) => { e.preventDefault(); setFormData({ ...formData, rideId: ride._id }); onSubmit(e); }}>
                                    <div className="bid-detail">
                                        <input type="number" name="seats" value={seats} onChange={onChange} placeholder="Seats" required /></div>
                                    <div className="bid-detail">
                                        <input type="number" name="bidAmount" value={bidAmount} onChange={onChange} placeholder="Bid Amount" required /></div>
                                    <div className="submit">
                                        <button type="submit">Bid Ride</button></div>
                                </form>
                            </div>
                        </div>

                    ))}
                    {rides.map(ride => (
                        <div key={ride._id}>
                            {ride.acceptedBid && (
                                <div className='accepted-bid'>
                                    <h3>Accepted Bid</h3>
                                    <p>Seats: {ride.acceptedBid.seats} - Bid: {ride.acceptedBid.bidAmount}</p>
                                    <p>Secret Code: {ride.secretCode}</p>
                                </div>
                            )}
                        </div>
                    ))}

                </div>
            )}
        </div>
    )
}
export default Ride;
