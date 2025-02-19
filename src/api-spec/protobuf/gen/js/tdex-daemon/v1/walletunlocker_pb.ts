/* eslint-disable */
// @generated by protobuf-ts 2.8.2 with parameter add_pb_suffix,eslint_disable,ts_nocheck,keep_enum_prefix,long_type_number
// @generated from protobuf file "tdex-daemon/v1/walletunlocker.proto" (package "tdex_daemon.v1", syntax proto3)
// tslint:disable
// @ts-nocheck
import { ServiceType } from "@protobuf-ts/runtime-rpc";
import { WireType } from "@protobuf-ts/runtime";
import type { BinaryWriteOptions } from "@protobuf-ts/runtime";
import type { IBinaryWriter } from "@protobuf-ts/runtime";
import { UnknownFieldHandler } from "@protobuf-ts/runtime";
import type { BinaryReadOptions } from "@protobuf-ts/runtime";
import type { IBinaryReader } from "@protobuf-ts/runtime";
import type { PartialMessage } from "@protobuf-ts/runtime";
import { reflectionMergePartial } from "@protobuf-ts/runtime";
import { MESSAGE_TYPE } from "@protobuf-ts/runtime";
import { MessageType } from "@protobuf-ts/runtime";
/**
 * @generated from protobuf message tdex_daemon.v1.GenSeedRequest
 */
export interface GenSeedRequest {
}
/**
 * @generated from protobuf message tdex_daemon.v1.GenSeedResponse
 */
export interface GenSeedResponse {
    /**
     * @generated from protobuf field: repeated string seed_mnemonic = 1;
     */
    seedMnemonic: string[];
}
/**
 * @generated from protobuf message tdex_daemon.v1.InitWalletRequest
 */
export interface InitWalletRequest {
    /**
     * wallet_password is the passphrase that should be used to encrypt the
     * wallet. This MUST be at least 8 chars in length. After creation, this
     * password is required to unlock the daemon.
     *
     * @generated from protobuf field: bytes wallet_password = 1;
     */
    walletPassword: Uint8Array;
    /**
     * seed_mnemonic is a 24-word mnemonic that encodes a prior seed obtained by the
     * user. This MUST be a generated by the GenSeed method
     *
     * @generated from protobuf field: repeated string seed_mnemonic = 2;
     */
    seedMnemonic: string[];
    /**
     * the flag to let the daemon restore existing funds for the wallet.
     *
     * @generated from protobuf field: bool restore = 3;
     */
    restore: boolean;
}
/**
 * @generated from protobuf message tdex_daemon.v1.InitWalletResponse
 */
export interface InitWalletResponse {
    /**
     * @generated from protobuf field: int32 account = 1;
     */
    account: number;
    /**
     * @generated from protobuf field: tdex_daemon.v1.InitWalletResponse.Status status = 2;
     */
    status: InitWalletResponse_Status;
    /**
     * @generated from protobuf field: string data = 3;
     */
    data: string;
}
/**
 * @generated from protobuf enum tdex_daemon.v1.InitWalletResponse.Status
 */
export enum InitWalletResponse_Status {
    /**
     * @generated from protobuf enum value: STATUS_PROCESSING = 0;
     */
    STATUS_PROCESSING = 0,
    /**
     * @generated from protobuf enum value: STATUS_DONE = 1;
     */
    STATUS_DONE = 1
}
/**
 * @generated from protobuf message tdex_daemon.v1.UnlockWalletRequest
 */
export interface UnlockWalletRequest {
    /**
     * wallet_password should be the current valid passphrase for the daemon. This
     * will be required to decrypt on-disk material that the daemon requires to
     * function properly.
     *
     * @generated from protobuf field: bytes wallet_password = 1;
     */
    walletPassword: Uint8Array;
}
/**
 * @generated from protobuf message tdex_daemon.v1.UnlockWalletResponse
 */
export interface UnlockWalletResponse {
}
/**
 * @generated from protobuf message tdex_daemon.v1.ChangePasswordRequest
 */
