import React from "react";
import PropTypes from "prop-types";

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

Loading.propTypes = {
  show: PropTypes.bool,
};

Loading.defaultProps = {
  show: true,
};

export default Loading;
