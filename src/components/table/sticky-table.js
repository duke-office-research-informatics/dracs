import React from "react";
import propTypes from "prop-types";
import styled from "styled-components";

const Table = styled.table`
  transform: translateZ(0);
`;
const Body = styled.tbody`
  transform: translateZ(0);
`;

const StickyTable = props => {
  return (
    <Table {...props}>
      <Body>{props.children}</Body>
    </Table>
  );
};

StickyTable.propTypes = {
  children: propTypes.node,
};

export default StickyTable;
