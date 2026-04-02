# CampusOne

> **CampusOne** is a complete institutional management backend that handles academics, attendance, approvals, timetable, responsibilities and user workflows.
> Built with **Node.js, Express, MongoDB, JWT Auth, Multer, Cloudinary & Kafka (event-driven bulk import processing).**

---

## User Authentication & Profile Routes

**Base Path:** `/api/users`

| Method | Endpoint                   | Access          | Description                   |
| ------ | -------------------------- | --------------- | ----------------------------- |
| POST   | `/register`                | Institution JWT | Create user under institution |
| POST   | `/login`                   | Public          | Login user                    |
| POST   | `/refresh`                 | Public          | Refresh access token          |
| POST   | `/forgot-password`         | Public          | Send reset mail               |
| POST   | `/reset-password/:token`   | Public          | Reset password                |
| GET    | `/verify-email/:token`     | Public          | Verify email                  |
| GET    | `/current-user`            | User JWT        | Get logged in user            |
| POST   | `/logout`                  | User JWT        | Logout                        |
| POST   | `/send-email-verification` | User JWT        | Send verification mail        |
| POST   | `/update-avatar`           | User JWT        | Update avatar                 |
| PUT    | `/update`                  | User JWT        | Update profile                |
| GET    | `/faculty`                 | User JWT        | Get linked faculty            |
| DELETE | `/delete/:userId`          | Institution JWT | Delete user                   |

---

## Institution Routes

**Base Path:** `/api/institutions`

| Method | Endpoint                     | Access          | Description                  |
| ------ | ---------------------------- | --------------- | ---------------------------- |
| GET    | `/`                          | Public          | Get all institutions         |
| GET    | `/:institutionId`            | Public          | Get institution              |
| POST   | `/register`                  | Public          | Register institution         |
| POST   | `/login`                     | Public          | Login institution            |
| POST   | `/refresh`                   | Public          | Refresh token                |
| POST   | `/forgot-password`           | Public          | Forgot password              |
| POST   | `/reset-password/:token`     | Public          | Reset password               |
| GET    | `/verify-email/:token`       | Public          | Verify email                 |
| GET    | `/current-institution`       | Institution JWT | Current institution          |
| POST   | `/logout`                    | Institution JWT | Logout                       |
| POST   | `/send-email-verification`   | Institution JWT | Send verification            |
| POST   | `/update-avatar`             | Institution JWT | Update avatar                |
| PUT    | `/update`                    | Institution JWT | Update institution           |
| PUT    | `/toggle-application-status` | Institution JWT | Toggle admission application |
| DELETE | `/delete/:institutionId`     | Institution JWT | Delete institution           |
| POST   | `/code-exists`               | Public          | Check institution code       |

---

## Faculty Management

**Base Path:** `/api/faculties`

| Method | Endpoint                                    | Access          | Description                 |
| ------ | ------------------------------------------- | --------------- | --------------------------- |
| GET    | `/:facultyId`                               | Public          | Get faculty                 |
| POST   | `/`                                         | Institution JWT | Create faculty              |
| PUT    | `/:facultyId`                               | Institution JWT | Edit faculty                |
| DELETE | `/:facultyId`                               | Institution JWT | Delete faculty              |
| GET    | `/by-institution/:institutionId`            | Institution JWT | Faculties of institution    |
| GET    | `/by-department/:departmentId`              | Institution JWT | Faculties by department     |
| PUT    | `/:facultyId/department`                    | Institution JWT | Update department           |
| PUT    | `/:facultyId/status`                        | Institution JWT | Activate/Deactivate         |
| PUT    | `/:facultyId/in-charge`                     | Institution JWT | Toggle in-charge            |
| PUT    | `/:facultyId/courses`                       | Institution JWT | Assign courses              |
| PUT    | `/:facultyId/courses/:courseId/finish`      | Institution JWT | Finish assigned course      |
| DELETE | `/:facultyId/courses/:courseId`             | Institution JWT | Remove course               |
| DELETE | `/:facultyId/prev-courses/:courseId`        | Institution JWT | Remove previous course      |
| PUT    | `/self/:facultyId`                          | User JWT        | Self edit                   |
| PUT    | `/self/:facultyId/courses`                  | User JWT        | Self assign courses         |
| PUT    | `/self/:facultyId/courses/:courseId/finish` | User JWT        | Self finish assigned course |
| DELETE | `/self/:facultyId/courses/:courseId`        | User JWT        | Self remove course          |
| DELETE | `/self/:facultyId/prev-courses/:courseId`   | User JWT        | Self remove previous course |

