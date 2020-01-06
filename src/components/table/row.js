import React from "react";
import propTypes from "prop-types";
import styled from "styled-components";

const RowEl = styled.tr``;

class Row extends React.PureComponent {
  render() {
    const { children, ...other } = this.props;
    return <RowEl {...other}>{children}</RowEl>;
  }
}

Row.propTypes = {
  children: propTypes.node,
};

Row.defaultProps = {
  isTableRow: true,
};

export default Row;
