import { AxiosResponse } from "axios";
import { api } from "../../../../api/api";
import { OptInEndpointsEnum } from "../constants/optin.endpoints";
import { SetTimeDef } from "../types/optin.types";

export const getOfferAmount = (): Promise<AxiosResponse> => {
  return api.get(OptInEndpointsEnum.OFFER);
};

export const getOptInUrl = (): Promise<AxiosResponse> => {
  return api.get(OptInEndpointsEnum.URL);
};

export const fetchCurrentTime = (): Promise<AxiosResponse> => {
  return api.get(OptInEndpointsEnum.TIMER);
};

export const updateCurrentTime = (data: SetTimeDef): Promise<AxiosResponse> => {
  return api.post(OptInEndpointsEnum.TIMER, data);
};
