import React from "react";
import propTypes from "prop-types";
import styled from "styled-components";

const TD = styled.td`
  padding: ${p => (p.sortable ? "16px 8px 16px 28px" : "16px 8px")};
  text-align: ${p => (p.sortable ? "left" : "center")};
`;

const Cell = props => {
  return <TD {...props}>{props.children}</TD>;
};

Cell.propTypes = {
  sortable: propTypes.bool,
  style: propTypes.object,
  children: propTypes.node,
};

export default Cell;
