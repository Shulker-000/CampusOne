import mongoose from "mongoose";

const guardianDetailSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true
        },
        contactNumber: {
            type: String,
            trim: true
        },
        relation: {
            type: String,
            trim: true
        }
    },
    { _id: false }
);

const studentSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            unique: true
        },
        institutionId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Institution',
            required: true
        },
        branchId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Branch',
            required: true
        },
        enrollmentNumber: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        courseIds: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course'
        }],
        prevCourses: [{
            courseId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Course'
            },
            semester: {
                type: Number,
                required: true
            }
        }],
        semester: {
            type: Number,
            required: true
        },
        admissionYear: {
            type: Number,
            required: true
        },
        hostelStatus: {
            type: Boolean,
            default: false
        },
        guardianDetails: [guardianDetailSchema]
    },
    {
        timestamps: true
    }
);


studentSchema.index({ branchId: 1 });
studentSchema.index({ courseIds: 1 });
studentSchema.index({ "prevCourses.courseId": 1 });
studentSchema.index({ enrollmentNumber: 1 }, { unique: true });
studentSchema.index({ userId: 1 }, { unique: true });

studentSchema.index({
    institutionId: 1,
    courseIds: 1,
    branchId: 1,
    admissionYear: 1
});

export const Student = mongoose.model("Student", studentSchema);
