import React from "react";
import propTypes from "prop-types";

const ColGroup = props => {
  const { isColumnAttribute, ...otherProps } = props;
  return <colgroup {...otherProps} />;
};

ColGroup.defaultProps = {
  isColumnAttribute: true,
};

ColGroup.propTypes = {
  isColumnAttribute: propTypes.bool,
};

export default ColGroup;
