import * as Dialog from '@radix-ui/react-dialog';
import { CloseButton, Content, Overlay, TransactionType, TransactionTypeButton } from './styles';
import { ArrowCircleDown, X } from 'phosphor-react';
import { ArrowCircleUp } from 'phosphor-react';
import * as zod from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TransactionContext } from '../../contexts/TransactionsContext';
import { useContextSelector } from 'use-context-selector';

const newTransactionSchema = zod.object({
  description: zod.string(),
  price: zod.number(),
  category: zod.string(),
  type: zod.enum(['income', 'outcome'])
})

type NewTransactionFormInputs = zod.infer<typeof newTransactionSchema>

export function NewTransactionModal(){
  const createTransaction = useContextSelector(TransactionContext, (context) => {
    return context.createTransaction;
  });

  const {
    control,
    register,
    reset,
    handleSubmit,
    formState: {
      isSubmitting
    }
  } = useForm<NewTransactionFormInputs>({
    resolver: zodResolver(newTransactionSchema)
  })

  async function handleCreateNewTransaction(data: NewTransactionFormInputs){
    const { description, category, price, type } = data;

    await createTransaction({ 
      description,
      category,
      price,
      type
    })

    reset();
  }

    return (
      <Dialog.Portal>
        <Overlay/>
        <Content>
          <Dialog.Title>Nova Transação</Dialog.Title>
          <CloseButton>
            <X size={24}/>
          </CloseButton>
          <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
            <input 
              type="text" 
              placeholder='Descrição' 
              required
              {...register('description')} 
            />
            <input 
              type="text" 
              placeholder='Preço' 
              required
              {...register('price',{ valueAsNumber: true })} 
            />
            <input 
              type="text" 
              placeholder='Categoria' 
              required
              {...register('category')} 
            />


            
            <Controller 
              control={control}
              name="type"
              render={({field}) => {
                return (
                  <TransactionType onValueChange={field.onChange} value={field.value}>

                    <TransactionTypeButton variant="income" value="income">
                      <ArrowCircleUp size={24}/>
                      Entrada
                    </TransactionTypeButton>

                    <TransactionTypeButton variant="outcome" value="outcome">
                      <ArrowCircleDown size={24}/>
                      Saída
                    </TransactionTypeButton>

                  </TransactionType>
                )
              }}
            />

            <button type='submit' disabled={isSubmitting}>Cadastrar</button>
          </form>
        </Content>
      </Dialog.Portal>
    )
}