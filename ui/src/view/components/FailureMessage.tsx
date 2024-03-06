import React from "react";
import { Result } from "antd";
import { ComponentWrapper } from "../../styles/global";

const FailureMessage: React.FC = () => (
  <ComponentWrapper>
    <Result
      status="error"
      title="Failed"
      subTitle="Something went wrong"
    ></Result>
  </ComponentWrapper>
);

export default FailureMessage;
