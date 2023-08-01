import React from "react";
import propTypes from "prop-types";
import styled from "styled-components";

import IconCaretUp from "../../icons/caret_up/caret_up.js";
import IconCaretDown from "../../icons/caret_down/caret_down.js";

const TH = styled.th`
  position: relative;
  cursor: ${p => (p.sortable ? "pointer" : "default")};
  padding: ${p => `${p.theme.sizing.base}px`};
  text-align: center;
`;

const SortWrap = styled.div`
  display: flex;
  align-items: center;
`;

const ButtonWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-right: 4px;
`;

class HeaderCell extends React.PureComponent {
  render() {
    const {
      cellRef,
      onClick,
      primarySortValue,
      secondarySortValue,
      sortValueType,
      sortable,
      sortKey,
      sortDirection,
      children,
      ...otherProps
    } = this.props;
    console.log("Sort Direction:", sortDirection);
    return (
      <TH
        ref={cellRef}
        onClick={
          onClick
            ? () => onClick(primarySortValue, secondarySortValue, sortValueType)
            : null
        }
        sortable={sortable}
        {...otherProps}
      >
        {sortable ? (
          <SortWrap>
            <ButtonWrap>
              <IconCaretUp
                color={
                  sortKey === primarySortValue
                    ? sortDirection === "asc"
                      ? "#0680cd"
                      : "#e5e5e5"
                    : "#e5e5e5"
                }
                hoverColor={
                  sortKey === primarySortValue
                    ? sortDirection === "asc"
                      ? null
                      : "#0680cd"
                    : "#0680cd"
                }
                size={16}
                style={{ marginBottom: "-1.5px" }}
              />
              <IconCaretDown
                color={
                  sortKey === primarySortValue
                    ? sortDirection === "desc"
                      ? "#0680cd"
                      : "#e5e5e5"
                    : "#e5e5e5"
                }
                hoverColor={
                  sortKey === primarySortValue
                    ? sortDirection === "desc"
                      ? null
                      : "#0680cd"
                    : "#0680cd"
                }
                size={16}
                style={{ marginTop: "-1.5px" }}
              />
            </ButtonWrap>
            {children}
          </SortWrap>
        ) : (
          children
        )}
      </TH>
    );
  }
}

HeaderCell.propTypes = {
  children: propTypes.node,
  onClick: propTypes.func,
  cellRef: propTypes.func,
  primarySortValue: propTypes.string,
  secondarySortValue: propTypes.string,
  sortValueType: propTypes.string,
  sortable: propTypes.bool,
  sortDirection: propTypes.oneOf(["", "asc", "desc"]),
  sortKey: propTypes.string,
  style: propTypes.object,
};

export default HeaderCell;
