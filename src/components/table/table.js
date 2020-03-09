import React from "react";
import propTypes from "prop-types";
import styled from "styled-components";
import _ from "lodash";
import elementResizeEvent from "element-resize-event";

import filterReactChildren from "../../utils/filter-react-children/filter-react-children.js";

import StickyColumn, { StickyColumnWrap } from "./sticky-column.js";
import StickyHeader, { StickyHeaderWrap } from "./sticky-header.js";
import StickyCorner, { StickyCornerWrap } from "./sticky-corner.js";

import TableWrap from "./table-container.js";
import TableHead from "./head-container.js";
import TableBody from "./body-container.js";
import HeaderCell from "./header-cell.js";
import Row from "./row.js";
import Cell from "./cell.js";

const XScrollbar = styled.div``;
const YScrollbar = styled.div``;
const TableYWrap = styled.div``;
const TableXWrap = styled.div``;

const ElementWrap = styled.div`
  box-sizing: border-box;
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
  transform: translateZ(0);
  display: block;
  ${StickyCornerWrap}{
    position: absolute;
    left: 0;
    top: 0;
    z-index: 3;
    box-sizing: border-box;
    box-shadow: 3px -1px 4px 0 rgba(0, 0, 0, 0.2);
    transform: translateZ(0);
  }
  ${StickyHeaderWrap}{
    position: absolute;
    z-index: 2;
    border-bottom: 2px solid #e5e5e5;
    transform: translateZ(0);
  }
   ${StickyColumnWrap}{
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
    box-shadow: 3px 0 7px 0 rgba(0, 0, 0, 0.2);
    transform: translateZ(0);
  }
   ${StickyHeaderWrap}, ${StickyColumnWrap}, ${StickyCornerWrap}{
    background-color: #fff;
    display: block;
  }
   ${TableYWrap},${TableXWrap}{
    z-index: 0;
    position: relative;
    -webkit-overflow-scrolling: touch;
    transform: translateZ(0);
  }
   ${TableXWrap}{
    width: 100%;
    overflow-x: auto;
    transform: translateZ(0);
    &::webkit-scrollbar{
      display: none;
    }
  }
   ${TableYWrap}{
    height: 100%;
    overflow-y: auto;
    /* Hack to hide scrollbars */
    padding-right: 17px;
    margin-right: -17px;
    transform: translateZ(0);
    &::webkit-scrollbar{
      display: none;
    }
  }
   ${XScrollbar}, ${YScrollbar}{
    position: absolute;
    background-color: transparent;
    z-index: 5;
    overflow: auto;
    transform: translateZ(0);
  }
  ${XScrollbar}{
    left: 0px;
    bottom: 0px;
    height: 20px;
    width: 100%;
  }
  ${YScrollbar}{
    right: 0px;
    top: 0px;
    height: 100%;
    width: 20px !important;
  }
  ${XScrollbar} div {
  height: 100%;
  }
  ${YScrollbar} div {
  height: 100%;
  }
  th, tr, td, tbody, table {
    box-sizing: border-box;
    border-collapse: separate;
    border-spacing: 0px;
  }
  tbody, table {
    transform: translateZ(0);
  }
  th{
    white-space: nowrap;
  }
  td{
    border-bottom: solid 1px ${p => p.theme.colors.border};
  }
`;

const isTableHead = child => {
  if (child.props.isTableHead) {
    // console.log(child);
    return true;
  } else {
    return false;
  }
};
const isTableBody = child => {
  if (child.props.isTableBody) {
    return true;
  } else {
    return false;
  }
};
const isTableRow = child => {
  if (child.props.isTableRow) {
    return true;
  } else {
    return false;
  }
};
class Table extends React.PureComponent {
  static propTypes = {
    children: propTypes.node,
    getRowTuples: propTypes.func,
    highlightRowOnHover: propTypes.bool,
    onChange: propTypes.func,
    multiSelectable: propTypes.bool,
    onRowClick: propTypes.bool,
    onRowMouseEnter: propTypes.func,
    onRowMouseLeave: propTypes.func,
    onRowSelect: propTypes.func,
    rowHoverColor: propTypes.string,
    selectable: propTypes.bool,
    selected: propTypes.array,
    resizeTimeout: propTypes.number,
    responsiveStickyColumn: propTypes.bool,
    stickyColumn: propTypes.bool,
    stickyColumnCount: propTypes.number,
    stickyHeader: propTypes.bool,
  };

