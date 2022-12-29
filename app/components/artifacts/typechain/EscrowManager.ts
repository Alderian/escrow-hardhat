/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  PayableOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "./common";

export interface EscrowManagerInterface extends utils.Interface {
  functions: {
    "createEscrow(string,address,address)": FunctionFragment;
    "escrows(uint256)": FunctionFragment;
    "getEscrows(uint256,uint256)": FunctionFragment;
    "getEscrowsLength()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "createEscrow"
      | "escrows"
      | "getEscrows"
      | "getEscrowsLength"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "createEscrow",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<string>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "escrows",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getEscrows",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getEscrowsLength",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "createEscrow",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "escrows", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getEscrows", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getEscrowsLength",
    data: BytesLike
  ): Result;

  events: {
    "Deployed(address,string,address,address,address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Deployed"): EventFragment;
}

export interface DeployedEventObject {
  escrow: string;
  name: string;
  _arbiter: string;
  _beneficiary: string;
  owner: string;
  value: BigNumber;
}
export type DeployedEvent = TypedEvent<
  [string, string, string, string, string, BigNumber],
  DeployedEventObject
>;

export type DeployedEventFilter = TypedEventFilter<DeployedEvent>;

export interface EscrowManager extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: EscrowManagerInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    createEscrow(
      name: PromiseOrValue<string>,
      _arbiter: PromiseOrValue<string>,
      _beneficiary: PromiseOrValue<string>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    escrows(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    getEscrows(
      _page: PromiseOrValue<BigNumberish>,
      _size: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string[]]>;

    getEscrowsLength(
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { length: BigNumber }>;
  };

  createEscrow(
    name: PromiseOrValue<string>,
    _arbiter: PromiseOrValue<string>,
    _beneficiary: PromiseOrValue<string>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  escrows(
    arg0: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<string>;

  getEscrows(
    _page: PromiseOrValue<BigNumberish>,
    _size: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<string[]>;

  getEscrowsLength(overrides?: CallOverrides): Promise<BigNumber>;

  callStatic: {
    createEscrow(
      name: PromiseOrValue<string>,
      _arbiter: PromiseOrValue<string>,
      _beneficiary: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<string>;

    escrows(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;

    getEscrows(
      _page: PromiseOrValue<BigNumberish>,
      _size: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string[]>;

    getEscrowsLength(overrides?: CallOverrides): Promise<BigNumber>;
  };

  filters: {
    "Deployed(address,string,address,address,address,uint256)"(
      escrow?: null,
      name?: null,
      _arbiter?: null,
      _beneficiary?: null,
      owner?: null,
      value?: null
    ): DeployedEventFilter;
    Deployed(
      escrow?: null,
      name?: null,
      _arbiter?: null,
      _beneficiary?: null,
      owner?: null,
      value?: null
    ): DeployedEventFilter;
  };

  estimateGas: {
    createEscrow(
      name: PromiseOrValue<string>,
      _arbiter: PromiseOrValue<string>,
      _beneficiary: PromiseOrValue<string>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    escrows(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getEscrows(
      _page: PromiseOrValue<BigNumberish>,
      _size: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getEscrowsLength(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    createEscrow(
      name: PromiseOrValue<string>,
      _arbiter: PromiseOrValue<string>,
      _beneficiary: PromiseOrValue<string>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    escrows(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getEscrows(
      _page: PromiseOrValue<BigNumberish>,
      _size: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getEscrowsLength(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}