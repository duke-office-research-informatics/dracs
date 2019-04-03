import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import IconCloseCircle from "../../icons/close_circle/close_circle.js";
import theme from "../../theme/theme.js";

const PillBody = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${p => p.backgroundColor};
  border-radius: 5em;
  margin: 4px;
`;

const PillText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: ${p => p.textColor};
  font-size: 0.95em;
  letter-spacing: 0.1em;
  line-height: 1.5;
  margin: 4px 8px;
`;

const PillCancel = styled.div`
  cursor: pointer;
  padding-right: 2px;
`;

class Pill extends React.PureComponent {
  static propTypes = {
    backgroundColor: PropTypes.string,
    cancellable: PropTypes.bool,
    cancelIconColor: PropTypes.string,
    cancelIconHoverColor: PropTypes.string,
    labelText: PropTypes.string.isRequired,
    onCancel: PropTypes.func,
    textColor: PropTypes.string,
    textStyle: PropTypes.object,
    wrapperStyle: PropTypes.object,
  };

  static defaultProps = {
    backgroundColor: theme.colors.darkBlue,
    cancellable: false,
    cancelIconColor: theme.colors.borderDark,
    cancelIconHoverColor: theme.colors.border,
    textColor: theme.colors.bg,
  };

  render() {
    return (
      <PillBody
        backgroundColor={this.props.backgroundColor}
        style={this.props.wrapperStyle}
      >
        <PillText style={this.props.textStyle} textColor={this.props.textColor}>
          {this.props.labelText}
        </PillText>
        {this.props.cancellable ? (
          <PillCancel onClick={this.props.onCancel}>
            <IconCloseCircle
              color={this.props.cancelIconColor}
              hoverColor={this.props.cancelIconHoverColor}
              size={22}
            />
          </PillCancel>
        ) : null}
      </PillBody>
    );
  }
}

export default Pill;
