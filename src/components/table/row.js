import React from "react";
import propTypes from "prop-types";
import styled from "styled-components";

const RowEl = styled.tr``;

const Row = props => {
  return <RowEl {...props}>{props.children}</RowEl>;
};

Row.propTypes = {
  children: propTypes.node,
};

Row.defaultProps = {
  isTableRow: true,
};

export default Row;
