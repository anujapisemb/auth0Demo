import React from "react";

const SvgIcon = (props) => {
  return (
    <props.name
      style={props.style}
      width={props.width || 25}
      height={props.height || 25}
      fill={props.color || 'transparent'}
    />
  );
};

export default SvgIcon;
