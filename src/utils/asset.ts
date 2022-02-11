import type { NetworkString } from 'ldk';

import type { Asset } from '../domain/asset';

import { LBTC_ASSET, LBTC_TICKER, LCAD_ASSET, LCAD_TICKER, USDT_ASSET, USDT_TICKER } from './constants';

export const assetIdToTicker = (assetId: string, assets: Asset[]): string => {
  const asset = assets.find((a: Asset) => a.asset_id === assetId);
  return asset?.ticker || assetId.substring(0, 4).toUpperCase();
};

export const isLbtcTicker = (ticker?: string): boolean => {
  return ticker === LBTC_TICKER['liquid'] || ticker === LBTC_TICKER['testnet'];
};
export const isLbtcAssetId = (assetId: string, network: NetworkString): boolean =>
  assetId === LBTC_ASSET[network].asset_id;

export const isUsdtTicker = (ticker?: string): boolean => {
  return ticker === USDT_TICKER;
};
export const isUsdtAssetId = (assetId: string, network: NetworkString): boolean =>
  assetId === USDT_ASSET[network].asset_id;

export const isLcadTicker = (ticker?: string): boolean => {
  return ticker === LCAD_TICKER;
};
export const isLcadAssetId = (assetId: string, network: NetworkString): boolean =>
  assetId === LCAD_ASSET[network].asset_id;
