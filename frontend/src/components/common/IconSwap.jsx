import React from 'react';

/**
 * transitions-dev: 09-icon-swap
 * Cross-fades two icons in the same slot using pure CSS grid stacking.
 * 
 * Props:
 * - state: 'a' | 'b' (or boolean: true -> 'a', false -> 'b')
 * - iconA: ReactNode (rendered when state === 'a')
 * - iconB: ReactNode (rendered when state === 'b')
 * - className: optional extra class string
 * - style: optional inline styles for container
 */
const IconSwap = ({ state = 'a', iconA, iconB, className = '', style = {} }) => {
  const activeState = typeof state === 'boolean' ? (state ? 'a' : 'b') : state;

  return (
    <span 
      className={`t-icon-swap ${className}`.trim()} 
      data-state={activeState}
      style={style}
    >
      <span className="t-icon" data-icon="a">{iconA}</span>
      <span className="t-icon" data-icon="b">{iconB}</span>
    </span>
  );
};

export default IconSwap;
