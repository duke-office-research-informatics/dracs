import React from "react";
import propTypes from "prop-types";
import styled from "styled-components";

const BodyContainer = styled.tbody`
  transform: translateZ(0);
`;

class TableBody extends React.PureComponent {
  render() {
    const { children, ...other } = this.props;
    return <BodyContainer {...other}>{children}</BodyContainer>;
  }
}

TableBody.propTypes = {
  children: propTypes.node,
};

TableBody.defaultProps = {
  isTableBody: true,
};

export default TableBody;
