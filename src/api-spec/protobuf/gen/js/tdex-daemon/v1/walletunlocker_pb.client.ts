/* eslint-disable */
// @generated by protobuf-ts 2.8.2 with parameter add_pb_suffix,eslint_disable,ts_nocheck,keep_enum_prefix,long_type_number
// @generated from protobuf file "tdex-daemon/v1/walletunlocker.proto" (package "tdex_daemon.v1", syntax proto3)
// tslint:disable
// @ts-nocheck
import type { RpcTransport } from "@protobuf-ts/runtime-rpc";
import type { ServiceInfo } from "@protobuf-ts/runtime-rpc";
import { WalletUnlockerService } from "./walletunlocker_pb";
import type { IsReadyResponse } from "./walletunlocker_pb";
import type { IsReadyRequest } from "./walletunlocker_pb";
import type { ChangePasswordResponse } from "./walletunlocker_pb";
import type { ChangePasswordRequest } from "./walletunlocker_pb";
import type { UnlockWalletResponse } from "./walletunlocker_pb";
import type { UnlockWalletRequest } from "./walletunlocker_pb";
import type { InitWalletResponse } from "./walletunlocker_pb";
import type { InitWalletRequest } from "./walletunlocker_pb";
import type { ServerStreamingCall } from "@protobuf-ts/runtime-rpc";
import { stackIntercept } from "@protobuf-ts/runtime-rpc";
import type { GenSeedResponse } from "./walletunlocker_pb";
import type { GenSeedRequest } from "./walletunlocker_pb";
import type { UnaryCall } from "@protobuf-ts/runtime-rpc";
import type { RpcOptions } from "@protobuf-ts/runtime-rpc";
/**
 *
 * Service for operators to manage the internal wallet of the daemon
 *
 * @generated from protobuf service tdex_daemon.v1.WalletUnlockerService
 */
export interface IWalletUnlockerServiceClient {
    /**
     * GenSeed is the first method that should be used to instantiate a new tdexd
     * instance. This method allows a caller to generate a new HD Wallet.
     * Once the seed is obtained and verified by the user, the InitWallet
     * method should be used to commit the newly generated seed, and create the
     * wallet.
     *
     * @generated from protobuf rpc: GenSeed(tdex_daemon.v1.GenSeedRequest) returns (tdex_daemon.v1.GenSeedResponse);
     */
    genSeed(input: GenSeedRequest, options?: RpcOptions): UnaryCall<GenSeedRequest, GenSeedResponse>;
    /**
     * InitWallet is used when tdexd is starting up for the first time to fully
     * initialize the daemon and its internal wallet.
     * The wallet in the tdexd context is a database file on the disk that can be
     * found in the configured data directory.
     * At the very least a mnemonic and a wallet password must be provided to this
     * RPC. The latter will be used to encrypt sensitive material on disk.
     * Once initialized the wallet is locked and since the password is never stored
     * on the disk, it's required to pass it into the Unlock RPC request to be able
     * to manage the daemon for operations like depositing funds or opening a market.
     *
     * @generated from protobuf rpc: InitWallet(tdex_daemon.v1.InitWalletRequest) returns (stream tdex_daemon.v1.InitWalletResponse);
     */
    initWallet(input: InitWalletRequest, options?: RpcOptions): ServerStreamingCall<InitWalletRequest, InitWalletResponse>;
    /**
     * UnlockWallet is used at startup of tdexd to provide a password to unlock
     * the wallet database. Once unlocked, the only way to lock the wallet again is
     * shutting it down.
     *
     * @generated from protobuf rpc: UnlockWallet(tdex_daemon.v1.UnlockWalletRequest) returns (tdex_daemon.v1.UnlockWalletResponse);
     */
    unlockWallet(input: UnlockWalletRequest, options?: RpcOptions): UnaryCall<UnlockWalletRequest, UnlockWalletResponse>;
    /**
     * ChangePassword changes the password of the encrypted wallet. This RPC
     * requires the internal wallet to be locked. It doesn't change the wallet state
     * in any case, therefore, like after calling InitWallet, it is required to
     * unlock the walket with UnlockWallet RPC after this operation succeeds.
     *
     * @generated from protobuf rpc: ChangePassword(tdex_daemon.v1.ChangePasswordRequest) returns (tdex_daemon.v1.ChangePasswordResponse);
     */
    changePassword(input: ChangePasswordRequest, options?: RpcOptions): UnaryCall<ChangePasswordRequest, ChangePasswordResponse>;
    /**
     * IsReady is useful for external applications interacting with tdexd to know
     * whether its ready, meaning that also the wallet, operator trade services
     * are able to serve requests.
     * Restarting tdexd or initiliazing it by restoring an existing wallet can be
     * time-expensive operations causing tdexd to not be ready until they haven't
     * finished.
     *
     * @generated from protobuf rpc: IsReady(tdex_daemon.v1.IsReadyRequest) returns (tdex_daemon.v1.IsReadyResponse);
     */
    isReady(input: IsReadyRequest, options?: RpcOptions): UnaryCall<IsReadyRequest, IsReadyResponse>;
}
/**
 *
 * Service for operators to manage the internal wallet of the daemon
 *
 * @generated from protobuf service tdex_daemon.v1.WalletUnlockerService
 */
