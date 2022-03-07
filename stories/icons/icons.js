import React from "react";
import { storiesOf } from "@storybook/react";
import {
  withKnobs,
  number,
  boolean,
  color,
} from "@storybook/addon-knobs/react";
import { withInfo } from "@storybook/addon-info";
import {
  P,
  Card,
  theme,
  IconAddCircle,
  IconAddCircleFilled,
  IconApps,
  IconAssignment,
  IconAssignmentClipboard,
  IconAttestation,
  IconBackArrow,
  IconBooks,
  IconBriefcase,
  IconCancel,
  IconCaretDown,
  IconCaretUp,
  IconCart,
  IconCheckCircle,
  IconCheckCircleOutline,
  IconChevLeft,
  IconChevRight,
  IconClose,
  IconCloseArrow,
  IconCloseCircle,
  IconCloseCircleFilled,
  IconCloudCircle,
  IconComparisonArrows,
  IconContacts,
  IconDashboard,
  IconDescription,
  IconDetails,
  IconDownloadFile,
  IconDropdownArrow,
  IconEdit,
  IconEmail,
  IconError,
  IconExpand,
  IconExpandArrow,
  IconFeedback,
  IconFilter,
  IconFinance,
  IconForm,
  IconHelp,
  IconHide,
  IconInbox,
  IconInfo,
  IconLink,
  IconListAlt,
  IconLogout,
  IconMenu,
  IconMortarboard,
  MrhHeaderIcon,
  IconPhone,
  IconPlane,
  IconPostAdd,
  IconProfile,
  IconScienceFlask,
  IconSearch,
  IconSeeMoreHoriz,
  IconSeeMoreVert,
  IconSelectDate,
  IconSettings,
  IconShare,
  IconShow,
  IconSponsored,
  IconStarFilled,
  IconStarHalfFilled,
  IconStarOpen,
  IconSubmitRequest,
  IconSwapHorizontalCircle,
  IconTag,
  IconTrashcan,
  IconViewCards,
  IconViewList,
  IconWarning,
} from "../../src/index.js";

const stories = storiesOf("Icons", module);
const iconList = {
  IconAddCircle: IconAddCircle,
  IconAddCircleFilled: IconAddCircleFilled,
  IconApps: IconApps,
  IconAssignment: IconAssignment,
  IconAssignmentClipboard: IconAssignmentClipboard,
  IconAttestation: IconAttestation,
  IconBackArrow: IconBackArrow,
  IconBooks: IconBooks,
  IconBriefcase: IconBriefcase,
  IconCancel: IconCancel,
  IconCaretDown: IconCaretDown,
  IconCaretUp: IconCaretUp,
  IconCart: IconCart,
  IconCheckCircle: IconCheckCircle,
  IconCheckCircleOutline: IconCheckCircleOutline,
  IconChevLeft: IconChevLeft,
  IconChevRight: IconChevRight,
  IconClose: IconClose,
  IconCloseArrow: IconCloseArrow,
  IconCloseCircle: IconCloseCircle,
  IconCloseCircleFilled: IconCloseCircleFilled,
  IconCloudCircle: IconCloudCircle,
  IconComparisonArrows: IconComparisonArrows,
  IconContacts: IconContacts,
  IconDashboard: IconDashboard,
  IconDescription: IconDescription,
  IconDetails: IconDetails,
  IconDownloadFile: IconDownloadFile,
  IconDropdownArrow: IconDropdownArrow,
  IconEdit: IconEdit,
  IconEmail: IconEmail,
  IconError: IconError,
  IconExpand: IconExpand,
  IconExpandArrow: IconExpandArrow,
  IconFeedback: IconFeedback,
  IconFilter: IconFilter,
  IconFinance: IconFinance,
  IconForm: IconForm,
  IconHelp: IconHelp,
  IconHide: IconHide,
  IconInbox: IconInbox,
  IconInfo: IconInfo,
  IconLink: IconLink,
  IconListAlt: IconListAlt,
  IconLogout: IconLogout,
  IconMenu: IconMenu,
  IconMortarboard: IconMortarboard,
  IconPhone: IconPhone,
  IconPlane: IconPlane,
  IconPostAdd: IconPostAdd,
  IconProfile: IconProfile,
  IconScienceFlask: IconScienceFlask,
  IconSearch: IconSearch,
  IconSeeMoreHoriz: IconSeeMoreHoriz,
  IconSeeMoreVert: IconSeeMoreVert,
  IconSelectDate: IconSelectDate,
  IconSettings: IconSettings,
  IconShare: IconShare,
  IconShow: IconShow,
  IconSponsored: IconSponsored,
  IconStarFilled: IconStarFilled,
  IconStarHalfFilled: IconStarHalfFilled,
  IconStarOpen: IconStarOpen,
  IconSubmitRequest: IconSubmitRequest,
  IconSwapHorizontalCircle: IconSwapHorizontalCircle,
  IconTag: IconTag,
  IconTrashcan: IconTrashcan,
  IconViewCards: IconViewCards,
  IconViewList: IconViewList,
  IconWarning: IconWarning,
  MrhHeaderIcon: MrhHeaderIcon,
};

stories.addDecorator(withKnobs);
/* eslint-disable react/no-unescaped-entities */
stories.add(
  "All Icons",
  withInfo(`
  #### Example declaration:
  ~~~js
  import { IconAddCircle } from 'dracs';
  ~~~
  #### Example usage:
  ~~~js
  <IconAddCircle />
  ~~~
`)(() => (
    /* eslint-disable react/no-unescaped-entities */
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
        gridGap: "1.5rem",
        justifyItems: "center",
        width: "100%",
      }}
    >
      {Object.keys(iconList).map(icon => {
        const Component = iconList[icon];
        return (
          <Card padding="1.5rem" key={icon}>
            <div style={{ margin: "0 auto", paddingBottom: "1rem" }}>
              <Component
                size={32}
                hoverColor={theme.colors.actionHover}
                color={theme.colors.action}
              />
            </div>
            <P>{icon}</P>
          </Card>
        );
      })}
    </div>
  ))
);
/* eslint-enable react/no-unescaped-entities */
