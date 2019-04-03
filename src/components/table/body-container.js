import React from "react";
import propTypes from "prop-types";
import styled from "styled-components";

const BodyContainer = styled.tbody`
  transform: translateZ(0);
`;

const TableBody = props => {
  return <BodyContainer {...props}>{props.children}</BodyContainer>;
};

TableBody.propTypes = {
  children: propTypes.node,
};

TableBody.defaultProps = {
  isTableBody: true,
};

export default TableBody;
