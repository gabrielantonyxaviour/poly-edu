import { Address, BigInt } from "@graphprotocol/graph-ts";
import {
  CertificateIssued,
  CreateCourse,
  PolyEdu,
} from "../generated/PolyEdu/PolyEdu";
import { Course, Certificate } from "../generated/schema";

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
