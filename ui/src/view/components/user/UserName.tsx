import { Link } from "react-router-dom";
import { User } from "../../../rest/common";
import { linkStyle } from "../../../styles/global";

const UserName: React.FC<{ user: User | undefined }> = ({ user }) => {
  return (
    <Link style={linkStyle} to={`/user/${user?.id}`}>
      <div>{user?.name}</div>
    </Link>
  );
};

export default UserName;
