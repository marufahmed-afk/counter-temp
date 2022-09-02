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
