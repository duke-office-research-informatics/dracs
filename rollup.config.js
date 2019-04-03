import json from "rollup-plugin-json";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import babel from "rollup-plugin-babel";
import svg from "rollup-plugin-svg";
import uglify from "rollup-plugin-uglify";
import filesize from "rollup-plugin-filesize";
import replace from "rollup-plugin-replace";
import pkg from "./package.json";

export default {
  input: "src/index.js",
  output: [
    { name: "dracs", file: pkg.main, format: "cjs" }, //commonJS (legacy/node)
    { name: "dracs", file: pkg.module, format: "es" }, //ES module -- for bundling
  ],
  external: ["react", "react-dom", "styled-components", "lodash", "prop-types"],
  plugins: [
    json(),
    svg(),
    resolve({
      jsnext: true,
      extensions: [".js", ".jsx", ".json"],
      customResolveOptions: {
        moduleDirectory: "node_modules",
      },
    }),
    commonjs({
      include: "node_modules/**",
      exclude: "**/*.css",
      namedExports: {
        "./node_modules/react/react.js": [
          "createElement",
          "Children",
          "Component",
          "PureComponent",
        ],
        "node_modules/react-dom/index.js": ["render"],
      },
      sourceMap: false,
    }),
    babel({
      babelrc: false,
      presets: [
        ["@babel/preset-env", { modules: false }],
        "@babel/preset-react",
      ],
      plugins: [
        "@babel/plugin-syntax-dynamic-import",
        "@babel/plugin-syntax-import-meta",
        "@babel/plugin-proposal-class-properties",
        "@babel/plugin-proposal-json-strings",
        [
          "@babel/plugin-proposal-decorators",
          {
            legacy: true,
          },
        ],
        "@babel/plugin-proposal-function-sent",
        "@babel/plugin-proposal-export-namespace-from",
        "@babel/plugin-proposal-numeric-separator",
        "@babel/plugin-proposal-throw-expressions",
        "@babel/plugin-proposal-export-default-from",
        "@babel/plugin-proposal-logical-assignment-operators",
        "@babel/plugin-proposal-optional-chaining",
        [
          "@babel/plugin-proposal-pipeline-operator",
          {
            proposal: "minimal",
          },
        ],
        "@babel/plugin-proposal-nullish-coalescing-operator",
        "@babel/plugin-proposal-do-expressions",
        "@babel/plugin-proposal-function-bind",
        "babel-plugin-styled-components",
      ],
      exclude: "node_modules/**", // only transpile our source code
    }),
    replace({
      "process.env.NODE_ENV": JSON.stringify("production"),
    }),
    uglify({
      mangle: {
        keep_fnames: true,
      },
      compress: {
        keep_fnames: true,
      },
    }),
    filesize(),
  ],
};
