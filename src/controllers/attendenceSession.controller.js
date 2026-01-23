import { asyncHandler } from "../utils/asyncHandler.js";
import { TimetableSlot } from "../models/timetable.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import assertObjectId from "../utils/assertObjectId.js";
import { Student } from "../models/student.model.js";
import { Faculty } from "../models/faculty.model.js";
import { AttendanceSession } from "../models/attendenceSession.model.js";

const generateSessions = asyncHandler(async (req, res) => {
  const { institutionId, date } = req.body;

  assertObjectId(institutionId);

  const d = date ? new Date(date) : new Date();
  const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][d.getDay()];

  const exists = await AttendanceSession.findOne({ institutionId, date: d });
  if (exists) {
    return res.json(new ApiResponse("Sessions already generated for this day", 200));
  }

  const slots = await TimetableSlot.find({ institutionId, dayOfWeek: day });

  const sessions = await Promise.all(
    slots.map(s =>
      AttendanceSession.create({
        institutionId: s.institutionId,
        slotId: s._id,
        courseId: s.courseId,
        facultyId: s.facultyId,
        batch: s.batch,
        semester: s.semester,
        date: d,
        startTime: s.startTime,
        endTime: s.endTime,
        status: "scheduled"
      })
    )
  );

  res.json(new ApiResponse("Attendance sessions generated", 201, sessions));
});

const getFacultySessions = asyncHandler(async (req, res) => {
  const { facultyId } = req.params;
  assertObjectId(facultyId);

  const date = req.query.date ? new Date(req.query.date) : new Date();

  const sessions = await AttendanceSession.find({
    facultyId,
    date: {
      $gte: new Date(date.setHours(0, 0, 0, 0)),
      $lte: new Date(date.setHours(23, 59, 59, 999))
    }
  })
    .populate("courseId slotId facultyId");

  res.json(new ApiResponse("Faculty sessions fetched", 200, sessions));
});

const getBatchSessions = asyncHandler(async (req, res) => {
  const { batch, semester } = req.query;

  const date = req.query.date ? new Date(req.query.date) : new Date();

  const sessions = await AttendanceSession.find({
    batch,
    semester: Number(semester),
    date: {
      $gte: new Date(date.setHours(0, 0, 0, 0)),
      $lte: new Date(date.setHours(23, 59, 59, 999))
    }
  }).populate("courseId facultyId slotId");

  res.json(new ApiResponse("Batch sessions fetched", 200, sessions));
});

const getStudentSessions = asyncHandler(async (req, res) => {
  const { studentId } = req.params;
  assertObjectId(studentId);

  const student = await Student.findById(studentId);
  if (!student) throw new ApiError("Student not found", 404);

  const batch = `${student.branchId}-${student.admissionYear}`;

  const date = req.query.date ? new Date(req.query.date) : new Date();

  const sessions = await AttendanceSession.find({
    batch,
    semester: student.semester,
    date: {
      $gte: new Date(date.setHours(0, 0, 0, 0)),
      $lte: new Date(date.setHours(23, 59, 59, 999))
    }
  }).populate("courseId facultyId slotId");

  res.json(new ApiResponse("Student sessions fetched", 200, sessions));
});

const cancelSession = asyncHandler(async (req, res) => {
  const { sessionId } = req.params;
  assertObjectId(sessionId);

  await AttendanceSession.findByIdAndUpdate(sessionId, { status: "cancelled" });

  res.json(new ApiResponse("Session cancelled", 200));
});

const holidaySession = asyncHandler(async (req, res) => {
  const { sessionId } = req.params;
  assertObjectId(sessionId);

  await AttendanceSession.findByIdAndUpdate(sessionId, { status: "holiday" });

  res.json(new ApiResponse("Session marked as holiday", 200));
});

const deleteSession = asyncHandler(async (req, res) => {
  const { sessionId } = req.params;
  assertObjectId(sessionId);

  await AttendanceSession.findByIdAndDelete(sessionId);

  res.json(new ApiResponse("Session deleted", 200));
});

const getInstitutionSessions = asyncHandler(async (req, res) => {
  const { institutionId } = req.params;
  assertObjectId(institutionId);

  const date = req.query.date ? new Date(req.query.date) : new Date();

  const sessions = await AttendanceSession.find({
    institutionId,
    date: {
      $gte: new Date(date.setHours(0, 0, 0, 0)),
      $lte: new Date(date.setHours(23, 59, 59, 999))
    }
  }).populate("courseId facultyId slotId");

  res.json(new ApiResponse("Institution sessions fetched", 200, sessions));
});

const generateFacultySessionsManual = asyncHandler(async (req, res) => {
  const { facultyId } = req.params;
  assertObjectId(facultyId);
  const faculty = await Faculty.findById(facultyId);
  if (!faculty) throw new ApiError("Faculty not found", 404);

  const institutionId = faculty.institutionId;

  const today = new Date();
  const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][today.getDay()];
  const slots = await TimetableSlot.find({
    institutionId,
    facultyId,
    dayOfWeek: day
  });

  if (slots.length === 0) {
    return res.json(new ApiResponse("No sessions for faculty today", 200, []));
  }
  const existing = await AttendanceSession.findOne({
    facultyId,
    date: today
  });

  if (existing) {
    return res.json(new ApiResponse("Sessions already generated today", 200));
  }

  const sessions = await Promise.all(
    slots.map(s =>
      AttendanceSession.create({
        institutionId,
        slotId: s._id,
        courseId: s.courseId,
        facultyId: s.facultyId,
        batch: s.batch,
        semester: s.semester,
        date: today,
        startTime: s.startTime,
        endTime: s.endTime,
        status: "scheduled"
      })
    )
  );

  res.json(new ApiResponse("Faculty sessions generated manually", 201, sessions));
});

export {
  generateSessions,
  getFacultySessions,
  getBatchSessions,
  getStudentSessions,
  getInstitutionSessions,
  cancelSession,
  holidaySession,
  deleteSession,
  generateFacultySessionsManual
};