  static defaultProps = {
    multiSelectable: false,
    resizeTimeout: 325,
    responsiveStickyColumn: true,
    rowHoverColor: "#f6f5f4",
    selectable: false,
    selected: [],
    stickyColumn: false,
    stickyColumnCount: 0,
    stickyHeader: true,
    source: [],
  };

  constructor(props) {
    super(props);
    this.rowCount = 0;
    this.columnCount = 0;
    this.headerCount = 0;
    this.supressScroll = false;
    this.scrollXScrollbar = _.throttle(this.scrollXScrollbar, 30);
    this.scrollYScrollbar = _.throttle(this.scrollYScrollbar, 30);
    this.state = {
      stickyColumn: props.stickyColumn,
      stickyColumnCount: props.stickyColumnCount,
    };
  }

  componentDidMount() {
    if (this.table) {
      this.xWrapper.addEventListener("scroll", this.onScrollX);
      this.addStickyColumn();
      if (this.stickyColumn)
        elementResizeEvent(this.stickyColumn, this.onColumnResize);
      elementResizeEvent(this.tableElement, this.onResize);
      elementResizeEvent(this.table, this.addStickyColumn);
      if (this.resizeTimeout) clearTimeout(this.resizeTimeout);
      this.onResize();
      //account for transforms/animations affecting size
      if (this.resizeTimeout) clearTimeout(this.resizeTimeout);
      this.resizeTimeout = setTimeout(() => {
        this.onResize();
      }, this.props.resizeTimeout);
      this.addScrollBarEventHandlers();
      this.setScrollBarWrapperDims();
    }
  }

  componentDidUpdate() {
    if (this.table) {
      this.onResize();
      this.setScrollBarWrapperDims();
    }
  }

  componentWillUnmount() {
    if (this.xWrapper) {
      this.xWrapper.removeEventListener("scroll", this.onScrollX);
      this.xWrapper.removeEventListener("scroll", this.scrollXscrollBar);
    }
    if (this.xScrollbar) {
      this.xScrollbar.removeEventListener("scroll", this.scrollXWrapper);
    }
    if (this.yWrapper) {
      this.yWrapper.removeEventListener("scroll", this.scrollYScrollbar);
    }
    if (this.yScrollbar) {
      this.yScrollbar.removeEventListener("scroll", this.scrollYWrapper);
    }
  }

  onResize = () => {
    requestAnimationFrame(() => {
      this.setRowHeights();
      this.setColumnWidths();
      this.setScrollBarDims();
    });
  };

  onColumnResize = () => {
    this.onResize();
    this.setScrollBarWrapperDims();
  };

  addScrollBarEventHandlers = () => {
    //x scrollbars
    if (this.xWrapper) {
      this.xWrapper.addEventListener("scroll", this.scrollXscrollBar);
    }
    if (this.xScrollbar) {
      this.xScrollbar.addEventListener("scroll", this.scrollXWrapper);
    }
    //y scrollbars
    if (this.yWrapper) {
      this.yWrapper.addEventListener("scroll", this.scrollYScrollbar);
    }
    if (this.yScrollbar) {
      this.yScrollbar.addEventListener("scroll", this.scrollYWrapper);
    }
  };

  onScrollX = () => {
    const scrollLeft = Math.max(this.xWrapper.scrollLeft, 0);
    if (this.stickyHeader) {
      requestAnimationFrame(() => {
        this.stickyHeader.style.transform =
          "translate(" + -1 * scrollLeft + "px, 0)";
      });
    }
  };

  scrollXWrapper = () => {
    if (this.xScrollbar) {
      if (!this.suppressScroll) {
        requestAnimationFrame(() => {
          this.xWrapper.scrollLeft = this.xScrollbar.scrollLeft;
          this.suppressScroll = true;
        });
      } else {
        this.suppressScroll = false;
      }
    }
  };

  scrollXScrollbar = () => {
    if (this.xScrollbar) {
      if (!this.suppressScroll) {
        requestAnimationFrame(() => {
          this.xScrollbar.scrollLeft = this.xWrapper.scrollLeft;
          this.suppressScroll = true;
        });
      } else {
        this.suppressScroll = false;
      }
    }
  };

