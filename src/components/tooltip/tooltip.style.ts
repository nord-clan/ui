import styled from '@emotion/styled';
import { breakpoint } from '#/shared/theme';

export const TooltipStyled = styled.div`
  display: inline-block;

  .tooltip {
    border-radius: 6px;
    padding: 8px;
    line-height: 1.5;
    z-index: 99999;
    opacity: 0.95;
    box-shadow: 0px 0px 10px rgba(44, 38, 56, 0.02), 0px 8px 20px rgba(44, 38, 56, 0.04);
    max-width: 600px;

    color: ${({ theme }) => theme.palette.color.textInvert};
    font-weight: 400;
    font-size: 1rem;

    background-color: ${({ theme }) => theme.palette.bg.modal};

    ${breakpoint('md')} {
      max-width: 300px;
    }
  }
`;