---

## Student Management

**Base Path:** `/api/students`

| Method | Endpoint                              | Access          | Description                                |
| ------ | ------------------------------------- | --------------- | ------------------------------------------ |
| POST   | `/create-student`                     | Institution JWT | Create student                             |
| PUT    | `/edit-student/:studentId`            | Institution JWT | Edit student                               |
| PUT    | `/edit/:studentId`                    | User JWT        | Faculty self edit student                  |
| DELETE | `/delete-student/:studentId`          | Institution JWT | Delete student                             |
| GET    | `/institution/:institutionId`         | Institution JWT | Students by institution                    |
| GET    | `/institution-faculty/:institutionId` | User JWT        | Students by institution (faculty scope)    |
| GET    | `/branch/:branchId`                   | Institution JWT | Students by branch                         |
| GET    | `/branch-faculty/:branchId`           | User JWT        | Students by branch (faculty scope)         |
| PUT    | `/update-branch/:studentId`           | Institution JWT | Update branch                              |
| PUT    | `/update-hostel-status/:studentId`    | Institution JWT | Hostel status                              |
| PUT    | `/update-hostel/:studentId`           | User JWT        | Update hostel status                       |
| PUT    | `/update-semester/:studentId`         | Institution JWT | Update semester                            |
| PUT    | `/change-status/:studentId`           | Institution JWT | Activate/Deactivate                        |
| PUT    | `/add-courses/:studentId`             | Institution JWT | Add courses                                |
| PUT    | `/delete-courses/:studentId`          | Institution JWT | Delete courses                             |
| PUT    | `/delete-prev-courses/:studentId`     | Institution JWT | Delete previous courses                    |
| PUT    | `/finish-courses/:studentId`          | Institution JWT | Finish courses                             |
| PUT    | `/updateSemesterByBatch`              | Institution JWT | Bulk semester update                       |
| PUT    | `/addCourses`                         | Institution JWT | Bulk add courses by enrollment numbers     |
| PUT    | `/finishCourses`                      | Institution JWT | Bulk finish courses by enrollment numbers  |
| PUT    | `/addCoursesByBatch`                  | Institution JWT | Bulk add courses by batch                  |
| PUT    | `/updateSemester`                     | Institution JWT | Bulk update semester by enrollment numbers |
| PUT    | `/bulkDeactivate`                     | Institution JWT | Bulk deactivate by enrollment numbers      |
| PUT    | `/deactivateBatch`                    | Institution JWT | Bulk deactivate by branch & year           |
| GET    | `/:studentId`                         | Public          | Student by id                              |

---

## Department & Branch

### Department (`/api/departments`)

| Method | Endpoint                           | Access          | Description                    |
| ------ | ---------------------------------- | --------------- | ------------------------------ |
| GET    | `/institution/:institutionId`      | Public          | Get departments by institution |
| GET    | `/:departmentId`                   | Public          | Get department by ID           |
| POST   | `/create-department`               | Institution JWT | Create department              |
| PUT    | `/update-department/:departmentId` | Institution JWT | Update department              |
| DELETE | `/delete-department/:departmentId` | Institution JWT | Delete department              |
| POST   | `/code-exists`                     | Institution JWT | Check department code          |
| POST   | `/add-hod/:departmentId`           | Institution JWT | Add HOD                        |
| POST   | `/remove-hod/:departmentId`        | Institution JWT | Remove HOD                     |

### Branch (`/api/branches`)

| Method | Endpoint                       | Access          | Description              |
| ------ | ------------------------------ | --------------- | ------------------------ |
| GET    | `/institutions/:institutionId` | Public          | Branches by institution  |
| GET    | `/departments/:departmentId`   | Public          | Branches by department   |
| GET    | `/:branchId/department`        | Public          | Get department of branch |
| GET    | `/:branchId`                   | Public          | Branch by id             |
| POST   | `/institutions/:institutionId` | Public          | Create branch            |
| POST   | `/code-exists`                 | Institution JWT | Check branch code        |
| PUT    | `/:branchId`                   | Public          | Update branch            |
| PATCH  | `/:branchId/status`            | Public          | Activate/Deactivate      |
| DELETE | `/:branchId`                   | Public          | Delete branch            |

