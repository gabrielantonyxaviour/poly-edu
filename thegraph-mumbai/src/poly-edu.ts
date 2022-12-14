import { BigInt, Address } from "@graphprotocol/graph-ts";
import {
  PolyEdu,
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
  Unlinkevent,
} from "../generated/PolyEdu/PolyEdu";
import { Course, Certificate } from "../generated/schema";

export function handleApprovalForAll(event: ApprovalForAll): void {}

export function handleCertificateIssued(event: CertificateIssued): void {
  let certificate = Certificate.load(
    getIdFromEventParams(event.params.projectId, event.params.student)
  );
  if (!certificate) {
    certificate = new Certificate(
      getIdFromEventParams(event.params.projectId, event.params.student)
    );
  }
  certificate.projectId = event.params.projectId;
  certificate.student = event.params.student;
  certificate.issueTimestamp = event.params.timestamp;
  certificate.save();
  let course = Course.load(event.params.projectId.toHexString());
  if (!course) {
    course = new Course(event.params.projectId.toHexString());
  }
  course.isCompleted = true;
  course.save();
}

export function handleCreateCourse(event: CreateCourse): void {
  let course = Course.load(event.params.projectId.toHexString());
  if (!course) {
    course = new Course(event.params.projectId.toHexString());
  }
  course.isCompleted = false;
  course.created_at = event.params.timestamp;
  course.creator = event.params.creator;
  course.course_meta = event.params.course_meta;
  course.certificate_meta = event.params.certificate_meta;
  course.save();
}

function getIdFromEventParams(projectId: BigInt, student: Address) {
  return student.toHexString() + projectId.toHexString();
}

export function handleCrossTalkReceive(event: CrossTalkReceive): void {}

export function handleCrossTalkSend(event: CrossTalkSend): void {}

export function handleLinkevent(event: Linkevent): void {}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {}

export function handleTransferBatch(event: TransferBatch): void {}

export function handleTransferSingle(event: TransferSingle): void {}

export function handleURI(event: URI): void {}

export function handleUnlinkevent(event: Unlinkevent): void {}
