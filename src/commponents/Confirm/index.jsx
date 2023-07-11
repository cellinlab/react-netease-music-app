import { forwardRef, memo, useImperativeHandle, useState } from "react";
import { CSSTransition } from "react-transition-group";

import "./index.scss";
const Confirm = forwardRef((props, ref) => {
  const { text, cancelBtnText, confirmBtnText } = props;
  const { handleConfirm } = props;

  const [show, setShow] = useState(false);

  useImperativeHandle(ref, () => ({
    show() {
      setShow(true);
    },
  }));

  return (
    <CSSTransition in={show} timeout={300} appear={true} classNames="confirm-fade">
      <div
        className="confirm-wrapper"
        style={{ display: show ? "block" : "none" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <div className="confirm_content">
            <p className="text">{text}</p>
            <div className="operate">
              <div className="operate_btn left" onClick={() => setShow(false)}>
                {cancelBtnText}
              </div>
              <div
                className="operate_btn"
                onClick={() => {
                  setShow(false);
                  handleConfirm();
                }}
              >
                {confirmBtnText}
              </div>
            </div>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
});

export default memo(Confirm);