  scrollYWrapper = () => {
    if (this.yScrollbar) {
      if (!this.suppressScroll) {
        requestAnimationFrame(() => {
          this.yWrapper.scrollTop = this.yScrollbar.scrollTop;
          this.suppressScroll = true;
        });
      } else {
        this.suppressScroll = false;
      }
    }
  };

  scrollYScrollbar = () => {
    if (this.yScrollbar) {
      if (!this.suppressScroll) {
        requestAnimationFrame(() => {
          this.yScrollbar.scrollTop = this.yWrapper.scrollTop;
          this.suppressScroll = true;
        });
      } else {
        this.suppressScroll = false;
      }
    }
  };

  setScrollBarWrapperDims = () => {
    requestAnimationFrame(() => {
      if (this.stickyColumn && this.xScrollbar) {
        this.xScrollbar.style.width =
          "calc(100% - " + this.stickyColumn.offsetWidth + "px)";
        this.xScrollbar.style.left = this.stickyColumn.offsetWidth + "px";
      } else if (this.xScrollbar) {
        this.xScrollbar.style.width = "100%";
        this.xScrollbar.style.left = 0;
      }

      if (this.stickyHeader && this.yScrollbar) {
        this.yScrollbar.style.width =
          "calc(100% - " + this.stickyHeader.offsetHeight + "px)";
        this.yScrollbar.style.top = this.stickyHeader.offsetHeight + "px";
      } else if (this.yScrollbar) {
        this.yScrollbar.style.width = "100%";
        this.yScrollbar.style.top = 0;
      }
    });
  };

  setScrollBarDims = () => {
    if (this.stickyColumn && this.xScrollbar) {
      this.xScrollbar.firstChild.style.width =
        this.tableElement.firstChild.getBoundingClientRect().width -
        this.stickyColumn.offsetWidth +
        "px";
    } else if (this.xScrollbar) {
      this.xScrollbar.firstChild.style.width =
        this.tableElement.firstChild.getBoundingClientRect().width + "px";
    }

    if (this.stickyHeader && this.yScrollbar) {
      this.yScrollbar.firstChild.style.height =
        this.tableElement.getBoundingClientRect().height -
        this.stickyHeader.offsetHeight +
        "px";
    } else if (this.yScrollbar) {
      this.yScrollbar.firstChild.style.height =
        this.tableElement.getBoundingClientRect().height + "px";
    }
  };

  addStickyColumn = () => {
    if (this.props.responsiveStickyColumn && this.table && this.tableElement) {
      const TableWidth = this.tableElement.getBoundingClientRect().width;
      const ParentWidth = this.table.getBoundingClientRect().width;
      if (ParentWidth < TableWidth) {
        if (!this.state.stickyColumn && this.state.stickyColumnCount === 0) {
          this.setState(
            {
              stickyColumn: true,
              stickyColumnCount: 1,
            },
            () => {
              elementResizeEvent(this.stickyColumn, this.onColumnResize);
            }
          );
        }
      } else if (ParentWidth >= TableWidth) {
        if (this.state.stickyColumn && this.state.stickyColumnCount !== 0) {
          this.setState({
            stickyColumn: false,
            stickyColumnCount: 0,
          });
        }
      }
    }
  };

  setRowHeights = () => {
    let r, cellToCopy, height;

    if (this.props.stickyHeader) {
      for (r = 0; r < this.headerCount; r++) {
        cellToCopy = this[`stickyHeaderCell_${r}`];
        if (cellToCopy) {
          height = cellToCopy.getBoundingClientRect().height;

          if (this[`stickyColumnHeaderRow_${r}`]) {
            const refName = `stickyColumnHeaderRow_${r}`;
            Array.from(this[refName].childNodes).forEach(child => {
              //eslint-disable-line no-loop-func
              if (child.tagName === "TD" || child.tagName === "TH") {
                child.style.height = `${height}px`;
                child.style.maxHeight = `${height}px`;
              }
            });
          }

          if (r === 0 && this.stickyCorner) {
            const refName = `stickyCornerRow_${r}`;
            Array.from(this[refName].childNodes).forEach(child => {
              //eslint-disable-line no-loop-func
              if (child.tagName === "TD" || child.tagName === "TH") {
                child.style.height = `${height}px`;
              }
            });
          }
        }
      }
    }
    if (this.state.stickyColumn) {
      for (r = 0; r < this.rowCount; r++) {
        cellToCopy = this[`tableRow_${r}`].firstChild;
        height = cellToCopy.getBoundingClientRect().height;
        if (this[`stickyColumnRow_${r}`]) {
          const refName = `stickyColumnRow_${r}`;
          Array.from(this[refName].childNodes).forEach(child => {
            //eslint-disable-line no-loop-func
            if (child.tagName === "TD" || child.tagName === "TH") {
              child.style.height = `${height}px`;
              child.style.maxHeight = `${height}px`;
            }
          });
        }
      }
    }
  };

