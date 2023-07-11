import { useState, useImperativeHandle, forwardRef, memo } from "react";
import { CSSTransition } from "react-transition-group";

import "./index.scss";

const Toast = forwardRef((props, ref) => {
  const [show, setShow] = useState(false);
  const [timer, setTimer] = useState("");

  const { text } = props;

  useImperativeHandle(ref, () => ({
    show() {
      if (timer) clearTimeout(timer);
      setShow(true);
      setTimer(
        setTimeout(() => {
          setShow(false);
        }, 3000)
      );
    },
  }));

  return (
    <CSSTransition in={show} timeout={300} classNames="drop" unmountOnExit>
      <div className="toast-wrapper">
        <div className="text">{text}</div>
      </div>
    </CSSTransition>
  );
});

export default memo(Toast);
