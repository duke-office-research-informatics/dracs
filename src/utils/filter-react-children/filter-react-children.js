import React from "react";

export default function(children, predicate) {
  if (children) {
    const result = [];
    React.Children.forEach(children, (entry, idx) => {
      if (predicate && entry && predicate.call(this, entry, idx)) {
        result.push(entry);
      }
    });
    return result;
  }

  return undefined;
}
