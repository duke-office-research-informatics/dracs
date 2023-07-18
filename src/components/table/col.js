import React from "react";

const Col = props => {
  return <col {...props} />;
};

Col.defaultProps = {
  isColumnAttribute: true,
};

export default Col;
