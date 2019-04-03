import colors from "../../theme/colors/colorTheme.js";
import styled from "styled-components";
import propTypes from "prop-types";

export const P = styled.p`
  font-family: "Roboto", "Open-Sans", Sans-Serif;
  font-size: 0.875em;
  line-height: ${props => (props.expanded ? "1.43em" : "1.15em")};
  color: ${props => (props.color ? props.color : colors.base)};
  font-weight: ${props => (props.bold ? 700 : 400)};
  ${props => (props.italic ? "font-style: italic" : null)};
  margin: ${props => (props.margin ? props.margin + "px 0" : "4px 0")};
  padding: 0;
`;

P.propTypes = {
  /** Bolean indicating whether or not text is bolded */
  bold: propTypes.bool,
  /** CSS-consumable string (hex, rgba, etc) color declaration */
  color: propTypes.string,
  /** Boolean to set larger line-height on text */
  expanded: propTypes.bool,
  /** Boolean indicating whether or not text is italicized */
  italic: propTypes.bool,
  /** Number of pixels for desired top & bottom margin */
  margin: propTypes.number,
};

export const H1 = styled.h1`
  font-family: "Roboto", "Open-Sans", Sans-Serif;
  font-size: 2.625em;
  line-height: 1.16em;
  color: ${props => (props.color ? props.color : colors.base)};
  font-weight: ${props => (props.bold ? 700 : 400)};
  ${props => (props.italic ? "font-style: italic" : null)};
  margin: ${props => (props.margin ? props.margin + "px 0" : "4px 0")};
  padding: 0;
`;

H1.propTypes = {
  /** Bolean indicating whether or not text is bolded */
  bold: propTypes.bool,
  /** CSS-consumable string (hex, rgba, etc) color declaration */
  color: propTypes.string,
  /** Boolean indicating whether or not text is italicized */
  italic: propTypes.bool,
  /** Number of pixels for desired top & bottom margin */
  margin: propTypes.number,
};

export const H2 = styled.h2`
  font-family: "Roboto", "Open-Sans", Sans-Serif;
  font-size: 2.125em;
  line-height: 1.18em;
  color: ${props => (props.color ? props.color : colors.base)};
  font-weight: ${props => (props.bold ? 700 : 400)};
  ${props => (props.italic ? "font-style: italic" : null)};
  margin: ${props => (props.margin ? props.margin + "px 0" : "4px 0")};
  padding: 0;
`;

H2.propTypes = {
  /** Bolean indicating whether or not text is bolded */
  bold: propTypes.bool,
  /** CSS-consumable string (hex, rgba, etc) color declaration */
  color: propTypes.string,
  /** Boolean indicating whether or not text is italicized */
  italic: propTypes.bool,
  /** Number of pixels for desired top & bottom margin */
  margin: propTypes.number,
};

export const H3 = styled.h3`
  font-family: "Roboto", "Open-Sans", Sans-Serif;
  font-size: 1.5em;
  line-height: 1.35em;
  color: ${props => (props.color ? props.color : colors.base)};
  font-weight: ${props => (props.bold ? 700 : 400)};
  ${props => (props.italic ? "font-style: italic" : null)};
  margin: ${props => (props.margin ? props.margin + "px 0" : "4px 0")};
  padding: 0;
`;

H3.propTypes = {
  /** Bolean indicating whether or not text is bolded */
  bold: propTypes.bool,
  /** CSS-consumable string (hex, rgba, etc) color declaration */
  color: propTypes.string,
  /** Boolean indicating whether or not text is italicized */
  italic: propTypes.bool,
  /** Number of pixels for desired top & bottom margin */
  margin: propTypes.number,
};

export const H4 = styled.h4`
  font-family: "Roboto", "Open-Sans", Sans-Serif;
  font-size: 1em;
  line-height: 1.5em;
  color: ${props => (props.color ? props.color : colors.subheading)};
  font-weight: ${props => (props.bold ? 700 : 400)};
  ${props => (props.italic ? "font-style: italic" : null)};
  margin: ${props => (props.margin ? props.margin + "px 0" : "4px 0")};
  padding: 0;
`;

H4.propTypes = {
  /** Bolean indicating whether or not text is bolded */
  bold: propTypes.bool,
  /** CSS-consumable string (hex, rgba, etc) color declaration */
  color: propTypes.string,
  /** Boolean indicating whether or not text is italicized */
  italic: propTypes.bool,
  /** Number of pixels for desired top & bottom margin */
  margin: propTypes.number,
};

export const H5 = styled.h5`
  font-family: "Roboto", "Open-Sans", Sans-Serif;
  font-size: 0.875em;
  line-height: ${props => (props.expanded ? "1.43em" : "1.15em")};
  color: ${props => (props.color ? props.color : colors.muted)};
  font-weight: ${props => (props.bold ? 700 : 400)};
  ${props => (props.italic ? "font-style: italic" : null)};
  margin: ${props => (props.margin ? props.margin + "px 0" : "4px 0")};
  padding: 0;
`;

H5.propTypes = {
  /** Bolean indicating whether or not text is bolded */
  bold: propTypes.bool,
  /** CSS-consumable string (hex, rgba, etc) color declaration */
  color: propTypes.string,
  /** Boolean to set larger line-height on text */
  expanded: propTypes.bool,
  /** Boolean indicating whether or not text is italicized */
  italic: propTypes.bool,
  /** Number of pixels for desired top & bottom margin */
  margin: propTypes.number,
};
