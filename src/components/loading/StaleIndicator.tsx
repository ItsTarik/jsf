import React from 'react';

import classNames from 'classnames';

export const StaleIndicator = ({
  children,
  isValidating,
}: {
  isValidating: boolean;
  children: React.ReactNode;
}) => (
  <span
    className={classNames({
      'blur-sm': isValidating,
    })}
  >
    {children}
  </span>
);