export class WalletUnlockerServiceClient implements IWalletUnlockerServiceClient, ServiceInfo {
    typeName = WalletUnlockerService.typeName;
    methods = WalletUnlockerService.methods;
    options = WalletUnlockerService.options;
    constructor(private readonly _transport: RpcTransport) {
    }
    /**
     * GenSeed is the first method that should be used to instantiate a new tdexd
     * instance. This method allows a caller to generate a new HD Wallet.
     * Once the seed is obtained and verified by the user, the InitWallet
     * method should be used to commit the newly generated seed, and create the
     * wallet.
     *
     * @generated from protobuf rpc: GenSeed(tdex_daemon.v1.GenSeedRequest) returns (tdex_daemon.v1.GenSeedResponse);
     */
    genSeed(input: GenSeedRequest, options?: RpcOptions): UnaryCall<GenSeedRequest, GenSeedResponse> {
        const method = this.methods[0], opt = this._transport.mergeOptions(options);
        return stackIntercept<GenSeedRequest, GenSeedResponse>("unary", this._transport, method, opt, input);
    }
    /**
     * InitWallet is used when tdexd is starting up for the first time to fully
     * initialize the daemon and its internal wallet.
     * The wallet in the tdexd context is a database file on the disk that can be
     * found in the configured data directory.
     * At the very least a mnemonic and a wallet password must be provided to this
     * RPC. The latter will be used to encrypt sensitive material on disk.
     * Once initialized the wallet is locked and since the password is never stored
     * on the disk, it's required to pass it into the Unlock RPC request to be able
     * to manage the daemon for operations like depositing funds or opening a market.
     *
     * @generated from protobuf rpc: InitWallet(tdex_daemon.v1.InitWalletRequest) returns (stream tdex_daemon.v1.InitWalletResponse);
     */
    initWallet(input: InitWalletRequest, options?: RpcOptions): ServerStreamingCall<InitWalletRequest, InitWalletResponse> {
        const method = this.methods[1], opt = this._transport.mergeOptions(options);
        return stackIntercept<InitWalletRequest, InitWalletResponse>("serverStreaming", this._transport, method, opt, input);
    }
    /**
     * UnlockWallet is used at startup of tdexd to provide a password to unlock
     * the wallet database. Once unlocked, the only way to lock the wallet again is
     * shutting it down.
     *
     * @generated from protobuf rpc: UnlockWallet(tdex_daemon.v1.UnlockWalletRequest) returns (tdex_daemon.v1.UnlockWalletResponse);
     */
    unlockWallet(input: UnlockWalletRequest, options?: RpcOptions): UnaryCall<UnlockWalletRequest, UnlockWalletResponse> {
        const method = this.methods[2], opt = this._transport.mergeOptions(options);
        return stackIntercept<UnlockWalletRequest, UnlockWalletResponse>("unary", this._transport, method, opt, input);
    }
    /**
     * ChangePassword changes the password of the encrypted wallet. This RPC
     * requires the internal wallet to be locked. It doesn't change the wallet state
     * in any case, therefore, like after calling InitWallet, it is required to
     * unlock the walket with UnlockWallet RPC after this operation succeeds.
     *
     * @generated from protobuf rpc: ChangePassword(tdex_daemon.v1.ChangePasswordRequest) returns (tdex_daemon.v1.ChangePasswordResponse);
     */
    changePassword(input: ChangePasswordRequest, options?: RpcOptions): UnaryCall<ChangePasswordRequest, ChangePasswordResponse> {
        const method = this.methods[3], opt = this._transport.mergeOptions(options);
        return stackIntercept<ChangePasswordRequest, ChangePasswordResponse>("unary", this._transport, method, opt, input);
    }
    /**
     * IsReady is useful for external applications interacting with tdexd to know
     * whether its ready, meaning that also the wallet, operator trade services
     * are able to serve requests.
     * Restarting tdexd or initiliazing it by restoring an existing wallet can be
     * time-expensive operations causing tdexd to not be ready until they haven't
     * finished.
     *
     * @generated from protobuf rpc: IsReady(tdex_daemon.v1.IsReadyRequest) returns (tdex_daemon.v1.IsReadyResponse);
     */
    isReady(input: IsReadyRequest, options?: RpcOptions): UnaryCall<IsReadyRequest, IsReadyResponse> {
        const method = this.methods[4], opt = this._transport.mergeOptions(options);
        return stackIntercept<IsReadyRequest, IsReadyResponse>("unary", this._transport, method, opt, input);
    }
}