  setColumnWidths = () => {
    let c, cellToCopy, width, cell;
    for (c = 0; c < this.columnCount; c++) {
      if (
        this.tableHeaderRow_0 &&
        this.tableHeaderRow_0.childNodes &&
        this.tableHeaderRow_0.childNodes[c] &&
        this.tableHeaderRow_0.childNodes[c].tagName === "TH"
      ) {
        cellToCopy = this.tableHeaderRow_0.childNodes[c];
      }

      if (cellToCopy) {
        width = cellToCopy.getBoundingClientRect().width;

        if (this.stickyHeader && this[`stickyHeaderCell_${c}`]) {
          cell = this[`stickyHeaderCell_${c}`];
          cell.style.width = `${width}px`;
          cell.style.minWidth = `${width}px`;
        }

        if (this.state.stickyColumnCount) {
          if (this[`stickyCornerRow_${c}`]) {
            Array.from(this[`stickyCornerRow_${c}`].childNodes).forEach(
              child => {
                //eslint-disable-line no-loop-func
                if (child.tagName === "TD" || child.tagName === "TH") {
                  child.style.width = `${width}px`;
                  child.style.minWidth = `${width}px`;
                }
              }
            );
          }

          if (this[`stickyColumnHeaderRow_${c}`]) {
            Array.from(this[`stickyColumnHeaderRow_${c}`].childNodes).forEach(
              child => {
                //eslint-disable-line no-loop-func
                if (child.tagName === "TD" || child.tagName === "TH") {
                  child.style.width = `${width}px`;
                  child.style.minWidth = `${width}px`;
                }
              }
            );
          }

          if (
            this[`stickyColumnRow_${c}`] &&
            this.state.stickyColumnCount - 1 === c
          ) {
            for (let r = 0; r < this.rowCount; r++) {
              if (this[`stickyColumnRow_${r}`]) {
                Array.from(this[`stickyColumnRow_${r}`].childNodes).forEach(
                  child => {
                    //eslint-disable-line no-loop-func
                    child.style.width = `${width}px`;
                    child.style.minWidth = `${width}px`;
                  }
                );
              }
            }
          }
        }
      }
    }
  };

  handleRowMouseEnter = r => {
    requestAnimationFrame(() => {
      if (this.props.highlightRowOnHover) {
        requestAnimationFrame(() => {
          this[
            `tableRow_${r}`
          ].style.backgroundColor = this.props.rowHoverColor;
          if (this.stickyColumn)
            this[
              `stickyColumnRow_${r}`
            ].style.backgroundColor = this.props.rowHoverColor;
        });
      }
      if (this.props.onRowMouseEnter)
        requestAnimationFrame(() => this.props.onRowMouseEnter(r));
    });
  };

  handleRowMouseLeave = r => {
    if (this.props.highlightRowOnHover) {
      requestAnimationFrame(() => {
        this[`tableRow_${r}`].style.backgroundColor = "#fff";
        if (this.stickyColumn)
          this[`stickyColumnRow_${r}`].style.backgroundColor = "#fff";
      });
    }
    if (this.props.onRowMouseLeave)
      requestAnimationFrame(() => this.props.onRowMouseLeave(r));
  };

  handleHeadSelect = value => {
    if (this.props.onRowSelect) {
      if (this.props.multiSelectable) {
        this.props.onRowSelect(
          value ? this.getRowTuples().map(item => item[0]) : []
        );
      }
    }
  };

  handleRowSelect = r => {
    if (this.props.onRowSelect) {
      if (this.props.multiSelectable) {
        const current = this.props
          .getRowTuples()
          .filter(item => item[1])
          .map(item => item[0]);
        const rowIndex = current.indexOf(r);
        const indices =
          rowIndex !== -1
            ? [current.slice(0, rowIndex), ...current.slice(rowIndex + 1)]
            : [...current, r];
        this.props.onRowSelect(indices);
      } else {
        this.props.onRowSelect[r];
      }
    }
  };

