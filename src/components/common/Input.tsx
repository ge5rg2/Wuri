import palette from "../../styles/palette";
import styled from "styled-components";

const Base = styled.input`
  background-color: ${palette.gray[300]};
`;

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  disabled?: boolean;
  types?: React.HTMLInputTypeAttribute;
  ref?: React.RefObject<HTMLInputElement>;
}

const Input: React.FC<Props> = ({ disabled, types, ...props }) => {
  return <Base disabled={disabled} type={types} {...props} />;
};

export default Input;
