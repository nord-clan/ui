import styled from '@emotion/styled';

interface IDialogWrapperStyle {
  isNotAnimate: boolean;
  isVisible: boolean;
  isLock: boolean;
}

export const DialogWrapperStyle = styled.div<IDialogWrapperStyle>`
  width: 100vw;
  height: 100vh;

  position: fixed;
  top: 0;
  left: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  &::after {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    z-index: -10;
    background: rgba(0, 0, 0, 0.15);
    width: 100%;
    height: 100%;
  }

  ${({ isVisible, isNotAnimate }) =>
    isNotAnimate || !isVisible
      ? ''
      : `
        &:before {
            animation: dialog-open-before 0.4s cubic-bezier(0.075, 0.82, 0.165, 1);
        }

        .dialog {
            animation: dialog-open 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
        }
    `}

  ${({ isLock, isNotAnimate }) =>
    isNotAnimate || !isLock
      ? ''
      : `
        &:before {
            animation: dialog-close-before 0.4s cubic-bezier(0.215, 0.61, 0.355, 1);
        }

        .dialog {
            animation: dialog-close 0.4s cubic-bezier(0.215, 0.61, 0.355, 1);
        }
    `}
`;
