import React from "react";
import { Descriptions } from "antd";
import type { DescriptionsProps } from "antd";
import { User } from "../../../rest/userRequests";

const UserInfo: React.FC<{ user: User }> = ({ user }) => {
  const items: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "Name",
      children: user.name,
    },
    {
      key: "2",
      label: "Email",
      children: user.email,
    },
  ];

  return <Descriptions title="User Info" items={items} />;
};

export default UserInfo;
