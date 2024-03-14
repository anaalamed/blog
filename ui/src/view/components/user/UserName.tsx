import { Link } from "react-router-dom";
import { linkStyle } from "../../../styles/global";
import { User } from "../../../rest/userRequests";

const UserName: React.FC<{ user: User | undefined }> = ({ user }) => {
  return (
    <Link style={linkStyle} to={`/user/${user?.id}`}>
      <div>{user?.name}</div>
    </Link>
  );
};

export default UserName;
