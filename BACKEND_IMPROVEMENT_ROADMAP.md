# Job Fiesta — Backend Architecture & Improvement Roadmap
**Document Version:** 1.0.0  
**Status:** Strategic Architecture Plan  
**Target System:** Express.js + MongoDB + Socket.io Server (`backend/src/`)  

---

## 1. Executive Summary

The **Job Fiesta** backend is built on Node.js, Express, MongoDB (via Mongoose), and Socket.io. While the core CRUD endpoints and basic socket handshakes are operational, several critical architectural areas require hardening, optimization, and functional expansion to support full production standards and Final Year Project (FYP) demonstration requirements.

This roadmap details the current architectural status, identifies security and performance bottlenecks, and provides an actionable implementation blueprint for modernizing the backend.

---

## 2. Current Architecture Assessment

```
                      +-----------------------------+
                      |   React Frontend (Vite)     |
                      +--------------+--------------+
                                     |
                         HTTPS / WSS |
                                     v
                      +-----------------------------+
                      |   Express Server (:5001)    |
                      +--------------+--------------+
                                     |
        +----------------------------+----------------------------+
        |                            |                            |
        v                            v                            v
+----------------+          +----------------+          +-------------------+
|  REST Routing  |          | Socket.io Hub  |          | Auth / Middleware |
|  /api/auth     |          | - Messaging    |          | - JWT Protect     |
|  /api/jobs     |          | - Notification |          | - Role Guard      |
|  /api/apps     |          | - Live Status  |          | - Error Handler   |
+-------+--------+          +-------+--------+          +---------+---------+
        |                            |                            |
        +----------------------------+----------------------------+
                                     |
                                     v
                      +-----------------------------+
                      |  MongoDB Database / Atlas   |
                      |  - Users, Jobs, Applications|
                      |  - Conversations, Messages  |
                      +-----------------------------+
```

### Existing Strengths:
1. **Model Structure**: Clear Mongoose schemas exist for `User`, `Job`, `Application`, `Company`, `Conversation`, `Message`, and `Notification`.
2. **Real-Time Layer**: Socket.io server is initialized in `server.js` with handshake authentication middleware.
3. **Database Seed**: Seed scripts (`seed.js` and `seedHelper.js`) provide consistent initial testing records.

### Areas Needing Improvement:
1. **File Uploads**: Resumes are currently simulated client-side with static filenames; no server-side multipart storage pipeline exists.
2. **Application Match Scoring**: Match scores are static mock integers rather than dynamically calculated based on candidate skills vs. job requirements.
3. **Authentication Lifecycles**: Authentication relies on a single persistent JWT without refresh token rotation or server-side invalidation.
4. **Rate Limiting & Security Headers**: Missing standard security middleware (`helmet`, `express-rate-limit`, `express-mongo-sanitize`).
5. **Database Indexing & Pagination**: Search queries perform unindexed collection scans, and chat messages lack cursor-based pagination.

---

## 3. High-Priority Backend Improvements

### 3.1 Resume Upload & Parsing Engine (Priority 1)
*   **Current State**: When an applicant applies, only a text `coverLetter` is submitted to `/api/applications/:jobId`.
*   **Target Architecture**:
    *   Integrate `multer` for memory or local disk storage (`uploads/resumes/`).
    *   Enforce file restrictions: `.pdf`, `.docx` only, maximum file size 5MB.
    *   Extract resume text using `pdf-parse` or `@cyber2024/pdf-parse`.
    *   Store resume metadata (file path, original name, upload timestamp, extracted text) in the `Application` and `User` models.
*   **Recommended Endpoint**:
    ```
    POST /api/applications/:jobId/apply-with-resume
    Headers: Authorization: Bearer <token>, Content-Type: multipart/form-data
    Body: resume (file), coverLetter (text)
    ```

### 3.2 Dynamic AI/ATS Match Score Calculation (Priority 1)
*   **Current State**: Match scores are hardcoded (e.g., 88%) on application creation.
*   **Target Architecture**:
    *   Implement a skill-extraction and TF-IDF / keyword similarity algorithm in `backend/src/utils/atsScorer.js`.
    *   Extract required skills and tags from `Job.skills` and `Job.description`.
    *   Compare against keywords present in the applicant's profile skills, experience, and uploaded resume text.
    *   Compute a dynamic 0–100 match percentage and store breakdown:
        ```json
        {
          "matchScore": 84,
          "matchedSkills": ["React", "JavaScript", "CSS"],
          "missingSkills": ["TypeScript", "GraphQL"],
          "experienceMatch": "Meets requirement (3+ years)"
        }
        ```

### 3.3 Strict Role-Based Access Control (RBAC) Hardening (Priority 1)
*   **Current State**: Role checks are performed ad-hoc inside controller functions or rely on client-side state.
*   **Target Architecture**:
    *   Standardize a dedicated middleware in `backend/src/middleware/authMiddleware.js`:
        ```javascript
        const authorizeRoles = (...roles) => {
          return (req, res, next) => {
            if (!roles.includes(req.user.role)) {
              return res.status(403).json({ 
                success: false, 
                message: `Access denied. Role '${req.user.role}' is not authorized for this resource.` 
              });
            }
            next();
          };
        };
        ```
    *   Apply `authorizeRoles('employer')` to `/api/jobs/create`, `/api/jobs/:id/edit`, and recruiter candidate pipelines.
    *   Apply `authorizeRoles('jobseeker')` to `/api/applications/:jobId`.

