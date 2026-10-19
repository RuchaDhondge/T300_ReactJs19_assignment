import { useContext } from "react";
import UserContext from "../context/UserContext";

function RegisteredUserInfo() {
  const registeredUser = useContext(UserContext);

  if (!registeredUser) {
    return <p className="user-empty-state">No user registered yet.</p>;
  }

  return (
    <div className="user-card">
      <h3>Registered User</h3>
      <p>
        <strong>Name:</strong> {registeredUser.name}
      </p>
      <p>
        <strong>Email:</strong> {registeredUser.email}
      </p>
    </div>
  );
}

export default RegisteredUserInfo;
