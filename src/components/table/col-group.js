import React from "react";

const ColGroup = props => {
  return <colgroup {...props} />;
};

ColGroup.defaultProps = {
  isBuiltIn: true,
};

export default ColGroup;