---

## Course Management

**Base Path:** `/api/courses`

| Method | Endpoint                                                    | Access          | Description                 |
| ------ | ----------------------------------------------------------- | --------------- | --------------------------- |
| GET    | `/department/:departmentId`                                 | Public          | Courses by department       |
| GET    | `/institution/:institutionId`                               | Public          | Courses by institution      |
| GET    | `/:courseId`                                                | Public          | Course by id                |
| POST   | `/create-course`                                            | Institution JWT | Create                      |
| PUT    | `/:courseId`                                                | Institution JWT | Update                      |
| DELETE | `/:courseId`                                                | Institution JWT | Delete                      |
| PUT    | `/change-status/:courseId`                                  | Institution JWT | Activate/Deactivate         |
| POST   | `/code-exists`                                              | Institution JWT | Check course code           |
| GET    | `/faculty/course/:courseId/institution/:institutionId`      | Public          | Faculty by current course   |
| GET    | `/faculty/prev-course/:courseId/institution/:institutionId` | Public          | Faculty by previous course  |
| GET    | `/student/course/:courseId/institution/:institutionId`      | Public          | Students by current course  |
| GET    | `/student/prev-course/:courseId/institution/:institutionId` | Public          | Students by previous course |

---

## Timetable & Sessions

### Timetable (`/api/timetableSlots`)

| Method | Endpoint                            | Access          | Description                   |
| ------ | ----------------------------------- | --------------- | ----------------------------- |
| GET    | `/faculty/:facultyId`               | Public          | Get timetable for faculty     |
| GET    | `/student/:studentId`               | Public          | Get timetable for student     |
| GET    | `/institution/:institutionId`       | Public          | Get timetable for institution |
| POST   | `/slot`                             | Institution JWT | Create a timetable slot       |
| PATCH  | `/slot/:slotId`                     | Institution JWT | Update a timetable slot       |
| DELETE | `/slot/:slotId`                     | Institution JWT | Delete a timetable slot       |
| DELETE | `/institution/:institutionId/clear` | Institution JWT | Clear institution timetable   |

### Attendance Sessions (`/api/attendance`)

| Method | Endpoint                      | Access          | Description                      |
| ------ | ----------------------------- | --------------- | -------------------------------- |
| GET    | `/faculty/:facultyId`         | Public          | List sessions for a faculty      |
| GET    | `/student/:studentId`         | Public          | List sessions for a student      |
| GET    | `/batch`                      | Public          | List sessions for current batch  |
| GET    | `/institution/:institutionId` | Public          | List sessions for an institution |
| POST   | `/generate`                   | Institution JWT | Generate new attendance sessions |
| POST   | `/manual/faculty/:facultyId`  | User JWT        | Generate manual faculty sessions |
| PATCH  | `/:sessionId/cancel`          | User JWT        | Cancel an attendance session     |
| PATCH  | `/:sessionId/holiday`         | User JWT        | Mark session as holiday          |
| DELETE | `/:sessionId`                 | User JWT        | Delete an attendance session     |

---

## Attendance Records

**Base Path:** `/api/attendanceRecords`

| Method | Endpoint                                             | Access          | Description             |
| ------ | ---------------------------------------------------- | --------------- | ----------------------- |
| POST   | `/user/:sessionId/mark`                              | User JWT        | Mark attendance         |
| GET    | `/user/student/:studentId/course/:courseId`          | User JWT        | Course attendance       |
| GET    | `/user/student/:studentId/report`                    | User JWT        | Full report             |
| GET    | `/user/student/:studentId/course/:courseId/datewise` | User JWT        | Datewise attendance     |
| GET    | `/user/batch/defaulters`                             | User JWT        | Defaulters list         |
| GET    | `/user/batch/matrix`                                 | User JWT        | Attendance matrix       |
| GET    | `/user/session/:sessionId`                           | User JWT        | Session slot attendance |
| GET    | `/student/:studentId/course/:courseId`               | Institution JWT | Course attendance       |
| GET    | `/student/:studentId/report`                         | Institution JWT | Full report             |
| GET    | `/student/:studentId/course/:courseId/datewise`      | Institution JWT | Datewise attendance     |
| GET    | `/batch/defaulters`                                  | Institution JWT | Defaulters list         |
| GET    | `/batch/matrix`                                      | Institution JWT | Attendance matrix       |
| GET    | `/session/:sessionId`                                | Institution JWT | Session slot attendance |

