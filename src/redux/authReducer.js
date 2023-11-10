import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { requestLogin, requestLogout, requestUser, requestRefreshUser, requestRegister, setToken} from "helpers/api";



export const loginThunk = createAsyncThunk(
    'auth/login',
    async (formData, thunkAPI) => {
        try {
            const response = await requestLogin(formData);
            
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);


export const registerThunk = createAsyncThunk(
    'auth/register',
    async (formData, thunkAPI) => {
        try {
            const authData = await requestRegister(formData);
            
            return authData;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const userRefreshThunk = createAsyncThunk(
    'auth/refresh',
    async (_, thunkAPI) => {
      const state = thunkAPI.getState();
      const token = state.auth.token;

      
  
      try {
        setToken(token);
        const authData = await requestRefreshUser();
  
        return authData; 
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    },
    {
      condition: (_, thunkAPI) => {
        const state = thunkAPI.getState();
        const token = state.auth.token;
  
        if (!token) return false;
        return true;
      },
    }
  );

  export const userThunk = createAsyncThunk(
    'auth/user',
    async (_, thunkAPI) => {
        try {
            const data = await requestUser();
            
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);



  export const logOutThunk = createAsyncThunk(
    'auth/logOut',
    async (_, thunkAPI) => {
      try {
        await requestLogout();
  
        return; 
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );
  
  const INITIAL_STATE = {
    token: null,
    user: {
      email: null,
      name: null,
    },
    authenticated: false,
    isLoading: false,
    error: null,
  };


  const authSlice = createSlice({
    name: 'auth', 

    initialState: INITIAL_STATE,

    extraReducers: builder =>
    builder

    .addCase(registerThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.authenticated = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
    })

    .addCase(loginThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.authenticated = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
    })

    .addCase(userRefreshThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.authenticated = true;
        state.user = action.payload;
    })

    .addCase(userThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.authenticated = true;
      state.user = action.payload;
  })

    .addCase(logOutThunk.fulfilled, () => {
        return INITIAL_STATE;
    })

    .addMatcher(
        isAnyOf(
          logOutThunk.pending,
          registerThunk.pending,
          userRefreshThunk.pending,
          loginThunk.pending,
          userThunk.pending
        ),
        state => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(isAnyOf(
        logOutThunk.rejected,
        registerThunk.rejected,
        loginThunk.rejected,
        userRefreshThunk.rejected,
        userThunk.rejected
      ), (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      }),
  }
  )


  export const authReducer = authSlice.reducer;