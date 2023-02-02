import palette from "../../styles/palette";
import styled from "styled-components";

const Base = styled.input`
  background-color: ${palette.gray[300]};
`;

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  disabled?: boolean;
  types?: React.HTMLInputTypeAttribute;
  label?: React.ReactNode;
}

const Input: React.FC<Props> = ({ disabled, types, label }) => {
  return (
    <label>
      {label}
      <Base disabled={disabled} type={types} />
    </label>
  );
};

export default Input;
