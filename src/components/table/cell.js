import React from "react";
import propTypes from "prop-types";
import styled from "styled-components";

const TD = styled.td`
  padding: ${p => (p.sortable ? "16px 8px 16px 28px" : "16px 8px")};
  text-align: ${p => (p.sortable ? "left" : "center")};
  ${p => {
    console.log("p.childStyle:", p.childStyle);
    return null;
  }}
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

class Cell extends React.PureComponent {
  render() {
    const { children, cellRef, ...other } = this.props;
    return (
      <TD {...other} ref={cellRef}>
        {children}
      </TD>
    );
  }
}

Cell.propTypes = {
  sortable: propTypes.bool,
  style: propTypes.object,
  children: propTypes.node,
  cellRef: propTypes.func,
};

export default Cell;
