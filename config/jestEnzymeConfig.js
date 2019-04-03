import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-15";
import { createSerializer } from "enzyme-to-json";
import "jest-styled-components";
import { toHaveNoViolations } from "jest-axe";
import "@babel/polyfill";

Enzyme.configure({ adapter: new Adapter() });
expect.addSnapshotSerializer(createSerializer({ mode: "deep" }));
expect.extend(toHaveNoViolations);