  handleRowChange = () => {};

  handleRowClick = e => {
    if (this.props.onRowClick) this.props.onRowClick(e);
  };

  getRowTuples = () =>
    React.Children.toArray(
      filterReactChildren(this.props.children, isTableRow)
    ).map((child, index) => [index, Boolean(child.props.selected)]);

  renderHeader = () => {
    const tuples = this.getRowTuples();
    const selected = tuples.filter(item => item[1]).length === tuples.length;
    const Table = this;
    return React.Children.map(
      filterReactChildren(this.props.children, isTableHead),
      child =>
        React.Children.map(
          filterReactChildren(child.props.children, isTableRow),
          (row, r) =>
            React.cloneElement(row, {
              key: `tableHeaderRow_${r}`,
              rowRef: node => {
                Table[`tableHeaderRow_${r}`] = node;
              },
              selected,
              multiSelectable: Table.props.multiSelectable,
              onSelect: Table.handleHeadSelect,
              selectable: Table.props.selectable,
            })
        )
    );
  };

  renderBody = () => {
    const Table = this;
    return React.Children.map(
      filterReactChildren(this.props.children, isTableBody),
      child =>
        React.Children.map(
          filterReactChildren(child.props.children, isTableRow),
          (row, r) =>
            React.cloneElement(row, {
              key: `tableRow_${r}`,
              rowRef: node => {
                Table[`tableRow_${r}`] = node;
              },
              onMouseEnter: Table.handleRowMouseEnter.bind(this, r),
              onMouseLeave: Table.handleRowMouseLeave.bind(this, r),
              onSelect: Table.handleRowSelect,
              selectable: Table.props.selectable,
            })
        )
    );
  };

  render() {
    const { stickyHeader } = this.props;
    const { stickyColumn, stickyColumnCount } = this.state;

    const header = this.renderHeader();
    const body = this.renderBody();

    this.headerCount = header.length;
    this.rowCount = body.length;
    this.columnCount =
      (header[0] && React.Children.toArray(header[0].props.children).length) ||
      0;

    return (
      <ElementWrap ref={node => (this.table = node)}>
        <XScrollbar
          ref={node => {
            this.xScrollbar = node;
          }}
        >
          <div />
        </XScrollbar>
        <YScrollbar
          ref={node => {
            this.yScrollbar = node;
          }}
        >
          <div />
        </YScrollbar>
        {stickyColumn && stickyHeader && header.length ? (
          <StickyCorner
            rows={header}
            count={stickyColumnCount}
            cornerRef={node => (this.stickyCorner = node)}
            rowRef={(node, r) => {
              const name = `stickyCornerRow_${r}`;
              this[name] = node;
            }}
          />
        ) : null}
        {stickyHeader && header.length ? (
          <StickyHeader
            rows={header}
            headerRef={node => (this.stickyHeader = node)}
            rowRef={node => (this.stickyHeaderRow = node)}
            cellRef={(node, c) => {
              const name = `stickyHeaderCell_${c}`;
              this[name] = node;
            }}
          />
        ) : null}
        <TableYWrap ref={node => (this.yWrapper = node)}>
          {stickyColumn && header.length && body.length ? (
            <StickyColumn
              header={header}
              body={body}
              count={stickyColumnCount}
              columnRef={node => (this.stickyColumn = node)}
              headerRowRef={(node, r) => {
                const name = `stickyColumnHeaderRow_${r}`;
                this[name] = node;
              }}
              bodyRowRef={(node, r) => {
                const name = `stickyColumnRow_${r}`;
                this[name] = node;
              }}
              onRowMouseEnter={this.handleRowMouseEnter}
              onRowMouseLeave={this.handleRowMouseLeave}
            />
          ) : null}
          <TableXWrap
            ref={node => {
              this.xWrapper = node;
            }}
          >
            <TableWrap tableWrapRef={node => (this.tableElement = node)}>
              <TableHead>{header}</TableHead>
              <TableBody>{body}</TableBody>
            </TableWrap>
          </TableXWrap>
        </TableYWrap>
      </ElementWrap>
    );
  }
}

export { Table, TableWrap, TableHead, TableBody, Row, Cell, HeaderCell };
