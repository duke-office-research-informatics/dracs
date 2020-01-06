import React from "react";
import propTypes from "prop-types";
import styled from "styled-components";

const ListWrap = styled.ul`
  padding: 0;
  margin: 0;
`;

const List = props => {
  return (
    <ListWrap ref={props.ref} style={props.style}>
      {props.children}
    </ListWrap>
  );
};

List.propTypes = {
  /** React elements passed as children of the component */
  children: propTypes.node,
  /** Functional ref that can be attached to the component from a parent component */
  ref: propTypes.func,
  /** Style object for the component */
  style: propTypes.object,
};

export default List;
