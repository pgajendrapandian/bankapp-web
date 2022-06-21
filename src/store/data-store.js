import { createSlice, configureStore } from "@reduxjs/toolkit";
import {
  getAccounts,
  getAccount,
  addLoan,
  addTransaction,
  findAccount,
  addAccount,
  login,
} from "../api/api";

const accountsSlice = createSlice({
  name: "accounts",
  initialState: {
    accounts: [],
    account: [],
    status: null,
    accountsError: null,
    accountError: null,
    addLoanError: null,
    addTransactionError: null,
    addAccountError: null,
    isModalLoanOpen: false,
    isModelTransactionOpen: false,
    addLoanStatus: null,
    addTransactionStatus: null,
    addAccountStatus: null,
    selectedLoanID: null,
    searchAccountID: null,
    loginStatus: false,
    loginError: null,
    token: null,
  },
  reducers: {
    openLoanModal: (state) => {
      state.isModalLoanOpen = true;
    },
    closeLoanModal: (state) => {
      state.isModalLoanOpen = false;
    },
    openTransactionModal: (state) => {
      state.isModelTransactionOpen = true;
    },
    closeTransactionModal: (state) => {
      state.isModelTransactionOpen = false;
    },
    closeModal: (state) => {
      state.isModalLoanOpen = false;
      state.isModelTransactionOpen = false;
    },
    setSelectedLoanID: (state, action) => {
      state.selectedLoanID = action.payload;
    },
    setLoginStatus: (state, action) => {
      state.loginStatus = action.payload.loginStatus;
      state.token = action.payload.token;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
  extraReducers: {
    [getAccounts.fulfilled]: (state, action) => {
      state.accounts = action.payload;
      state.status = "success";
      state.accountsError = null;
    },
    [getAccounts.rejected]: (state, action) => {
      state.accounts = action.payload;
      state.status = "errored";
      state.accountsError = action.payload.error.name;
    },
    [getAccounts.pending]: (state) => {
      state.status = "loading";
    },
    [getAccount.fulfilled]: (state, action) => {
      state.account = action.payload;
      state.status = null;
      state.accountError = null;
    },
    [getAccount.rejected]: (state, action) => {
      state.status = "errored";
      state.accountError = action.payload.error.name;
    },
    [getAccount.pending]: (state) => {
      state.status = "loading";
    },
    [addLoan.fulfilled]: (state, action) => {
      state.addLoanStatus = "success";
      state.isModalLoanOpen = false;
      state.account = action.payload;
    },
    [addLoan.rejected]: (state, action) => {
      state.addLoanStatus = "failed";
      state.addLoanError = action.payload.error;
    },
    [addLoan.pending]: (state) => {
      state.addLoanStatus = "pending";
      state.addLoanStatus = null;
    },
    [addTransaction.fulfilled]: (state, action) => {
      state.addTransactionStatus = "success";
      state.isModelTransactionOpen = false;
      state.account = action.payload;
    },
    [addTransaction.rejected]: (state, action) => {
      state.addTransactionStatus = "failed";
      state.addTransactionError = action.payload.error;
    },
    [addTransaction.pending]: (state) => {
      state.addTransactionStatus = "pending";
    },
    [findAccount.fulfilled]: (state, action) => {
      state.accounts = action.payload;
      state.status = "success";
    },
    [findAccount.rejected]: (state) => {
      state.status = "errored";
    },
    [findAccount.pending]: (state) => {
      state.status = "loading";
    },
    [addAccount.fulfilled]: (state) => {
      state.addAccountStatus = "success";
    },
    [addAccount.rejected]: (state, action) => {
      state.addAccountStatus = "errored";
    },
    [addAccount.pending]: (state) => {
      state.addAccountStatus = null;
    },
    [login.fulfilled]: (state, action) => {
      state.loginStatus = true;
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },
    [login.rejected]: (state, action) => {
      state.loginStatus = false;
      state.loginError = action.payload.error;
    },
  },
});

const store = configureStore({
  reducer: {
    accounts: accountsSlice.reducer,
  },
});

export const accountsActions = accountsSlice.actions;

export default store;
