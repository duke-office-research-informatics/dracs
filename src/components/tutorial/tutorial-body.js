import React from "react";
import propTypes from "prop-types";
import styled from "styled-components";

import { H4 } from "../typography/typography.js";

const TutBody = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  text-align: left;
  padding: ${p => `${p.theme.sizing.base * 2}px`};
  min-height: 110px;
  white-space: normal;
  overflow: hidden;
  backface-visibility: hidden;
`;

const TextWrap = styled(H4)`
  color: ${p => p.theme.colors.subheading};
  max-width: 288px;
  white-space: normal;
  backface-visibility: hidden;
`;

const BodyList = styled.ul`
  color: ${p => p.theme.colors.subheading};
  margin: 0;
  padding: 0 16px;
`;

const BodyItem = styled.li`
  padding: 2px 0;
  backface-visibility: hidden;
`;

const ImgWrap = styled.div`
  align-self: center;
  backface-visibility: hidden;
`;

const TutorialBody = props => {
  const renderBody = () => {
    if (typeof props.body === "string") {
      return <TextWrap>{props.body}</TextWrap>;
    } else if (Array.isArray(props.body)) {
      return (
        <BodyList>
          {props.body.map((item, i) => {
            return (
              <BodyItem key={i}>
                <TextWrap>{item}</TextWrap>
              </BodyItem>
            );
          })}
        </BodyList>
      );
    }
  };

  const renderImage = () => {
    if (typeof props.image === "string") {
      return <img src={props.image} alt="tutorial" />;
    } else {
      return props.image;
    }
  };

  return (
    <TutBody>
      {props.body ? renderBody() : null}
      {props.image ? <ImgWrap>{renderImage()}</ImgWrap> : null}
    </TutBody>
  );
};

TutorialBody.propTypes = {
  body: propTypes.oneOfType([propTypes.string, propTypes.node]),
  image: propTypes.oneOfType([propTypes.string, propTypes.node]),
};

export default TutorialBody;
