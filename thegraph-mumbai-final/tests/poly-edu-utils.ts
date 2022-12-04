import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import {
  ApprovalForAll,
  CertificateIssued,
  CreateCourse,
  CrossTalkReceive,
  CrossTalkSend,
  Linkevent,
  OwnershipTransferred,
  TransferBatch,
  TransferSingle,
  URI,
  Unlinkevent
} from "../generated/PolyEdu/PolyEdu"

export function createApprovalForAllEvent(
  account: Address,
  operator: Address,
  approved: boolean
): ApprovalForAll {
  let approvalForAllEvent = changetype<ApprovalForAll>(newMockEvent())

  approvalForAllEvent.parameters = new Array()

  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("operator", ethereum.Value.fromAddress(operator))
  )
  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("approved", ethereum.Value.fromBoolean(approved))
  )

  return approvalForAllEvent
}

export function createCertificateIssuedEvent(
  projectId: BigInt,
  student: Address,
  timestamp: BigInt,
  certificate_meta: string
): CertificateIssued {
  let certificateIssuedEvent = changetype<CertificateIssued>(newMockEvent())

  certificateIssuedEvent.parameters = new Array()

  certificateIssuedEvent.parameters.push(
    new ethereum.EventParam(
      "projectId",
      ethereum.Value.fromUnsignedBigInt(projectId)
    )
  )
  certificateIssuedEvent.parameters.push(
    new ethereum.EventParam("student", ethereum.Value.fromAddress(student))
  )
  certificateIssuedEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )
  certificateIssuedEvent.parameters.push(
    new ethereum.EventParam(
      "certificate_meta",
      ethereum.Value.fromString(certificate_meta)
    )
  )

  return certificateIssuedEvent
}

export function createCreateCourseEvent(
  projectId: BigInt,
  ans: Array<BigInt>,
  creator: Address,
  course_meta: string,
  certificate_meta: string,
  timestamp: BigInt
): CreateCourse {
  let createCourseEvent = changetype<CreateCourse>(newMockEvent())

  createCourseEvent.parameters = new Array()

  createCourseEvent.parameters.push(
    new ethereum.EventParam(
      "projectId",
      ethereum.Value.fromUnsignedBigInt(projectId)
    )
  )
  createCourseEvent.parameters.push(
    new ethereum.EventParam("ans", ethereum.Value.fromUnsignedBigIntArray(ans))
  )
  createCourseEvent.parameters.push(
    new ethereum.EventParam("creator", ethereum.Value.fromAddress(creator))
  )
  createCourseEvent.parameters.push(
    new ethereum.EventParam(
      "course_meta",
      ethereum.Value.fromString(course_meta)
    )
  )
  createCourseEvent.parameters.push(
    new ethereum.EventParam(
      "certificate_meta",
      ethereum.Value.fromString(certificate_meta)
    )
  )
  createCourseEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )

  return createCourseEvent
}

export function createCrossTalkReceiveEvent(
  sourceChain: i32,
  destChain: i32,
  sourceAddress: Address
): CrossTalkReceive {
  let crossTalkReceiveEvent = changetype<CrossTalkReceive>(newMockEvent())

  crossTalkReceiveEvent.parameters = new Array()

  crossTalkReceiveEvent.parameters.push(
    new ethereum.EventParam(
      "sourceChain",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(sourceChain))
    )
  )
  crossTalkReceiveEvent.parameters.push(
    new ethereum.EventParam(
      "destChain",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(destChain))
    )
  )
  crossTalkReceiveEvent.parameters.push(
    new ethereum.EventParam(
      "sourceAddress",
      ethereum.Value.fromAddress(sourceAddress)
    )
  )

  return crossTalkReceiveEvent
}

