import React from "react";

const Col = props => {
  return <col {...props} />;
};

Col.defaultProps = {
  isBuiltIn: true,
};

export default Col;
