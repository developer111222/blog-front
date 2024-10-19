import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { sendFriendRequest, respondToRequest, fetchFriendRequests,clearRequest } from '../../actions/socketAcrion';

function FriendRequest() {
  const dispatch = useDispatch();
  const { friendRequests,loading,message,error } = useSelector((state) => state.socket);
  const { user } = useSelector((state) => state.user);
  const userId = user._id; 
  console.log(userId,error,friendRequests);
 
  const [recipientId, setRecipientId] = useState(''); // Recipient's ID to whom request is sent

  useMemo(()=>{
    if (userId) {
      dispatch(fetchFriendRequests(userId));
    }
  },[userId])

  useEffect(() => {
    if(error){
      toast.error(error);
      dispatch(clearRequest())
    }
   
  }, [error,toast]);

  const handleSendFriendRequest = () => {
    if (recipientId) {
      const details={userId, recipientId}
      dispatch(sendFriendRequest(details));
    } else {
      toast.error('Recipient ID is required.');
    }
  };

  const handleRespondToRequest = (requestId, response) => {
    const acceptrequest={requestId, response}
    dispatch(respondToRequest(acceptrequest));
  };

  return (
    <div>
      <h2>Friend Requests</h2>
      <input
        type="text"
        value={recipientId}
        onChange={(e) => setRecipientId(e.target.value)}
        placeholder="Enter recipient ID"
      />
      <button onClick={handleSendFriendRequest}>Send Friend Request</button>

      {friendRequests.length > 0 ? (
        <ul>
          {friendRequests.map((request, index) => (
            <li key={index}>
              Friend request from {request.requester} - Status: {request.status}
              <button onClick={() => handleRespondToRequest(request._id, 'accept')}>Accept</button>
              <button onClick={() => handleRespondToRequest(request._id, 'decline')}>Decline</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No friend requests available.</p>
      )}
    </div>
  );
}

export default FriendRequest;
