import React from "react";
import propTypes from "prop-types";
import styled from "styled-components";
import _ from "lodash";

import Row from "./row.js";
import TableWrap from "./table-container.js";
import TableHead from "./head-container.js";

const StickyCornerWrap = styled.div`
  transition: all 300ms ease-in-out;
  transform: translateZ(0);
`;

const StickyCorner = props => {
  const renderCorner = () => {
    const stickyCorner = [];
    let cells;
    props.rows.forEach((row, r) => {
      if (r === 0) {
        cells = React.Children.toArray(row.props.children).slice(
          0,
          props.count
        );
        stickyCorner.push(
          <Row
            {...row.props}
            innerRef={node => props.rowRef(node, r)}
            key={_.uniqueId()}
          >
            {cells}
          </Row>
        );
      }
    });
    return stickyCorner;
  };

  return (
    <StickyCornerWrap innerRef={props.cornerRef} aria-hidden={true}>
      <TableWrap>
        <TableHead>{renderCorner()}</TableHead>
      </TableWrap>
    </StickyCornerWrap>
  );
};

StickyCorner.propTypes = {
  cornerRef: propTypes.func,
  multiSelect: propTypes.bool,
  count: propTypes.number,
  rows: propTypes.array,
  rowRef: propTypes.func,
};

export default StickyCorner;

export { StickyCornerWrap };