---

## Applications (Approval Workflow)

**Base Path:** `/api/application`

| Method | Endpoint                  | Access   | Description                          |
| ------ | ------------------------- | -------- | ------------------------------------ |
| POST   | `/`                       | User JWT | Create application                   |
| GET    | `/my`                     | User JWT | Get my applications                  |
| GET    | `/faculty/pending`        | User JWT | Pending approvals for faculty        |
| GET    | `/faculty/processed`      | User JWT | Processed approvals by faculty       |
| POST   | `/:applicationId/approve` | User JWT | Approve application                  |
| POST   | `/:applicationId/reject`  | User JWT | Reject application                   |
| POST   | `/:applicationId/forward` | User JWT | Forward application to next approver |
| GET    | `/:applicationId`         | Public   | Get application by id                |

---

## Admission Applications

**Base Path:** `/api/admissions`

| Method | Endpoint                                       | Access          | Description                      |
| ------ | ---------------------------------------------- | --------------- | -------------------------------- |
| POST   | `/register`                                    | Public          | Register admission application   |
| POST   | `/login`                                       | Public          | Login admission applicant        |
| POST   | `/forgot-password`                             | Public          | Forgot password                  |
| POST   | `/reset-password/:token`                       | Public          | Reset password                   |
| POST   | `/refresh-token`                               | Public          | Refresh access token             |
| POST   | `/logout`                                      | Admission JWT   | Logout                           |
| GET    | `/verify-email/:token`                         | Public          | Verify email                     |
| POST   | `/send-verification-email`                     | Admission JWT   | Send verification mail           |
| GET    | `/me`                                          | Admission JWT   | Get own application profile      |
| PUT    | `/me`                                          | Admission JWT   | Update own application profile   |
| POST   | `/submit`                                      | Admission JWT   | Submit application               |
| GET    | `/status/:applicationNumber`                   | Admission JWT   | Get status by application number |
| GET    | `/institution/:institutionId`                  | Institution JWT | List by institution              |
| GET    | `/institution/:institutionId/branch/:branchId` | Institution JWT | List by institution + branch     |
| GET    | `/filters`                                     | Institution JWT | Filtered listing                 |
| GET    | `/:applicationId`                              | Institution JWT | Get application by id            |
| PUT    | `/:applicationId/status`                       | Institution JWT | Update application status        |
| PUT    | `/:applicationId/approve`                      | Institution JWT | Approve application              |
| PUT    | `/:applicationId/reject`                       | Institution JWT | Reject application               |
| POST   | `/:applicationId/review-log`                   | Institution JWT | Add review log                   |
| POST   | `/:applicationId/document`                     | Admission JWT   | Upload document                  |
| PUT    | `/:applicationId/update-document/:publicId`    | Admission JWT   | Update document                  |
| PUT    | `/:applicationId/document/:publicId/status`    | Institution JWT | Update document status           |
| PUT    | `/:applicationId/document-status/:publicId`    | Admission JWT   | Update document status (self)    |
| DELETE | `/:applicationId/document/:publicId`           | Admission JWT   | Delete document                  |
| DELETE | `/:applicationId`                              | Institution JWT | Delete application               |

---

## Marks & Evaluation

**Base Path:** `/api/marks`

| Method | Endpoint                               | Access   | Description                                 |
| ------ | -------------------------------------- | -------- | ------------------------------------------- |
| POST   | `/record`                              | User JWT | Record or update marks/evaluation entries   |
| GET    | `/matrix`                              | User JWT | Get aggregated marks/evaluation matrix      |
| GET    | `/course/:courseId/components`         | User JWT | Get configured mark components for a course |
| GET    | `/student/:studentId/all`              | User JWT | Get all marks/evaluations for a student     |
| GET    | `/student/:studentId/course/:courseId` | User JWT | Get a student's marks for a specific course |

