import styled from '@emotion/styled';

type ICheckboxStyledTypes = {
  isActive?: boolean;
};
export const CheckboxStyled = styled.div<ICheckboxStyledTypes>`
  position: relative;
  background-color: ${({ theme }) => theme.palette.bg.mainContent};
  border: 2px solid ${({ theme }) => theme.palette.border.content};
  border-radius: 10px;
  color: ${({ theme }) => theme.palette.color.text};
  min-width: 160px;
  font-size: 0.8rem;
  text-align: center;
  cursor: pointer;

  > button {
    padding: 5px 10px;
    cursor: pointer;
    color: ${({ theme }) => theme.palette.color.text};
  }

  > svg {
    position: absolute;
    width: 22px;
    height: 22px;
    top: -10px;
    right: -5px;
    opacity: 0;
    transform: scale(0);
    transition: all 0.2s ease-out;
    padding: 1px;
  }

  ${({ theme, isActive }) =>
    isActive &&
    `
      border: 2px solid ${theme.palette.bg.highlight};
      box-shadow: 0 0 3px ${theme.palette.bg.highlight};

 
      > svg {
        border: 2px solid ${theme.palette.bg.highlight};
        background-color:  ${theme.palette.bg.mainContent};
        box-shadow: 0 0 3px ${theme.palette.bg.highlight};
        
        border-radius: 50%;
        opacity: 1;
        transform: scale(1);
        transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        fill: ${theme.palette.bg.highlight};
      }
    `}
`;
