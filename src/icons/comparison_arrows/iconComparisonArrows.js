import React from "react";
import propTypes from "prop-types";
import Icon from "../icon_wrapper.js";

const IconComparisonArrows = props => {
  return (
    <Icon
      className={props.className}
      style={props.style}
      viewBox="0 0 24 24"
      width={props.size}
      height={props.size}
      color={props.color}
      hoverColor={props.hoverColor}
      role="img"
      aria-label="comparison icon"
      enableBackground="new 0 0 24 24"
    >
      <title>comparison icon</title>
      <g>
        <rect fill="none" height="24" width="24" x="0" />
      </g>
      <g>
        <g>
          <g>
            <path d="M9.01,14H2v2h7.01v3L13,15l-3.99-4V14z M14.99,13v-3H22V8h-7.01V5L11,9L14.99,13z" />
          </g>
        </g>
      </g>
    </Icon>
  );
};

IconComparisonArrows.defaultProps = {
  size: 24,
  color: "#0680cd",
};

IconComparisonArrows.propTypes = {
  className: propTypes.string,
  size: propTypes.number,
  style: propTypes.object,
  color: propTypes.oneOfType([propTypes.string, propTypes.func]),
  hoverColor: propTypes.oneOfType([propTypes.string, propTypes.func]),
};

export default IconComparisonArrows;