export interface ChangePasswordRequest {
    /**
     * current_password should be the current valid passphrase used to unlock the
     * daemon.
     *
     * @generated from protobuf field: bytes current_password = 1;
     */
    currentPassword: Uint8Array;
    /**
     * new_password should be the new passphrase that will be needed to unlock the
     * daemon.
     *
     * @generated from protobuf field: bytes new_password = 2;
     */
    newPassword: Uint8Array;
}
/**
 * @generated from protobuf message tdex_daemon.v1.ChangePasswordResponse
 */
export interface ChangePasswordResponse {
}
/**
 * @generated from protobuf message tdex_daemon.v1.IsReadyRequest
 */
export interface IsReadyRequest {
}
/**
 * @generated from protobuf message tdex_daemon.v1.IsReadyResponse
 */
export interface IsReadyResponse {
    /**
     * whether the daemon is initialized with an HD wallet.
     *
     * @generated from protobuf field: bool initialized = 1;
     */
    initialized: boolean;
    /**
     * whether the daemon's wallet is unlocked.
     *
     * @generated from protobuf field: bool unlocked = 2;
     */
    unlocked: boolean;
    /**
     * whether the daemon's wallet utxo set is up-to-date'.
     *
     * @generated from protobuf field: bool synced = 3;
     */
    synced: boolean;
}
// @generated message type with reflection information, may provide speed optimized methods
class GenSeedRequest$Type extends MessageType<GenSeedRequest> {
    constructor() {
        super("tdex_daemon.v1.GenSeedRequest", []);
    }
    create(value?: PartialMessage<GenSeedRequest>): GenSeedRequest {
        const message = {};
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<GenSeedRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: GenSeedRequest): GenSeedRequest {
        return target ?? this.create();
    }
    internalBinaryWrite(message: GenSeedRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message tdex_daemon.v1.GenSeedRequest
 */
export const GenSeedRequest = new GenSeedRequest$Type();
// @generated message type with reflection information, may provide speed optimized methods
class GenSeedResponse$Type extends MessageType<GenSeedResponse> {
    constructor() {
        super("tdex_daemon.v1.GenSeedResponse", [
            { no: 1, name: "seed_mnemonic", kind: "scalar", repeat: 2 /*RepeatType.UNPACKED*/, T: 9 /*ScalarType.STRING*/ }
        ]);
    }
    create(value?: PartialMessage<GenSeedResponse>): GenSeedResponse {
        const message = { seedMnemonic: [] };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<GenSeedResponse>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: GenSeedResponse): GenSeedResponse {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* repeated string seed_mnemonic */ 1:
                    message.seedMnemonic.push(reader.string());
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: GenSeedResponse, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* repeated string seed_mnemonic = 1; */
        for (let i = 0; i < message.seedMnemonic.length; i++)
            writer.tag(1, WireType.LengthDelimited).string(message.seedMnemonic[i]);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message tdex_daemon.v1.GenSeedResponse
 */
export const GenSeedResponse = new GenSeedResponse$Type();
// @generated message type with reflection information, may provide speed optimized methods
class InitWalletRequest$Type extends MessageType<InitWalletRequest> {
    constructor() {
        super("tdex_daemon.v1.InitWalletRequest", [
            { no: 1, name: "wallet_password", kind: "scalar", T: 12 /*ScalarType.BYTES*/ },
            { no: 2, name: "seed_mnemonic", kind: "scalar", repeat: 2 /*RepeatType.UNPACKED*/, T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "restore", kind: "scalar", T: 8 /*ScalarType.BOOL*/ }
        ]);
    }
    create(value?: PartialMessage<InitWalletRequest>): InitWalletRequest {
        const message = { walletPassword: new Uint8Array(0), seedMnemonic: [], restore: false };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<InitWalletRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: InitWalletRequest): InitWalletRequest {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* bytes wallet_password */ 1:
                    message.walletPassword = reader.bytes();
                    break;
                case /* repeated string seed_mnemonic */ 2:
                    message.seedMnemonic.push(reader.string());
                    break;
                case /* bool restore */ 3:
                    message.restore = reader.bool();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: InitWalletRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* bytes wallet_password = 1; */
        if (message.walletPassword.length)
            writer.tag(1, WireType.LengthDelimited).bytes(message.walletPassword);
        /* repeated string seed_mnemonic = 2; */
        for (let i = 0; i < message.seedMnemonic.length; i++)
            writer.tag(2, WireType.LengthDelimited).string(message.seedMnemonic[i]);
        /* bool restore = 3; */
        if (message.restore !== false)
            writer.tag(3, WireType.Varint).bool(message.restore);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message tdex_daemon.v1.InitWalletRequest
 */
export const InitWalletRequest = new InitWalletRequest$Type();
// @generated message type with reflection information, may provide speed optimized methods
class InitWalletResponse$Type extends MessageType<InitWalletResponse> {
    constructor() {
        super("tdex_daemon.v1.InitWalletResponse", [
            { no: 1, name: "account", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 2, name: "status", kind: "enum", T: () => ["tdex_daemon.v1.InitWalletResponse.Status", InitWalletResponse_Status] },
            { no: 3, name: "data", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
    create(value?: PartialMessage<InitWalletResponse>): InitWalletResponse {
        const message = { account: 0, status: 0, data: "" };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<InitWalletResponse>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: InitWalletResponse): InitWalletResponse {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* int32 account */ 1:
                    message.account = reader.int32();
                    break;
                case /* tdex_daemon.v1.InitWalletResponse.Status status */ 2:
                    message.status = reader.int32();
                    break;
                case /* string data */ 3:
                    message.data = reader.string();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: InitWalletResponse, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* int32 account = 1; */
        if (message.account !== 0)
            writer.tag(1, WireType.Varint).int32(message.account);
        /* tdex_daemon.v1.InitWalletResponse.Status status = 2; */
        if (message.status !== 0)
            writer.tag(2, WireType.Varint).int32(message.status);
        /* string data = 3; */
        if (message.data !== "")
            writer.tag(3, WireType.LengthDelimited).string(message.data);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message tdex_daemon.v1.InitWalletResponse
 */
export const InitWalletResponse = new InitWalletResponse$Type();
// @generated message type with reflection information, may provide speed optimized methods
class UnlockWalletRequest$Type extends MessageType<UnlockWalletRequest> {
    constructor() {
        super("tdex_daemon.v1.UnlockWalletRequest", [
            { no: 1, name: "wallet_password", kind: "scalar", T: 12 /*ScalarType.BYTES*/ }
        ]);
    }
    create(value?: PartialMessage<UnlockWalletRequest>): UnlockWalletRequest {
        const message = { walletPassword: new Uint8Array(0) };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<UnlockWalletRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: UnlockWalletRequest): UnlockWalletRequest {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* bytes wallet_password */ 1:
                    message.walletPassword = reader.bytes();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: UnlockWalletRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* bytes wallet_password = 1; */
        if (message.walletPassword.length)
            writer.tag(1, WireType.LengthDelimited).bytes(message.walletPassword);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message tdex_daemon.v1.UnlockWalletRequest
 */
export const UnlockWalletRequest = new UnlockWalletRequest$Type();
// @generated message type with reflection information, may provide speed optimized methods
class UnlockWalletResponse$Type extends MessageType<UnlockWalletResponse> {
    constructor() {
        super("tdex_daemon.v1.UnlockWalletResponse", []);
    }
    create(value?: PartialMessage<UnlockWalletResponse>): UnlockWalletResponse {
        const message = {};
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<UnlockWalletResponse>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: UnlockWalletResponse): UnlockWalletResponse {
        return target ?? this.create();
    }
    internalBinaryWrite(message: UnlockWalletResponse, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message tdex_daemon.v1.UnlockWalletResponse
 */
export const UnlockWalletResponse = new UnlockWalletResponse$Type();
// @generated message type with reflection information, may provide speed optimized methods
class ChangePasswordRequest$Type extends MessageType<ChangePasswordRequest> {
    constructor() {
        super("tdex_daemon.v1.ChangePasswordRequest", [
            { no: 1, name: "current_password", kind: "scalar", T: 12 /*ScalarType.BYTES*/ },
            { no: 2, name: "new_password", kind: "scalar", T: 12 /*ScalarType.BYTES*/ }
        ]);
    }
    create(value?: PartialMessage<ChangePasswordRequest>): ChangePasswordRequest {
        const message = { currentPassword: new Uint8Array(0), newPassword: new Uint8Array(0) };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<ChangePasswordRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: ChangePasswordRequest): ChangePasswordRequest {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* bytes current_password */ 1:
                    message.currentPassword = reader.bytes();
                    break;
                case /* bytes new_password */ 2:
                    message.newPassword = reader.bytes();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: ChangePasswordRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* bytes current_password = 1; */
        if (message.currentPassword.length)
            writer.tag(1, WireType.LengthDelimited).bytes(message.currentPassword);
        /* bytes new_password = 2; */
        if (message.newPassword.length)
            writer.tag(2, WireType.LengthDelimited).bytes(message.newPassword);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message tdex_daemon.v1.ChangePasswordRequest
 */
export const ChangePasswordRequest = new ChangePasswordRequest$Type();
// @generated message type with reflection information, may provide speed optimized methods
class ChangePasswordResponse$Type extends MessageType<ChangePasswordResponse> {
    constructor() {
        super("tdex_daemon.v1.ChangePasswordResponse", []);
    }
    create(value?: PartialMessage<ChangePasswordResponse>): ChangePasswordResponse {
        const message = {};
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<ChangePasswordResponse>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: ChangePasswordResponse): ChangePasswordResponse {
        return target ?? this.create();
    }
    internalBinaryWrite(message: ChangePasswordResponse, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message tdex_daemon.v1.ChangePasswordResponse
 */
export const ChangePasswordResponse = new ChangePasswordResponse$Type();
// @generated message type with reflection information, may provide speed optimized methods
class IsReadyRequest$Type extends MessageType<IsReadyRequest> {
    constructor() {
        super("tdex_daemon.v1.IsReadyRequest", []);
    }
    create(value?: PartialMessage<IsReadyRequest>): IsReadyRequest {
        const message = {};
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<IsReadyRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: IsReadyRequest): IsReadyRequest {
        return target ?? this.create();
    }
    internalBinaryWrite(message: IsReadyRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message tdex_daemon.v1.IsReadyRequest
 */
export const IsReadyRequest = new IsReadyRequest$Type();
// @generated message type with reflection information, may provide speed optimized methods
class IsReadyResponse$Type extends MessageType<IsReadyResponse> {
    constructor() {
        super("tdex_daemon.v1.IsReadyResponse", [
            { no: 1, name: "initialized", kind: "scalar", T: 8 /*ScalarType.BOOL*/ },
            { no: 2, name: "unlocked", kind: "scalar", T: 8 /*ScalarType.BOOL*/ },
            { no: 3, name: "synced", kind: "scalar", T: 8 /*ScalarType.BOOL*/ }
        ]);
    }
    create(value?: PartialMessage<IsReadyResponse>): IsReadyResponse {
        const message = { initialized: false, unlocked: false, synced: false };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<IsReadyResponse>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: IsReadyResponse): IsReadyResponse {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* bool initialized */ 1:
                    message.initialized = reader.bool();
                    break;
                case /* bool unlocked */ 2:
                    message.unlocked = reader.bool();
                    break;
                case /* bool synced */ 3:
                    message.synced = reader.bool();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: IsReadyResponse, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* bool initialized = 1; */
        if (message.initialized !== false)
            writer.tag(1, WireType.Varint).bool(message.initialized);
        /* bool unlocked = 2; */
        if (message.unlocked !== false)
            writer.tag(2, WireType.Varint).bool(message.unlocked);
        /* bool synced = 3; */
        if (message.synced !== false)
            writer.tag(3, WireType.Varint).bool(message.synced);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message tdex_daemon.v1.IsReadyResponse
 */
export const IsReadyResponse = new IsReadyResponse$Type();
/**
 * @generated ServiceType for protobuf service tdex_daemon.v1.WalletUnlockerService
 */
export const WalletUnlockerService = new ServiceType("tdex_daemon.v1.WalletUnlockerService", [
    { name: "GenSeed", options: {}, I: GenSeedRequest, O: GenSeedResponse },
    { name: "InitWallet", serverStreaming: true, options: {}, I: InitWalletRequest, O: InitWalletResponse },
    { name: "UnlockWallet", options: {}, I: UnlockWalletRequest, O: UnlockWalletResponse },
    { name: "ChangePassword", options: {}, I: ChangePasswordRequest, O: ChangePasswordResponse },
    { name: "IsReady", options: {}, I: IsReadyRequest, O: IsReadyResponse }
]);