---

## Responsibilities

**Base Path:** `/api/responsibility`

| Method | Endpoint                           | Access          |
| ------ | ---------------------------------- | --------------- |
| GET    | `/institution/:institutionId`      | Public          |
| GET    | `/:responsibilityId`               | Public          |
| POST   | `/`                                | Institution JWT |
| PUT    | `/:responsibilityId`               | Institution JWT |
| PUT    | `/change-status/:responsibilityId` | Institution JWT |
| DELETE | `/:responsibilityId`               | Institution JWT |

### Responsibility Assignment (`/api/assign-responsibility`)

| Method | Endpoint                            | Access          | Description                        |
| ------ | ----------------------------------- | --------------- | ---------------------------------- |
| GET    | `/`                                 | Public          | List responsibility assignments    |
| GET    | `/active`                           | Public          | List active assignments            |
| GET    | `/responsibility/:responsibilityId` | Public          | List by responsibility             |
| GET    | `/user/:userId`                     | Public          | List by user                       |
| POST   | `/`                                 | Institution JWT | Create a responsibility assignment |
| PUT    | `/:id`                              | Institution JWT | Update assignment                  |
| PATCH  | `/:id/deactivate`                   | Institution JWT | Deactivate assignment              |
| DELETE | `/:id`                              | Institution JWT | Delete assignment                  |

---

## Notices & Notifications

### Notices (`/api/notices`)

| Method | Endpoint                    | Access          | Description       |
| ------ | --------------------------- | --------------- | ----------------- |
| GET    | `/`                         | Institution JWT | Get notices       |
| GET    | `/course/:courseId`         | Institution JWT | Get by course     |
| GET    | `/department/:departmentId` | Institution JWT | Get by department |
| GET    | `/role/:role`               | Institution JWT | Get by role       |
| GET    | `/:noticeId`                | Institution JWT | Get by id         |
| POST   | `/`                         | Institution JWT | Create notice     |
| PATCH  | `/:noticeId`                | Institution JWT | Update notice     |
| DELETE | `/:noticeId`                | Institution JWT | Delete notice     |

### Notifications (`/api/notifications`)

| Method | Endpoint             | Access          | Description         |
| ------ | -------------------- | --------------- | ------------------- |
| POST   | `/`                  | Institution JWT | Create notification |
| POST   | `/create`            | User JWT        | Create notification |
| PUT    | `/:id/status`        | Institution JWT | Change status       |
| PUT    | `/:id/change-status` | User JWT        | Change status       |
| DELETE | `/:id`               | Institution JWT | Delete notification |
| DELETE | `/:id/delete`        | User JWT        | Delete notification |
| GET    | `/batch/:batch`      | User JWT        | Get by batch        |
| GET    | `/email/:email`      | User JWT        | Get by email        |

---

## Hostel, Library, Campus Logs

### Hostel / Room / Allocation (`/api/hostel`)

| Method | Endpoint                          | Access          | Description                 |
| ------ | --------------------------------- | --------------- | --------------------------- |
| GET    | `/`                               | Institution JWT | Get hostels                 |
| GET    | `/:hostelId`                      | Institution JWT | Get hostel by id            |
| GET    | `/:hostelId/rooms`                | Institution JWT | Get rooms by hostel         |
| GET    | `/allocations/student/:studentId` | Institution JWT | Get student room allocation |
| POST   | `/`                               | Institution JWT | Create hostel               |
| POST   | `/rooms`                          | Institution JWT | Create room                 |
| POST   | `/allocations`                    | Institution JWT | Allocate room               |
| PUT    | `/rooms/:roomId`                  | Institution JWT | Update room                 |
| PATCH  | `/allocations/:id/vacate`         | Institution JWT | Vacate allocation           |

### Books (`/api/books`)

| Method | Endpoint                | Access   | Description         |
| ------ | ----------------------- | -------- | ------------------- |
| GET    | `/:instituteId`         | User JWT | Get all books       |
| GET    | `/search/:instituteId`  | User JWT | Search books        |
| GET    | `/:bookId`              | User JWT | Get book by id      |
| POST   | `/`                     | User JWT | Add book            |
| POST   | `/:bookId/issue`        | User JWT | Issue book          |
| POST   | `/:bookId/return`       | User JWT | Return book         |
| PUT    | `/:bookId`              | User JWT | Update book         |
| PATCH  | `/availability/:bookId` | User JWT | Toggle availability |

