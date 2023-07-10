import React, { forwardRef, memo } from "react";
import PropTypes from "prop-types";

import "./index.scss";

const Header = forwardRef((props, ref) => {
  const { title, handleClick, isMarquee } = props;

  return (
    <div className="header-container" ref={ref}>
      <i className="iconfont back" onClick={handleClick}>
        &#xe655;
      </i>
      {isMarquee ? (
        <marquee>
          <h1>{title}</h1>
        </marquee>
      ) : (
        <h1>{title}</h1>
      )}
    </div>
  );
});

Header.defaultProps = {
  title: "Title",
  handleClick: () => {},
  isMarquee: false,
};

Header.propTypes = {
  title: PropTypes.string,
  handleClick: PropTypes.func,
  isMarquee: PropTypes.bool,
};

export default memo(Header);
