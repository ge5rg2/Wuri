import React from "react";
import { DotLoader } from "react-spinners";

const override: React.CSSProperties = {
  display: "flex",
  margin: "0 auto",
  borderColor: "#FD0155",
  textAlign: "center",
};
interface LoadingProps {
  loading: boolean;
}

const Loading = ({ loading }: LoadingProps) => {
  return (
    <>
      <DotLoader
        color="#FD0155"
        loading={loading}
        cssOverride={override}
        size={50}
      />
    </>
  );
};

export default Loading;
