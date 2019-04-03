import styled from "styled-components";
import colors from "../../theme/colors/colorTheme.js";

export const SolidDivider = styled.div`
  width: 100%;
  height: 0px;
  border-top: 1px solid ${colors.border};
`;

export const DashedDivider = styled.div`
  width: 100%;
  height: 0px;
  border-top: 1px dashed ${colors.border};
`;
