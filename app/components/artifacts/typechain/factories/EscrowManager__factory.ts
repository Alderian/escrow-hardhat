/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../common";
import type { EscrowManager, EscrowManagerInterface } from "../EscrowManager";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "contract Escrow",
        name: "escrow",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        indexed: false,
        internalType: "address",
        name: "_arbiter",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "_beneficiary",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Deployed",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "address",
        name: "_arbiter",
        type: "address",
      },
      {
        internalType: "address",
        name: "_beneficiary",
        type: "address",
      },
    ],
    name: "createEscrow",
    outputs: [
      {
        internalType: "contract Escrow",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "escrows",
    outputs: [
      {
        internalType: "contract Escrow",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_page",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_size",
        type: "uint256",
      },
    ],
    name: "getEscrows",
    outputs: [
      {
        internalType: "contract Escrow[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getEscrowsLength",
    outputs: [
      {
        internalType: "uint256",
        name: "length",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b506119b0806100206000396000f3fe608060405260043610620000445760003560e01c8063012f52ee146200004957806347e5dc20146200008d5780635f99549c14620000d1578063a66a86eb1462000107575b600080fd5b3480156200005657600080fd5b506200007560048036038101906200006f9190620004b9565b62000137565b60405162000084919062000576565b60405180910390f35b3480156200009a57600080fd5b50620000b96004803603810190620000b3919062000593565b62000177565b604051620000c89190620006a8565b60405180910390f35b620000ef6004803603810190620000e9919062000873565b62000359565b604051620000fe919062000576565b60405180910390f35b3480156200011457600080fd5b506200011f62000450565b6040516200012e9190620008ff565b60405180910390f35b600081815481106200014857600080fd5b906000526020600020016000915054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b606060008284846200018a91906200094b565b62000196919062000996565b9050600080805490501480620001be57506001600080549050620001bb919062000996565b81115b156200021b57600067ffffffffffffffff811115620001e257620001e1620006e7565b5b604051908082528060200260200182016040528015620002115781602001602082028036833780820191505090505b5091505062000353565b60008367ffffffffffffffff8111156200023a5762000239620006e7565b5b604051908082528060200260200182016040528015620002695781602001602082028036833780820191505090505b50905060005b85856200027d91906200094b565b8310156200034c57600080549050831015620003265760008381548110620002aa57620002a9620009d1565b5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16828281518110620002eb57620002ea620009d1565b5b602002602001019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff16815250505b8080620003339062000a00565b9150508280620003439062000a00565b9350506200026f565b8193505050505b92915050565b60008034858585336040516200036f906200045c565b6200037e949392919062000ae7565b6040518091039082f09050801580156200039c573d6000803e3d6000fd5b5090506000819080600181540180825580915050600190039060005260206000200160009091909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055507f5512b9a0071acaff9943a9b0eb5793f3ceaf20989b44992069d6a7b2455133518186868633346040516200043d9695949392919062000b3b565b60405180910390a1809150509392505050565b60008080549050905090565b610dcb8062000bb083390190565b6000604051905090565b600080fd5b600080fd5b6000819050919050565b62000493816200047e565b81146200049f57600080fd5b50565b600081359050620004b38162000488565b92915050565b600060208284031215620004d257620004d162000474565b5b6000620004e284828501620004a2565b91505092915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b600062000536620005306200052a84620004eb565b6200050b565b620004eb565b9050919050565b60006200054a8262000515565b9050919050565b60006200055e826200053d565b9050919050565b620005708162000551565b82525050565b60006020820190506200058d600083018462000565565b92915050565b60008060408385031215620005ad57620005ac62000474565b5b6000620005bd85828601620004a2565b9250506020620005d085828601620004a2565b9150509250929050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b620006118162000551565b82525050565b600062000625838362000606565b60208301905092915050565b6000602082019050919050565b60006200064b82620005da565b620006578185620005e5565b93506200066483620005f6565b8060005b838110156200069b5781516200067f888262000617565b97506200068c8362000631565b92505060018101905062000668565b5085935050505092915050565b60006020820190508181036000830152620006c481846200063e565b905092915050565b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6200072182620006d6565b810181811067ffffffffffffffff82111715620007435762000742620006e7565b5b80604052505050565b6000620007586200046a565b905062000766828262000716565b919050565b600067ffffffffffffffff821115620007895762000788620006e7565b5b6200079482620006d6565b9050602081019050919050565b82818337600083830152505050565b6000620007c7620007c1846200076b565b6200074c565b905082815260208101848484011115620007e657620007e5620006d1565b5b620007f3848285620007a1565b509392505050565b600082601f830112620008135762000812620006cc565b5b813562000825848260208601620007b0565b91505092915050565b60006200083b82620004eb565b9050919050565b6200084d816200082e565b81146200085957600080fd5b50565b6000813590506200086d8162000842565b92915050565b6000806000606084860312156200088f576200088e62000474565b5b600084013567ffffffffffffffff811115620008b057620008af62000479565b5b620008be86828701620007fb565b9350506020620008d1868287016200085c565b9250506040620008e4868287016200085c565b9150509250925092565b620008f9816200047e565b82525050565b6000602082019050620009166000830184620008ee565b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600062000958826200047e565b915062000965836200047e565b925082820262000975816200047e565b915082820484148315176200098f576200098e6200091c565b5b5092915050565b6000620009a3826200047e565b9150620009b0836200047e565b9250828203905081811115620009cb57620009ca6200091c565b5b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b600062000a0d826200047e565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff820362000a425762000a416200091c565b5b600182019050919050565b600081519050919050565b600082825260208201905092915050565b60005b8381101562000a8957808201518184015260208101905062000a6c565b60008484015250505050565b600062000aa28262000a4d565b62000aae818562000a58565b935062000ac081856020860162000a69565b62000acb81620006d6565b840191505092915050565b62000ae1816200082e565b82525050565b6000608082019050818103600083015262000b03818762000a95565b905062000b14602083018662000ad6565b62000b23604083018562000ad6565b62000b32606083018462000ad6565b95945050505050565b600060c08201905062000b52600083018962000565565b818103602083015262000b66818862000a95565b905062000b77604083018762000ad6565b62000b86606083018662000ad6565b62000b95608083018562000ad6565b62000ba460a0830184620008ee565b97965050505050505056fe608060405260405162000dcb38038062000dcb833981810160405281019062000029919062000340565b83600490816200003a91906200061c565b50826000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555081600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555033600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505050505062000703565b6000604051905090565b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b620001b18262000166565b810181811067ffffffffffffffff82111715620001d357620001d262000177565b5b80604052505050565b6000620001e862000148565b9050620001f68282620001a6565b919050565b600067ffffffffffffffff82111562000219576200021862000177565b5b620002248262000166565b9050602081019050919050565b60005b838110156200025157808201518184015260208101905062000234565b60008484015250505050565b6000620002746200026e84620001fb565b620001dc565b90508281526020810184848401111562000293576200029262000161565b5b620002a084828562000231565b509392505050565b600082601f830112620002c057620002bf6200015c565b5b8151620002d28482602086016200025d565b91505092915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006200030882620002db565b9050919050565b6200031a81620002fb565b81146200032657600080fd5b50565b6000815190506200033a816200030f565b92915050565b600080600080608085870312156200035d576200035c62000152565b5b600085015167ffffffffffffffff8111156200037e576200037d62000157565b5b6200038c87828801620002a8565b94505060206200039f8782880162000329565b9350506040620003b28782880162000329565b9250506060620003c58782880162000329565b91505092959194509250565b600081519050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806200042457607f821691505b6020821081036200043a5762000439620003dc565b5b50919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b600060088302620004a47fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8262000465565b620004b0868362000465565b95508019841693508086168417925050509392505050565b6000819050919050565b6000819050919050565b6000620004fd620004f7620004f184620004c8565b620004d2565b620004c8565b9050919050565b6000819050919050565b6200051983620004dc565b62000531620005288262000504565b84845462000472565b825550505050565b600090565b6200054862000539565b620005558184846200050e565b505050565b5b818110156200057d57620005716000826200053e565b6001810190506200055b565b5050565b601f821115620005cc57620005968162000440565b620005a18462000455565b81016020851015620005b1578190505b620005c9620005c08562000455565b8301826200055a565b50505b505050565b600082821c905092915050565b6000620005f160001984600802620005d1565b1980831691505092915050565b60006200060c8383620005de565b9150826002028217905092915050565b6200062782620003d1565b67ffffffffffffffff81111562000643576200064262000177565b5b6200064f82546200040b565b6200065c82828562000581565b600060209050601f8311600181146200069457600084156200067f578287015190505b6200068b8582620005fe565b865550620006fb565b601f198416620006a48662000440565b60005b82811015620006ce57848901518255600182019150602085019450602081019050620006a7565b86831015620006ee5784890151620006ea601f891682620005de565b8355505b6001600288020188555050505b505050505050565b6106b880620007136000396000f3fe608060405234801561001057600080fd5b506004361061007d5760003560e01c806338af3eed1161005b57806338af3eed146100c85780638da5cb5b146100e6578063c7c4ff4614610104578063fe25e00a146101225761007d565b806306fdde031461008257806312424e3f146100a057806328f371aa146100aa575b600080fd5b61008a610140565b6040516100979190610488565b60405180910390f35b6100a86101ce565b005b6100b261034f565b6040516100bf91906104c5565b60405180910390f35b6100d0610362565b6040516100dd9190610521565b60405180910390f35b6100ee610388565b6040516100fb9190610521565b60405180910390f35b61010c6103ae565b6040516101199190610521565b60405180910390f35b61012a6103d4565b6040516101379190610521565b60405180910390f35b6004805461014d9061056b565b80601f01602080910402602001604051908101604052809291908181526020018280546101799061056b565b80156101c65780601f1061019b576101008083540402835291602001916101c6565b820191906000526020600020905b8154815290600101906020018083116101a957829003601f168201915b505050505081565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461022657600080fd5b60004790506000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1682604051610273906105cd565b60006040518083038185875af1925050503d80600081146102b0576040519150601f19603f3d011682016040523d82523d6000602084013e6102b5565b606091505b50509050806102f9576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016102f09061062e565b60405180910390fd5b7f3ad93af63cb7967b23e4fb500b7d7d28b07516325dcf341f88bebf959d82c1cb826040516103289190610667565b60405180910390a16001600560006101000a81548160ff0219169083151502179055505050565b600560009054906101000a900460ff1681565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600081519050919050565b600082825260208201905092915050565b60005b83811015610432578082015181840152602081019050610417565b60008484015250505050565b6000601f19601f8301169050919050565b600061045a826103f8565b6104648185610403565b9350610474818560208601610414565b61047d8161043e565b840191505092915050565b600060208201905081810360008301526104a2818461044f565b905092915050565b60008115159050919050565b6104bf816104aa565b82525050565b60006020820190506104da60008301846104b6565b92915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600061050b826104e0565b9050919050565b61051b81610500565b82525050565b60006020820190506105366000830184610512565b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6000600282049050600182168061058357607f821691505b6020821081036105965761059561053c565b5b50919050565b600081905092915050565b50565b60006105b760008361059c565b91506105c2826105a7565b600082019050919050565b60006105d8826105aa565b9150819050919050565b7f4661696c656420746f2073656e64204574686572000000000000000000000000600082015250565b6000610618601483610403565b9150610623826105e2565b602082019050919050565b600060208201905081810360008301526106478161060b565b9050919050565b6000819050919050565b6106618161064e565b82525050565b600060208201905061067c6000830184610658565b9291505056fea264697066735822122047c009b8472e687e01d13a175e87e46eee51ad49997c6b377ca8e25706d15f2064736f6c63430008110033a264697066735822122042d6f1bf45b0439e45fc3c85b99f38828427c74d24f58218517816319124e01964736f6c63430008110033";

type EscrowManagerConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: EscrowManagerConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class EscrowManager__factory extends ContractFactory {
  constructor(...args: EscrowManagerConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<EscrowManager> {
    return super.deploy(overrides || {}) as Promise<EscrowManager>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): EscrowManager {
    return super.attach(address) as EscrowManager;
  }
  override connect(signer: Signer): EscrowManager__factory {
    return super.connect(signer) as EscrowManager__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): EscrowManagerInterface {
    return new utils.Interface(_abi) as EscrowManagerInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): EscrowManager {
    return new Contract(address, _abi, signerOrProvider) as EscrowManager;
  }
}
