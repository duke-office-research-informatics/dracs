import React from "react";
import propTypes from "prop-types";
import styled from "styled-components";

import IconProfile from "../../icons/profile/profile.js";

const AvatarWrap = styled.div`
  position: relative;
  ${p =>
    p.displayLetter
      ? "text-align: center;"
      : `display: flex;
       align-items: center;
       justify-content: center;`};
  width: ${p => `${p.size}px`};
  height: ${p => `${p.size}px`};
  min-width: ${p => `${p.size}px`};
  min-height: ${p => `${p.size}px`};
  background-repeat: no-repeat;
  background-size: cover;
  background-color: ${p => p.bgColor};
  border-radius: 50%;
  color: transparent;
  font-size: 0;
  ${p => (p.imgUrl ? `background-image: url(${p.imgUrl});` : null)};
`;

const AvatarLetter = styled.span`
  position: relative;
  top: ${p =>
    `${p.size <= 32 ? (p.size / 3.65).toFixed(3) : (p.size / 4).toFixed(3)}px`};
  color: ${p => (p.color ? p.color : "#fff")};
  vertical-align: top;
  font-size: ${p => `${p.size / 1.5}px`};
  line-height: 0.8;
  text-transform: uppercase;
`;

const StatusIcon = styled.div`
  position: absolute;
  bottom: -4px;
  right: -8px;
  border-radius: 50%;
  overflow: hidden;
`;

const Avatar = props => {
  return (
    <AvatarWrap
      displayLetter={props.displayLetter}
      bgColor={props.bgColor}
      imgUrl={props.imgUrl}
      size={props.size}
    >
      {props.imgUrl ? null : props.displayLetter ? (
        <AvatarLetter color={props.iconColor} size={props.size}>
          {props.displayLetter}
        </AvatarLetter>
      ) : (
        <IconProfile
          color={props.iconColor}
          hoverColor={props.iconHoverColor}
          size={props.size - 2}
        />
      )}
      {props.statusIcon ? <StatusIcon>{props.statusIcon}</StatusIcon> : null}
    </AvatarWrap>
  );
};

Avatar.propTypes = {
  /** CSS-consumable string (hex, rgba, etc) color declaration */
  bgColor: propTypes.string,
  /** if there is no image provided, this letter will show in the avatar */
  displayLetter: propTypes.string,
  /** CSS-consumable string (hex, rgba, etc) color declaration for if there is no image and no displayLetter to set the fallback profile icon color */
  iconColor: propTypes.string,
  /** CSS-consumable string (hex, rgba, etc) color declaration for fallback icon hover color */
  iconHoverColor: propTypes.string,
  /** url - declared as string that points to image to be used in avatar */
  imgUrl: propTypes.string,
  /** number representing desired size (in px) of avatar */
  size: propTypes.number,
  /**optional status icon - react element */
  statusIcon: propTypes.object,
};

Avatar.defaultProps = {
  bgColor: "transparent",
  size: 32,
};

export default Avatar;
