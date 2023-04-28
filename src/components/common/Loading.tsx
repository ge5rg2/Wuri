import React from "react";
import { DotLoader } from "react-spinners";

const override: React.CSSProperties = {
  display: "flex",
  margin: "0 auto",
  borderColor: "rgba(16, 163, 127)",
  textAlign: "center",
};
interface LoadingProps {
  loading: boolean;
}

const Loading = ({ loading }: LoadingProps) => {
  return (
    <>
      <DotLoader
        color=" rgba(16, 163, 127)"
        loading={loading}
        cssOverride={override}
        size={50}
      />
    </>
  );
};

export default Loading;
