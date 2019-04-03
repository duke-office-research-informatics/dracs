import React from "react";
import propTypes from "prop-types";
import styled from "styled-components";

const TableContainer = styled.table`
  transform: translateZ(0);
`;

const TableWrap = props => {
  return <TableContainer {...props}>{props.children}</TableContainer>;
};

TableWrap.propTypes = {
  children: propTypes.node,
};

export default TableWrap;
