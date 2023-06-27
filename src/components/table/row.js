import React from "react";
import propTypes from "prop-types";
import styled from "styled-components";

const RowEl = styled.tr`
  ${p =>
    p.childStyle?.firstChild
      ? `${p.childStyle.firstChild.parentSelector}:first-child {${p.childStyle.firstChild.css}}`
      : ""}
  ${p =>
    p.childStyle?.lastChild
      ? `${p.childStyle.lastChild.parentSelector}:last-child {${p.childStyle.lastChild.css}}`
      : ""}
  ${p =>
    p.childStyle?.nth
      ? `${p.childStyle.nth.parentSelector}:nth-child(${p.childStyle.nth.childSelector}) {${p.childStyle.nth.css}}`
      : ""}
`;

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
