import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchCurrentTime, getOfferAmount, getOptInUrl, updateCurrentTime } from "../api/optin.api";
import { isOver } from "../helpers/util.helper";

export interface CountdownDef {
  hour: number;
  minutes: number;
  seconds: number;
}

export interface OptInInitialState {
  loading: boolean;
  error: boolean;
  amount: number;
  url: string;
  countdown: [hour: number, minutes: number, seconds: number];
  over: boolean | null;
}

const initialState: OptInInitialState = {
  error: false,
  loading: false,
  amount: 0,
  url: "",
  countdown: [0, 0, 0],
  over: null,
};

export const getAmount = createAsyncThunk("optIn/offerAmount", async (_, { rejectWithValue }) => {
  try {
    const response = await getOfferAmount();
    return response.data;
  } catch (err) {
    if (err) {
      return rejectWithValue(err.response.data);
    }
  }
});

export const getCountdownData = createAsyncThunk(
  "optIn/getCountdown",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchCurrentTime();
      return response.data;
    } catch (err) {
      if (err) {
        return rejectWithValue(err.response.data);
      }
    }
  }
);

export const saveCountdown = createAsyncThunk(
  "optIn/saveCountdown",
  async (payload: CountdownDef, { rejectWithValue }) => {
    try {
      const response = await updateCurrentTime(payload);
      return response.data;
    } catch (err) {
      if (err) {
        return rejectWithValue(err.response.data);
      }
    }
  }
);

export const getUrl = createAsyncThunk("optIn/url", async (_, { rejectWithValue }) => {
  try {
    const response = await getOptInUrl();
    return response.data;
  } catch (err) {
    if (err) {
      return rejectWithValue(err.response.data);
    }
  }
});

export const optInSlice = createSlice({
  name: "optIn",
  initialState,
  reducers: {
    setCountdown: (
      state,
      action: PayloadAction<[hour: number, minutes: number, seconds: number]>
    ) => {
      state.over = isOver(action.payload);
      state.countdown = action.payload;
    },
    clearError: (state) => {
      state.error = false;
    },
  },
  extraReducers: (builder) => {
    /**
     * GET AMOUNT
     */
    builder.addCase(getAmount.pending, (state) => {
      state.error = false;
      state.loading = true;
    });
    builder.addCase(getAmount.fulfilled, (state, action) => {
      const { cash_value } = action.payload;
      state.loading = false;
      state.amount = cash_value;
    });
    builder.addCase(getAmount.rejected, (state) => {
      state.error = true;
      state.loading = false;
    });

    /**
     * GET URL
     */
    builder.addCase(getUrl.pending, (state) => {
      state.error = false;
      state.loading = true;
    });
    builder.addCase(getUrl.fulfilled, (state, action) => {
      const { jackpotjoyUrl } = action.payload;
      state.loading = false;
      state.url = jackpotjoyUrl;
    });
    builder.addCase(getUrl.rejected, (state) => {
      state.error = true;
      state.loading = false;
    });

    /**
     * GET COUNTDOWN
     */
    builder.addCase(getCountdownData.pending, (state) => {
      state.error = false;
      state.loading = true;
    });
    builder.addCase(getCountdownData.fulfilled, (state, action) => {
      const { hour, minutes, seconds } = action.payload;
      state.loading = false;
      state.countdown = [hour, minutes, seconds];
      state.over = isOver([hour, minutes, seconds]);
    });
    builder.addCase(getCountdownData.rejected, (state) => {
      state.error = true;
      state.loading = false;
    });

    /**
     * SAVE COUNTDOWN
     */
    builder.addCase(saveCountdown.pending, (state) => {
      state.error = false;
    });
    builder.addCase(saveCountdown.fulfilled, (state) => {
      state.error = false;
    });
    builder.addCase(saveCountdown.rejected, (state) => {
      state.error = true;
      state.loading = false;
    });
  },
});

export const { setCountdown, clearError } = optInSlice.actions;

export default optInSlice.reducer;
