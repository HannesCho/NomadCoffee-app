import styled from "styled-components/native";

export const TextInput = styled.TextInput`
  background-color: ${(props) => props.theme.fontColor};
  padding: 15px 7px;
  border-radius: 4px;
  color: ${(props) => props.theme.inputColor};
  margin-bottom: ${(props) => (props.lastOne ? "15" : 8)}px;
`;
