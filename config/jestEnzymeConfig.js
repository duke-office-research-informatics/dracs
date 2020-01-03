import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { createSerializer } from "enzyme-to-json";
import "jest-styled-components";
import { toHaveNoViolations } from "jest-axe";
import "core-js/stable";
import "regenerator-runtime/runtime";

Enzyme.configure({ adapter: new Adapter() });
expect.addSnapshotSerializer(createSerializer({ mode: "deep" }));
expect.extend(toHaveNoViolations);
