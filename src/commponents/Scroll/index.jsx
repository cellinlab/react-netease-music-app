import React, { forwardRef, useRef, useEffect, useState, useImperativeHandle } from "react";
import PropTypes from "prop-types";
import BScroll from "better-scroll";

import "./index.scss";

const Scroll = forwardRef((props, ref) => {
  const { direction, click, refresh, bounceTop, bounceBottom, pullUp, pullDown, onScroll } = props;

  const [bScroll, setBScroll] = useState();
  const scrollContaninerRef = useRef();

  useEffect(() => {
    const scroll = new BScroll(scrollContaninerRef.current, {
      scrollX: direction === "horizontal",
      scrollY: direction === "vertical",
      probeType: 3,
      click: click,
      bounce: {
        top: bounceTop,
        bottom: bounceBottom,
      },
    });
    setBScroll(scroll);
    return () => {
      setBScroll(null);
    };
  }, []);

  useEffect(() => {
    if (!bScroll || !onScroll) return;
    bScroll.on("scroll", (scroll) => {
      onScroll(scroll);
    });
    return () => {
      bScroll.off("scroll");
    };
  }, [onScroll, bScroll]);

  useEffect(() => {
    if (!bScroll || !pullUp) return;
    bScroll.on("scrollEnd", () => {
      if (bScroll.y <= bScroll.maxScrollY + 100) {
        pullUp();
      }
    });
    return () => {
      bScroll.off("scrollEnd");
    };
  }, [pullUp, bScroll]);

  useEffect(() => {
    if (!bScroll || !pullDown) return;
    bScroll.on("touchEnd", (pos) => {
      if (pos.y > 50) {
        pullDown();
      }
    });
    return () => {
      bScroll.off("touchEnd");
    };
  }, [pullDown, bScroll]);

  useEffect(() => {
    if (refresh && bScroll) {
      bScroll.refresh();
    }
  });

  useImperativeHandle(ref, () => ({
    refresh() {
      if (bScroll) {
        bScroll.refresh();
        bScroll.scrollTo(0, 0);
      }
    },
    getBScroll() {
      if (bScroll) {
        return bScroll;
      }
    },
  }));

  return (
    <div className="scroll-container" ref={scrollContaninerRef}>
      {props.children}
    </div>
  );
});

Scroll.propTypes = {
  direction: PropTypes.oneOf(["vertical", "horizontal"]),
  refresh: PropTypes.bool,
  onScroll: PropTypes.func,
  pullUp: PropTypes.func,
  pullDown: PropTypes.func,
  pullUpLoading: PropTypes.bool,
  pullDownLoading: PropTypes.bool,
  bounceTop: PropTypes.bool,
  bounceBottom: PropTypes.bool,
};

Scroll.defaultProps = {
  direction: "vertical",
  click: true,
  refresh: true,
  onScroll: null,
  pullUp: null,
  pullDown: null,
  pullUpLoading: false,
  pullDownLoading: false,
  bounceTop: true,
  bounceBottom: true,
};

export default Scroll;
