// DebitContext.js
import React, { createContext, useContext, useReducer } from 'react';

// Ações disponíveis
const ADD_DEBIT = 'ADD_DEBIT';
const ADD_CREDIT = 'ADD_CREDIT';

// Criar o contexto
const DebitContext = createContext();

// Reducer para manipular as ações
const debitReducer = (state, action) => {
  switch (action.type) {
    case ADD_DEBIT:
      return {
        ...state,
        debitList: [...state.debitList, action.payload],
      };
      case ADD_CREDIT:
        return {
          ...state,
          creditList: [...state.creditList, action.payload]
        }
    default:
      return state;
      
    }

};


export const DebitProvider = ({ children }) => {

  const [state, dispatch] = useReducer(debitReducer, { debitList: [], creditList: [] });

  const totalDebit = state.debitList.reduce((acc, curItem) => curItem.amount + acc, 0)
  const totalCredit = state.creditList.reduce((acc, curItem) => curItem.amount + acc, 0)
  const lista_valores = [...state.debitList, ...state.creditList]
  const addDebit = (debit) => {
    dispatch({ type: ADD_DEBIT, payload: {id: `${state.debitList.length + 1} - ${debit.description.length}`, ...debit}});
  };

  const addCredit = (credit) => {
    dispatch({type: ADD_CREDIT, payload: {id: `${state.creditList.length + 1} - ${credit.description.lenght}`, ...credit}})
  }
  return (
    <DebitContext.Provider value={{ state, addDebit, addCredit, totalCredit, totalDebit, lista_valores }}>
      {children}
    </DebitContext.Provider>
  );
};

// Hook para consumir o contexto
export const useDebit = () => {
  const context = useContext(DebitContext);
  if (!context) {
    throw new Error('Error');
  }
  return context;
};