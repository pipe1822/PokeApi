import "../sass/Button.scss";
const Button = (props) => {
  return (
    <div className="btn_box">
      <button className="btn" onClick={props.handleClick}>
        {props.icon}
      </button>
      <div className="btn_shadow"></div>
    </div>
  );
};

export { Button };
