import React from "react";

import "./index.scss";

const Loading = (props) => {
  const { show } = props;
  return (
    <div className="loading-wrapper" style={{ display: show ? "" : "none" }}>
      <div></div>
      <div></div>
    </div>
  );
};

export default Loading;
