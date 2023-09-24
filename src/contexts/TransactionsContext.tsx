import { createContext, useEffect, useState } from 'react';
import { api } from '../lib/api';

interface Transaction {
  id: number;
  description: string;
  type: 'income' | 'outcome';
  price: number;
  category: string;
  createdAt: string;
}

interface UpdateTransactionInput {
  description: string
  type: 'income' | 'outcome'
  category: string
  price: number
}

interface TransactionsContextType {
  transactions: Transaction[]
  fetchTransactions(query?: string): Promise<void>
  updateTransactions(data: UpdateTransactionInput): Promise<void>
}

interface TransactionsContextProps {
  children: React.ReactNode
}

export const TransactionsContext = createContext({} as TransactionsContextType)

export function TransactionsProvider({children}: TransactionsContextProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  async function updateTransactions({category, description, type, price}: UpdateTransactionInput) {
    const response = await api.post('transactions', {
      category,
      description,
      type,
      price,
      createdAt: new Date()
    })

    setTransactions(state => [response.data, ...state])
  }

  async function fetchTransactions(query?: string) {
    const response = await api.get('transactions', {
      params: {
        _sort: 'createdAt',
        _order: 'desc',
        q: query
      }
    })

    setTransactions(response.data)
  }

  useEffect(() => {
    fetchTransactions()
  }, [])

  return (
    <TransactionsContext.Provider value={{transactions, fetchTransactions, updateTransactions}}>
      {children}
    </TransactionsContext.Provider>
  )
}