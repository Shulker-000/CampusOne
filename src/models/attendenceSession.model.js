import mongoose from "mongoose";

const attendanceSessionSchema = new mongoose.Schema(
  {
    institutionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Institution",
      required: true
    },
    slotId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TimetableSlot",
      default: null
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true
    },
    facultyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Faculty",
      required: true
    },
    batch: {
      type: String,
      required: true
    },
    semester: {
      type: Number,
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    startTime: {
      type: String, // HH:MM
      required: true
    },
    endTime: {
      type: String, // HH:MM
      required: true
    },
    status: {
      type: String,
      enum: ["scheduled", "conducted", "cancelled", "holiday"],
      default: "scheduled"
    }
  },
  { timestamps: true }
);

attendanceSessionSchema.index({ institutionId: 1, date: 1, facultyId: 1 });
attendanceSessionSchema.index({ institutionId: 1, date: 1, batch: 1 });
attendanceSessionSchema.index({ institutionId: 1, courseId: 1, date: 1 });
attendanceSessionSchema.index({ institutionId: 1, semester: 1, date: 1 });

export const AttendanceSession = mongoose.model("AttendanceSession", attendanceSessionSchema);
