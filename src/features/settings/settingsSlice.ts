import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { Metadata } from 'grpc-web';

import { OperatorClient } from '../../api-spec/generated/js/OperatorServiceClientPb';
import { WalletClient } from '../../api-spec/generated/js/WalletServiceClientPb';
import { WalletUnlockerClient } from '../../api-spec/generated/js/WalletunlockerServiceClientPb';
import { network } from '../../app/config';
import type { RootState } from '../../app/store';
import type { Asset } from '../../domain/asset';
import type { MarketLabelled } from '../../domain/market';
import { featuredAssets } from '../../utils';

export interface SettingsState {
  chain: 'liquid' | 'regtest';
  explorerLiquidAPI: string;
  explorerLiquidUI: string;
  assets: Asset[];
  baseUrl: string;
  useProxy: boolean;
  marketsLabelled?: MarketLabelled[];
  macaroonCredentials?: string;
  tdexdConnectUrl?: string;
}

export const initialState: SettingsState = {
  chain: 'regtest',
  explorerLiquidAPI: 'https://blockstream.info/liquid/api',
  explorerLiquidUI: 'https://blockstream.info/liquid',
  baseUrl: '__TAURI__' in window ? 'http://localhost:3030' : 'http://localhost:9000',
  assets: featuredAssets,
  useProxy: '__TAURI__' in window,
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    saveAsset: (state, action: PayloadAction<Asset>) => {
      // Save if asset not already saved
      if (state.assets.some((a) => a.asset_id !== action.payload.asset_id)) {
        state.assets = [...state.assets, action.payload];
      }
    },
    setMarketLabelled: (state, action: PayloadAction<MarketLabelled>) => {
      state.marketsLabelled = [...(state.marketsLabelled || []), action.payload];
    },
    setBaseUrl: (state, action: PayloadAction<string>) => {
      if (!state.useProxy) {
        state.baseUrl = action.payload;
      }
    },
    setMacaroonCredentials: (state, action: PayloadAction<string | undefined>) => {
      state.macaroonCredentials = action.payload;
    },
    setTdexdConnectUrl: (state, action: PayloadAction<string | undefined>) => {
      state.tdexdConnectUrl = action.payload;
    },
    logout: (state) => {
      state.macaroonCredentials = undefined;
      state.tdexdConnectUrl = undefined;
    },
    resetSettings: () => initialState,
  },
});

export function selectChain(state: RootState): 'liquid' | 'regtest' {
  return state.settings.chain;
}

export function selectBaseUrl(state: RootState): string {
  return state.settings.baseUrl;
}

export function selectMacaroonCreds(state: RootState): Metadata | null {
  if (state.settings.useProxy && state.settings.macaroonCredentials) {
    return {
      macaroon: state.settings.macaroonCredentials,
    };
  }
  return null;
}

export function selectMarketLabelled(state: RootState): MarketLabelled[] | undefined {
  return state.settings.marketsLabelled;
}

//
export function selectOperatorClient(state: RootState): OperatorClient {
  return new OperatorClient(selectBaseUrl(state));
}

export function selectWalletClient(state: RootState): WalletClient {
  return new WalletClient(selectBaseUrl(state));
}

export function selectWalletUnlockerClient(state: RootState): WalletUnlockerClient {
  return new WalletUnlockerClient(selectBaseUrl(state));
}

export const {
  setBaseUrl,
  setMacaroonCredentials,
  setTdexdConnectUrl,
  resetSettings,
  logout,
  saveAsset,
  setMarketLabelled,
} = settingsSlice.actions;

export default settingsSlice.reducer;
