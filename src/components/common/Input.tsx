import palette from "../../styles/palette";
import styled, { css } from "styled-components";

interface BaseProps {
  disabled?: boolean;
  types?: React.HTMLInputTypeAttribute;
  ref?: React.RefObject<HTMLInputElement>;
  size?: 1 | 2 | 3;
}

const getInputSize = (size?: 1 | 2 | 3) => {
  switch (size) {
    case 1:
      return css`
        padding: 0.5rem 1.2rem; // 8px 19.2px
        font-size: 0.75rem; // 12px
      `;
    case 2:
      return css`
        padding: 0.625rem 1.5rem; // 10px 24px
        font-size: 0.875rem; // 14px
      `;
    case 3:
      return css`
        padding: 0.75rem 1.8rem; // 12px 28.8px
        font-size: 1rem; // 16px
      `;
  }
};

const Base = styled.input<BaseProps>`
  height: 3rem; // 40px
  background-color: ${(props) => props.theme.bgColor} !important;
  color: ${(props) => props.theme.textColor};
  border-radius: 10px;
  border: 1px solid
    ${(props) =>
      props.theme.mode === "dark" ? palette.gray[700] : palette.gray[200]};
  outline: none;

  &:focus {
    border: 1px solid
      ${(props) =>
        props.theme.mode === "dark" ? palette.gray[600] : palette.gray[400]};
  }

  ${({ size }) => getInputSize(size)};
`;

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  disabled?: boolean;
  types?: React.HTMLInputTypeAttribute;
  ref?: React.RefObject<HTMLInputElement>;
  size?: 1 | 2 | 3;
}

const Input: React.FC<Props> = ({ disabled, types, size, ...props }) => {
  return <Base disabled={disabled} size={size} type={types} {...props} />;
};

export default Input;
