/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import type { FC, HTMLAttributes } from 'react';

//* - COMPONENT ------------------------------------------------------------------------- *//
export const Form: FC = (props: HTMLAttributes<HTMLFormElement>) => {
  return (
    <form
      {...props}
      onKeyPress={(e) => {
        if (e.charCode === 13) {
          e.preventDefault();
        }
        if (props.onKeyPress) {
          props.onKeyPress(e);
        }
      }}>
      {props.children}
    </form>
  );
};