### Campus Logs (`/api/campusLogs`)

| Method | Endpoint                                             | Access   | Description              |
| ------ | ---------------------------------------------------- | -------- | ------------------------ |
| GET    | `/enrollmentNumber/:enrollmentNumber/:institutionId` | User JWT | Get by enrollment number |
| GET    | `/dateRange/:institutionId`                          | User JWT | Get by date range        |
| GET    | `/active/:institutionId`                             | User JWT | Get active out-logs      |
| POST   | `/`                                                  | User JWT | Add log                  |
| PUT    | `/:logId`                                            | User JWT | Update log               |

---

## Alumni, Referrals & Drive

### Alumni (`/api/alumni`)

| Method | Endpoint                      | Access          | Description         |
| ------ | ----------------------------- | --------------- | ------------------- |
| POST   | `/create`                     | User JWT        | Create alumni       |
| PUT    | `/verify/:id`                 | Institution JWT | Verify alumni       |
| PUT    | `/update/:id`                 | User JWT        | Update alumni       |
| GET    | `/institution/:institutionId` | Institution JWT | List by institution |
| GET    | `/unverified/:institutionId`  | Institution JWT | List unverified     |
| GET    | `/:id`                        | Public          | Get by id           |
| DELETE | `/delete/:id`                 | Institution JWT | Delete              |

### Referrals (`/api/referrals`)

| Method | Endpoint                      | Access          | Description         |
| ------ | ----------------------------- | --------------- | ------------------- |
| POST   | `/create`                     | User JWT        | Create referral     |
| PUT    | `/verify/:referralId`         | Institution JWT | Verify referral     |
| PUT    | `/active/:referralId`         | User JWT        | Activate/Deactivate |
| PUT    | `/update/:referralId`         | User JWT        | Update referral     |
| DELETE | `/delete/:referralId`         | User JWT        | Delete referral     |
| GET    | `/institution/:institutionId` | Public          | List by institution |

### Drive (`/api/drive`)

| Method | Endpoint                      | Access   | Description         |
| ------ | ----------------------------- | -------- | ------------------- |
| POST   | `/create`                     | User JWT | Create drive        |
| PUT    | `/update/:id`                 | User JWT | Update drive        |
| PUT    | `/update-status/:id`          | User JWT | Update status       |
| PUT    | `/update-results/:id`         | User JWT | Update results      |
| DELETE | `/delete/:id`                 | User JWT | Delete drive        |
| GET    | `/get/:id`                    | User JWT | Get by id           |
| GET    | `/batch/:batch`               | User JWT | List by batch       |
| GET    | `/institution/:institutionId` | User JWT | List by institution |

---

## Bulk Import (Kafka Powered)

**Base Path:** `/api/import`

| Method | Endpoint               | Access | Description                                    |
| ------ | ---------------------- | ------ | ---------------------------------------------- |
| POST   | `/students`            | Public | Upload student CSV (async processed via Kafka) |
| POST   | `/faculty`             | Public | Upload faculty CSV (async processed via Kafka) |
| GET    | `/students/:id/status` | Public | Student import status                          |
| GET    | `/faculty/:id/status`  | Public | Faculty import status                          |

> Large uploads are processed asynchronously using **Apache Kafka event streaming** to avoid blocking the main server and ensure reliability.

---

## Authentication Summary

- **User JWT** → Faculty/User operations
- **Institution JWT** → Admin/management operations
- **Admission JWT** → Admission applicant operations

---

## API Health & Root

| Method | Endpoint  | Description          |
| ------ | --------- | -------------------- |
| GET    | `/health` | Service health check |
| GET    | `/`       | Root response        |

---

## Environment Variables

```env
PORT=
FRONTEND_URL=
MONGODB_URI=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
JWT_SECRET=
JWT_REFRESH_SECRET=
MAILJET_API_KEY=
MAILJET_SECRET=
MAILJET_FROM_EMAIL=
MAILJET_FROM_NAME=
NODE_ENV=
BACKEND_URL=
KAFKA_BROKERS=
```

---

## Author

**Vansh Verma**