---

## 4. Medium-Priority Improvements

### 4.1 Real-Time Chat & Unread Count Aggregation (Priority 2)
*   **Current State**: Chat messages are persisted, but unread message counters rely partly on frontend array calculations.
*   **Target Architecture**:
    *   Add a backend aggregation endpoint `GET /api/conversations/unread-count`:
        ```javascript
        const unreadCount = await Message.countDocuments({
          conversationId: { $in: userConversationIds },
          senderId: { $ne: req.user._id },
          isRead: false
        });
        ```
    *   Socket.io Events Expansion:
        *   `typing`: Broadcasts to conversation room when user is actively composing.
        *   `stop_typing`: Emitted on blur or after 2.5s of inactivity.
        *   `message_read`: Emitted when user opens a chat; updates `isRead: true` in MongoDB and notifies sender.

### 4.2 Database Indexing & Cursor Pagination (Priority 2)
*   **Current State**: Full collection scans occur when filtering jobs or querying messages.
*   **Target Architecture**:
    *   Apply compound indexes in Mongoose models:
        ```javascript
        // Job.js
        jobSchema.index({ category: 1, type: 1, salaryMin: 1, salaryMax: 1 });
        jobSchema.index({ title: 'text', company: 'text', description: 'text' });

        // Message.js
        messageSchema.index({ conversationId: 1, createdAt: -1 });

        // Application.js
        applicationSchema.index({ jobId: 1, applicantId: 1 }, { unique: true });
        ```
    *   Implement cursor-based pagination for messages (`GET /api/conversations/:id/messages?before=<timestamp>&limit=30`).

### 4.3 Refresh Token Rotation & Session Management (Priority 2)
*   **Current State**: Single JWT with 30-day expiration.
*   **Target Architecture**:
    *   Issue short-lived Access Tokens (15 minutes) and long-lived Refresh Tokens (7 days) stored in HttpOnly cookies.
    *   Implement `POST /api/auth/refresh-token` and `POST /api/auth/logout` with token revocation list.

---

## 5. Security & Infrastructure Hardening

| Component | Security Risk | Recommended Implementation |
| :--- | :--- | :--- |
| **HTTP Security Headers** | Missing XSS, clickjacking, and MIME sniffing protection. | Install and configure `helmet` middleware in `server.js`. |
| **Brute-Force Protection** | Unlimited login and password attempts. | Add `express-rate-limit`: limit to 10 attempts per 15 minutes on auth routes. |
| **NoSQL Injection** | Malicious query operators (`$gt`, `$ne`) in JSON body. | Add `express-mongo-sanitize` to strip `$` and `.` characters from input. |
| **CORS Whitelist** | Wildcard or single hardcoded origin. | Configure dynamic whitelist matching local dev, staging, and production domains. |
| **Environment Integrity** | Hardcoded JWT secret fallback in development. | Enforce strict startup validation: throw fatal error if `JWT_SECRET` is missing in production. |

---

## 6. Testing, Documentation & FYP Defense Deliverables

### 6.1 Automated Test Suite
*   **Unit Tests**: Test password hashing, JWT signing/verification, and ATS match score utility (`backend/src/tests/unit/`).
*   **Integration Tests**: Using `supertest` and an in-memory MongoDB runner (`mongodb-memory-server`):
    *   Complete candidate application workflow (register -> view job -> apply -> initiate chat).
    *   Recruiter candidate management (post job -> view applications -> update status -> send message).

### 6.2 API Documentation (Swagger / OpenAPI)
*   Integrate `swagger-ui-express` and `swagger-jsdoc` at `/api/docs`.
*   Provides an interactive sandbox for examiners and evaluators during the Final Year Project defense.

---

## 7. Implementation Priority Matrix

```
+-------------------------------------------------------------------------+
| PRIORITY 1: IMMEDIATE (FYP Core Requirements)                            |
| 1. Implement File Upload for Resumes (Multer + PDF validation)          |
| 2. Implement ATS Keyword Match Score Algorithm                          |
| 3. Add Strict RBAC Middleware on all Recruiter/Jobseeker endpoints     |
+-------------------------------------------------------------------------+
                                    |
                                    v
+-------------------------------------------------------------------------+
| PRIORITY 2: ENHANCEMENT (Real-Time & Performance)                       |
| 1. MongoDB Compound Indexes on Jobs, Applications, and Messages         |
| 2. Backend Aggregated Unread Counter endpoint                           |
| 3. Socket.io Typing and Message Read Receipt events                     |
+-------------------------------------------------------------------------+
                                    |
                                    v
+-------------------------------------------------------------------------+
| PRIORITY 3: PRODUCTION READINESS (Security & Ops)                       |
| 1. Security Suite: Helmet, Rate Limiter, Mongo Sanitize                 |
| 2. Refresh Token Rotation with HttpOnly Cookies                         |
| 3. Swagger API Interactive Documentation (/api/docs)                    |
+-------------------------------------------------------------------------+
```
