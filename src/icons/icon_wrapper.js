import styled from "styled-components";

const Icon = styled.svg`
  fill: ${props => props.color};
  vertical-align: top;
  &:hover {
    fill: ${p => (p.hoverColor ? p.hoverColor : null)};
  }
`;

export default Icon;