export function createCrossTalkSendEvent(
  sourceChain: i32,
  destChain: i32,
  sourceAddress: Address,
  destinationAddress: Address,
  _selector: Bytes,
  _data: Bytes,
  _hash: Bytes
): CrossTalkSend {
  let crossTalkSendEvent = changetype<CrossTalkSend>(newMockEvent())

  crossTalkSendEvent.parameters = new Array()

  crossTalkSendEvent.parameters.push(
    new ethereum.EventParam(
      "sourceChain",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(sourceChain))
    )
  )
  crossTalkSendEvent.parameters.push(
    new ethereum.EventParam(
      "destChain",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(destChain))
    )
  )
  crossTalkSendEvent.parameters.push(
    new ethereum.EventParam(
      "sourceAddress",
      ethereum.Value.fromAddress(sourceAddress)
    )
  )
  crossTalkSendEvent.parameters.push(
    new ethereum.EventParam(
      "destinationAddress",
      ethereum.Value.fromAddress(destinationAddress)
    )
  )
  crossTalkSendEvent.parameters.push(
    new ethereum.EventParam(
      "_selector",
      ethereum.Value.fromFixedBytes(_selector)
    )
  )
  crossTalkSendEvent.parameters.push(
    new ethereum.EventParam("_data", ethereum.Value.fromBytes(_data))
  )
  crossTalkSendEvent.parameters.push(
    new ethereum.EventParam("_hash", ethereum.Value.fromFixedBytes(_hash))
  )

  return crossTalkSendEvent
}

export function createLinkeventEvent(
  ChainID: i32,
  linkedContract: Address
): Linkevent {
  let linkeventEvent = changetype<Linkevent>(newMockEvent())

  linkeventEvent.parameters = new Array()

  linkeventEvent.parameters.push(
    new ethereum.EventParam(
      "ChainID",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(ChainID))
    )
  )
  linkeventEvent.parameters.push(
    new ethereum.EventParam(
      "linkedContract",
      ethereum.Value.fromAddress(linkedContract)
    )
  )

  return linkeventEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createTransferBatchEvent(
  operator: Address,
  from: Address,
  to: Address,
  ids: Array<BigInt>,
  values: Array<BigInt>
): TransferBatch {
  let transferBatchEvent = changetype<TransferBatch>(newMockEvent())

  transferBatchEvent.parameters = new Array()

  transferBatchEvent.parameters.push(
    new ethereum.EventParam("operator", ethereum.Value.fromAddress(operator))
  )
  transferBatchEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  transferBatchEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  transferBatchEvent.parameters.push(
    new ethereum.EventParam("ids", ethereum.Value.fromUnsignedBigIntArray(ids))
  )
  transferBatchEvent.parameters.push(
    new ethereum.EventParam(
      "values",
      ethereum.Value.fromUnsignedBigIntArray(values)
    )
  )

  return transferBatchEvent
}

export function createTransferSingleEvent(
  operator: Address,
  from: Address,
  to: Address,
  id: BigInt,
  value: BigInt
): TransferSingle {
  let transferSingleEvent = changetype<TransferSingle>(newMockEvent())

  transferSingleEvent.parameters = new Array()

  transferSingleEvent.parameters.push(
    new ethereum.EventParam("operator", ethereum.Value.fromAddress(operator))
  )
  transferSingleEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  transferSingleEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  transferSingleEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )
  transferSingleEvent.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromUnsignedBigInt(value))
  )

  return transferSingleEvent
}

export function createURIEvent(value: string, id: BigInt): URI {
  let uriEvent = changetype<URI>(newMockEvent())

  uriEvent.parameters = new Array()

  uriEvent.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromString(value))
  )
  uriEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )

  return uriEvent
}

export function createUnlinkeventEvent(
  ChainID: i32,
  linkedContract: Address
): Unlinkevent {
  let unlinkeventEvent = changetype<Unlinkevent>(newMockEvent())

  unlinkeventEvent.parameters = new Array()

  unlinkeventEvent.parameters.push(
    new ethereum.EventParam(
      "ChainID",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(ChainID))
    )
  )
  unlinkeventEvent.parameters.push(
    new ethereum.EventParam(
      "linkedContract",
      ethereum.Value.fromAddress(linkedContract)
    )
  )

  return unlinkeventEvent
}
