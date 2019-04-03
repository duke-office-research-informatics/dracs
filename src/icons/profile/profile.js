import React from "react";
import propTypes from "prop-types";
import Icon from "../icon_wrapper.js";

const IconProfile = props => {
  return (
    <Icon
      className={props.className}
      viewBox="0 0 50 50"
      width={props.size}
      height={props.size}
      color={props.color}
      hoverColor={props.hoverColor}
      role="img"
      aria-label="profile icon"
    >
      <title>profile icon</title>
      <path d="M34.8,33.8c-1.7-0.7-3.8-1.6-3.8-2.3V27c2.5-1.9,4-4.9,4-8v-6c0-5.5-4.5-10-10-10c-5.5,0-10,4.5-10,10v6c0,3.1,1.5,6.2,4,8  v4.5c0,0.6-2.1,1.5-3.8,2.3C11.1,35.5,5,38.1,5,45v1h40v-1C45,38.1,38.9,35.5,34.8,33.8z" />
    </Icon>
  );
};

IconProfile.defaultProps = {
  size: 40,
  color: "#fff",
};

IconProfile.propTypes = {
  className: propTypes.string,
  size: propTypes.number,
  color: propTypes.oneOfType([propTypes.string, propTypes.func]),
  hoverColor: propTypes.oneOfType([propTypes.string, propTypes.func]),
};

export default IconProfile;
