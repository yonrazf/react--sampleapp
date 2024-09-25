/* eslint-disable react/prop-types */
export default function UserDetails({ user }) {
  return (
    <div>
      <img src={user.profilePictureUrl} alt={user.name} />
      <div>
        <span>Logged in as {user.name}</span>
      </div>
    </div>
  );
}
