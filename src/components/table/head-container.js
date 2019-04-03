import React from "react";
import propTypes from "prop-types";
import styled from "styled-components";

const HeadContainer = styled.thead`
  transform: translateZ(0);
`;

const TableHead = props => {
  return <HeadContainer {...props}>{props.children}</HeadContainer>;
};

TableHead.propTypes = {
  children: propTypes.node,
};

TableHead.defaultProps = {
  isTableHead: true,
};

export default TableHead;
