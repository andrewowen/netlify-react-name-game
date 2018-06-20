import React from "react";
import PropTypes from "prop-types";

const Countdown = (props, context) => {
  const d = new Date(context.remaining);
  const { seconds } = {
    seconds: d.getUTCSeconds()
  };
  return <p>{`${seconds}`}</p>;
};

Countdown.contextTypes = {
  remaining: PropTypes.number
};

export default Countdown;
