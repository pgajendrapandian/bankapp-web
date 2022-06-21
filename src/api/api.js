import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = "http://127.0.0.1:8080/account";
const baseUserURL = "http://127.0.0.1:8080/user";

const getTokenHeaderConfig = () => {
  return {
    headers: { "x-access-token": localStorage.getItem("token") },
  };
};

export const getAccounts = createAsyncThunk(
  "accounts/getAccounts",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${baseURL}/all`,
        getTokenHeaderConfig()
      );
      return data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAccount = createAsyncThunk(
  "accounts/getAccount",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${baseURL}/${id}`,
        getTokenHeaderConfig()
      );
      return data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addLoan = createAsyncThunk(
  "accounts/addLoan",
  async (data, { rejectWithValue }) => {
    const { accountID, loanDate, loanAmount } = data;
    try {
      const { data } = await axios.post(
        `${baseURL}/${accountID}/add`,
        {
          loanDate,
          loanAmount,
        },
        getTokenHeaderConfig()
      );
      return data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addTransaction = createAsyncThunk(
  "accounts/addTransaction",
  async (data, { rejectWithValue }) => {
    const {
      accountID,
      loanID,
      transactionDate,
      prinicipalAmount,
      interestAmount,
    } = data;
    try {
      const { data } = await axios.post(
        `${baseURL}/${accountID}/${loanID}/add`,
        { transactionDate, prinicipalAmount, interestAmount },
        getTokenHeaderConfig()
      );
      return data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const findAccount = createAsyncThunk(
  "accouns/findAccount",
  async (searchName, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${baseURL}/find?searchName=${searchName}`,
        getTokenHeaderConfig()
      );
      return data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addAccount = createAsyncThunk(
  "accounts/addAccount",
  async (data, { rejectWithValue }) => {
    const { accountName, loanDate, loanAmount } = data;
    try {
      await axios.post(
        `${baseURL}/create`,
        {
          accountName,
          loanDate,
          loanAmount,
        },
        getTokenHeaderConfig()
      );
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const login = createAsyncThunk(
  "accounts/login",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${baseUserURL}/login`, {
        username,
        password,
      });
      return data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
