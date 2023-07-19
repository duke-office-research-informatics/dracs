import React from "react";
import propTypes from "prop-types";

const Col = props => {
  const { isColumnAttribute, ...otherProps } = props;
  return <col {...otherProps} />;
};

Col.defaultProps = {
  isColumnAttribute: true,
};

Col.propTypes = {
  isColumnAttribute: propTypes.bool,
};

export default Col;
