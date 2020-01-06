import React from "react";
import propTypes from "prop-types";
import styled from "styled-components";

const RowEl = styled.tr``;

class Row extends React.PureComponent {
  render() {
    const { children, rowRef, ...other } = this.props;
    return (
      <RowEl {...other} ref={rowRef}>
        {children}
      </RowEl>
    );
  }
}

Row.propTypes = {
  children: propTypes.node,
  rowRef: propTypes.func,
};

Row.defaultProps = {
  isTableRow: true,
};

export default Row;
