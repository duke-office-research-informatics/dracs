import React from "react";

const ColGroup = props => {
  return <colgroup {...props} />;
};

ColGroup.defaultProps = {
  isColumnAttribute: true,
};

export default ColGroup;
