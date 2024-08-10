import { MagnifyingGlass } from "phosphor-react";
import { SearchFormContainer } from "./styles";
import { useForm } from "react-hook-form";
import * as zod from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { TransactionContext } from "../../../../contexts/TransactionsContext";
import { useContextSelector } from "use-context-selector";


const searchFormSchema = zod.object({
  query: zod.string(),
})

type SeachFormInput = zod.infer<typeof searchFormSchema>

export function SearchForm(){
  const fetchTransactions = useContextSelector(TransactionContext, (context) => {
    return context.fetchTransactions;
  });

  const {
    register,
    handleSubmit,
    formState: {
      isSubmitting
    }
  } = useForm<SeachFormInput>({
    resolver: zodResolver(searchFormSchema),
  });

  async function handleSearchTransactions(data: SeachFormInput){
    await fetchTransactions(data.query);
  }

  return(
    <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
      <input
        type="text" 
        placeholder="Busque por transações" 
        {...register('query')}
      />
      <button type="submit" disabled={isSubmitting}>
        <MagnifyingGlass size={20} />
        Buscar
      </button>
    </SearchFormContainer>
  )
}