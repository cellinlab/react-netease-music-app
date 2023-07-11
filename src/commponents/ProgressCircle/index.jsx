import "./index.scss";

const ProgressCircle = (props) => {
  const { radius, percent } = props;

  const dashArray = Math.PI * 100;

  const dashOffset = (1 - percent) * dashArray;

  return (
    <div className="circle-wrapper">
      <svg
        width={radius}
        height={radius}
        viewBox="0 0 100 100"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle className="progress-background" cx="50" cy="50" r="50" fill="transparent"></circle>
        <circle
          className="progress-bar"
          cx="50"
          cy="50"
          r="50"
          fill="transparent"
          strokeDasharray={dashArray}
          strokeDashoffset={dashOffset}
        ></circle>
      </svg>
      {props.children}
    </div>
  );
};

export default ProgressCircle;
