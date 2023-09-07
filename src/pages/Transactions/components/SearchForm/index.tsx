import { MagnifyingGlass } from "phosphor-react";
import { SearchFormContainer } from "./styles";
import {useForm} from 'react-hook-form'

export function SearchForm() {
  const {register, handleSubmit} = useForm()

  function handleSearchTransactions() {}

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
      <input type="text" placeholder="Busque por transações" {...register('query')}/>

      <button type="submit">
        <MagnifyingGlass size={20} />
        Buscar
      </button>
    </SearchFormContainer>
  );
}