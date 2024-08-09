import { HeaderContainer, HeaderContent, NewTranssactionButton } from "./styles";
import logoImg from '../../assets/Logo.svg';
import * as Dialog from '@radix-ui/react-dialog';
import { NewTransactionModal } from "../NewTransactionModal";

export function Header() {
  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logoImg} />
        
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <NewTranssactionButton> Nova Transação</NewTranssactionButton>
          </Dialog.Trigger>
          <NewTransactionModal />
        </Dialog.Root>
      </HeaderContent>
    </HeaderContainer>
  )
}