import React, { useState } from 'react';
import { compose } from 'recompose';

import { withTheme } from 'styled-components';

import { defaultProps } from '../../default-props';

import { Box } from '../Box';
import { Keyboard } from '../Keyboard';
import { normalizeColor, parseMetricToNum } from '../../utils';
import { withForwardRef } from '../hocs';

const DIRECTION_PROPS = {
  horizontal: {
    cursor: 'col-resize',
    fill: 'vertical',
  },
  vertical: {
    cursor: 'row-resize',
    fill: 'horizontal',
  },
};

const EdgeControl = ({
  color,
  direction,
  edge,
  forwardRef,
  onDecrease,
  onIncrease,
  theme,
  ...rest
}) => {
  const [focused, setFocused] = useState(false);
  const { cursor, fill } = DIRECTION_PROPS[direction];
  const size = parseMetricToNum(theme.global.spacing) / 2;
  const keyboardProps =
    direction === 'vertical'
      ? { onUp: onDecrease, onDown: onIncrease }
      : { onLeft: onDecrease, onRight: onIncrease };
  const boxDirection = direction === 'vertical' ? 'row' : 'column';
  const type =
    (theme.rangeSelector &&
      theme.rangeSelector.edge &&
      theme.rangeSelector.edge.type) ||
    'disc';

  let node;
  if (type === 'bar') {
    node = (
      <Box
        flex
        justifySelf="stretch"
        width={`${size}px`}
        background={normalizeColor(color || 'control', theme)}
        border={focused ? { color: normalizeColor('focus', theme) } : undefined}
      />
    );
  } else if (type === 'disc') {
    node = (
      <Box
        width={`${size + (focused ? 2 : 0)}px`}
        height={`${size + (focused ? 2 : 0)}px`}
        round="full"
        background={normalizeColor(color || 'control', theme)}
        border={focused ? { color: normalizeColor('focus', theme) } : undefined}
      />
    );
  } else {
    node = type;
  }
  return (
    <Keyboard {...keyboardProps}>
      <Box
        direction={boxDirection}
        style={{ flex: '0 0 1px' }}
        overflow="visible"
        align="center"
        justify="center"
      >
        <Box
          ref={forwardRef}
          direction={boxDirection}
          justify="center"
          align="center"
          basis="full"
          fill={fill}
          style={{
            cursor,
            minWidth: size,
            minHeight: size,
            zIndex: 10,
          }}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...rest}
        >
          {node}
        </Box>
      </Box>
    </Keyboard>
  );
};

EdgeControl.defaultProps = {};
Object.setPrototypeOf(EdgeControl.defaultProps, defaultProps);

const EdgeControlWrapper = compose(
  withForwardRef,
  withTheme,
)(EdgeControl);

export { EdgeControlWrapper as EdgeControl };
