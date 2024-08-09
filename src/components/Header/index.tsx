import { HeaderContainer, HeaderContent, NewTranssactionButton } from "./styles";
import logoImg from '../../assets/Logo.svg';
export function Header() {
  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logoImg} />
        <NewTranssactionButton> Nova Transação</NewTranssactionButton>
      </HeaderContent>
    </HeaderContainer>
  )
}