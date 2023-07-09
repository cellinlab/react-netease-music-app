import { useEffect, useRef } from "react";
import PropTypes from "prop-types";

import Scroll from "@/commponents/Scroll";

import "./index.scss";

const Horizen = (props) => {
  const categoryRef = useRef(null);

  const { list, oldVal, title } = props;
  const { handleClick } = props;

  useEffect(() => {
    let categoryDOM = categoryRef.current;
    let tagElems = categoryDOM.querySelectorAll("span");
    let totalWidth = 0;
    Array.from(tagElems).forEach((ele) => {
      totalWidth += ele.offsetWidth;
    });
    categoryDOM.style.width = `${totalWidth}px`;
  }, []);

  return (
    <Scroll direction="horizontal">
      <div ref={categoryRef}>
        <div className="horizontal-list">
          <span className="title">{title}</span>
          {list.map((item) => {
            return (
              <span
                className={`list-item ${oldVal === item.key ? "selected" : ""}`}
                key={item.key}
                onClick={() => handleClick(item.key)}
              >
                {item.name}
              </span>
            );
          })}
        </div>
      </div>
    </Scroll>
  );
};

Horizen.defaultProps = {
  list: [],
  oldVal: "",
  title: "",
  handleClick: null,
};

Horizen.propTypes = {
  list: PropTypes.array,
  oldVal: PropTypes.string,
  title: PropTypes.string,
  handleClick: PropTypes.func,
};

export default Horizen;
