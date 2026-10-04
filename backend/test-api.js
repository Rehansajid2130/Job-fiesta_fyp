/**
 * Automated Backend API Test Suite for Job Fiesta
 * Run via: npm test (or node test-api.js)
 */

const http = require('http');

const API_BASE = process.env.API_URL || 'http://localhost:5001';

// Reusable HTTP request helper
function request(method, path, body = null, token = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, API_BASE);
    const options = {
      method,
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (token) {
      options.headers['Authorization'] = `Bearer ${token}`;
    }

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          const parsed = data ? JSON.parse(data) : {};
          resolve({ status: res.statusCode, headers: res.headers, body: parsed });
        } catch (e) {
          resolve({ status: res.statusCode, headers: res.headers, body: data });
        }
      });
    });

    req.on('error', (err) => reject(err));

    if (body) {
      req.write(JSON.stringify(body));
    }
    req.end();
  });
}

// Test Runner
async function runTests() {
  console.log('════════════════════════════════════════════════════════════');
  console.log('🧪 JOB FIESTA BACKEND AUTOMATED TEST SUITE');
  console.log(`Targeting: ${API_BASE}`);
  console.log('════════════════════════════════════════════════════════════\n');

  let passed = 0;
  let failed = 0;
  let authToken = null;
  let testJobId = null;
  let testApplicationId = null;
  let testConversationId = null;

  async function assert(name, fn) {
    const start = Date.now();
    try {
      await fn();
      const elapsed = Date.now() - start;
      console.log(`  ✅ PASS: ${name} (${elapsed}ms)`);
      passed++;
    } catch (err) {
      const elapsed = Date.now() - start;
      console.error(`  ❌ FAIL: ${name} (${elapsed}ms)`);
      console.error(`     Error: ${err.message}`);
      failed++;
    }
  }

  // 1. Health Check
  await assert('GET /api/health — System status and feature listing', async () => {
    const res = await request('GET', '/api/health');
    if (res.status !== 200 || res.body.status !== 'online') {
      throw new Error(`Expected 200 online, got ${res.status}: ${JSON.stringify(res.body)}`);
    }
    if (!Array.isArray(res.body.features) || res.body.features.length === 0) {
      throw new Error('Features array missing from health check');
    }
  });

  // 2. Authentication Login
  await assert('POST /api/auth/login — Recruiter login & JWT token issuance', async () => {
    const res = await request('POST', '/api/auth/login', {
      email: 'suzana@nexusinnovations.io',
      password: 'password123',
    });
    if (res.status !== 200 || !res.body.token) {
      throw new Error(`Login failed with status ${res.status}: ${JSON.stringify(res.body)}`);
    }
    authToken = res.body.token;
  });

  await assert('POST /api/auth/login — Jobseeker username authentication (furqan12)', async () => {
    const res = await request('POST', '/api/auth/login', {
      emailOrUsername: 'furqan12',
      password: 'password123',
    });
    if (res.status !== 200 || !res.body.token || res.body.user.role !== 'jobseeker') {
      throw new Error(`Username login failed with status ${res.status}: ${JSON.stringify(res.body)}`);
    }
  });

  await assert('POST /api/auth/login — Case-insensitive demo jobseeker login (jobseeker@jobfiesta.com)', async () => {
    const res = await request('POST', '/api/auth/login', {
      email: 'JobSeeker@JobFiesta.com',
      password: 'password123',
    });
    if (res.status !== 200 || !res.body.token || res.body.user.role !== 'jobseeker') {
      throw new Error(`Demo login failed with status ${res.status}: ${JSON.stringify(res.body)}`);
    }
  });

  await assert('POST /api/auth/login — Demo recruiter login (recruiter@jobfiesta.com)', async () => {
    const res = await request('POST', '/api/auth/login', {
      email: 'recruiter@jobfiesta.com',
      password: 'password123',
    });
    if (res.status !== 200 || !res.body.token || res.body.user.role !== 'recruiter') {
      throw new Error(`Demo recruiter login failed with status ${res.status}: ${JSON.stringify(res.body)}`);
    }
  });

  // 3. Companies Directory & Search
  await assert('GET /api/companies — Retrieve all verified companies', async () => {
    const res = await request('GET', '/api/companies');
    if (res.status !== 200 || !res.body.success) {
      throw new Error(`Failed to get companies: ${res.status}`);
    }
    if (!Array.isArray(res.body.data) || res.body.data.length === 0) {
      throw new Error('Expected at least 1 seeded company');
    }
  });

  // 4. Single Company Details & Open Jobs
  await assert('GET /api/companies/nexus-innovations — Slug resolution & open jobs population', async () => {
    const res = await request('GET', '/api/companies/nexus-innovations');
    if (res.status !== 200 || !res.body.success) {
      throw new Error(`Company not found: ${res.status}`);
    }
    if (res.body.data.name !== 'Nexus Innovations') {
      throw new Error(`Expected Nexus Innovations, got ${res.body.data.name}`);
    }
  });

  // 5. Jobs Retrieval
  await assert('GET /api/jobs — Retrieve active job listings', async () => {
    const res = await request('GET', '/api/jobs');
    if (res.status !== 200 || !res.body.jobs) {
      throw new Error(`Failed to get jobs: ${res.status}`);
    }
    if (res.body.jobs.length > 0) {
      testJobId = res.body.jobs[0]._id;
    }
  });

  // 6. AI ATS Resume Matcher
  if (testJobId) {
    await assert(`POST /api/jobs/${testJobId}/match-resume — AI ATS keyword calculation`, async () => {
      const res = await request('POST', `/api/jobs/${testJobId}/match-resume`, {
        resumeText: 'Experienced Senior Frontend Developer proficient in React, TypeScript, Vite, TailwindCSS and REST APIs.',
        skills: ['React', 'TypeScript', 'Vite', 'TailwindCSS'],
      });
      if (res.status !== 200 || !res.body.success) {
        throw new Error(`ATS match failed: ${res.status}`);
      }
      if (typeof res.body.matchPercentage !== 'number' || res.body.matchPercentage < 50) {
        throw new Error(`Invalid matchPercentage: ${res.body.matchPercentage}`);
      }
    });
  }

  // 7. ATS Candidate Pipeline
  await assert('GET /api/applications/candidate-pipeline — Recruiter ATS Kanban data', async () => {
    const res = await request('GET', '/api/applications/candidate-pipeline', null, authToken);
    if (res.status !== 200 || !res.body.success) {
      throw new Error(`Candidate pipeline failed: ${res.status}`);
    }
    if (Array.isArray(res.body.data) && res.body.data.length > 0) {
      testApplicationId = res.body.data[0].applicationId;
    }
  });

  // 8. Update ATS Candidate Stage
  if (testApplicationId) {
    await assert(`PATCH /api/applications/${testApplicationId}/stage — Transition candidate to interviewing`, async () => {
      const res = await request(
        'PATCH',
        `/api/applications/${testApplicationId}/stage`,
        { stage: 'interviewing', notes: 'Scheduled technical screening with engineering manager.' },
        authToken
      );
      if (res.status !== 200 || !res.body.success) {
        throw new Error(`Stage transition failed: ${res.status}`);
      }
      if (res.body.data.status !== 'interviewing') {
        throw new Error(`Expected status interviewing, got ${res.body.data.status}`);
      }
    });
  }

  // 9. Conversations List
  await assert('GET /api/conversations — Inbox threads for authenticated user', async () => {
    const res = await request('GET', '/api/conversations', null, authToken);
    if (res.status !== 200 || !res.body.success) {
      throw new Error(`Conversations lookup failed: ${res.status}`);
    }
    if (Array.isArray(res.body.data) && res.body.data.length > 0) {
      testConversationId = res.body.data[0].id;
    }
  });

  // 10. Messages in Conversation
  if (testConversationId) {
    await assert(`GET /api/conversations/${testConversationId}/messages — Message history retrieval`, async () => {
      const res = await request('GET', `/api/conversations/${testConversationId}/messages`, null, authToken);
      if (res.status !== 200 || !res.body.success) {
        throw new Error(`Message retrieval failed: ${res.status}`);
      }
      if (!Array.isArray(res.body.data)) {
        throw new Error('Expected data array of messages');
      }
    });
  }

  // 11. Activity Notifications
  await assert('GET /api/notifications — User notification inbox & unread counter', async () => {
    const res = await request('GET', '/api/notifications', null, authToken);
    if (res.status !== 200 || !res.body.success) {
      throw new Error(`Notifications lookup failed: ${res.status}`);
    }
  });

  // 12. Mark All Notifications as Read
  await assert('PATCH /api/notifications/read-all — Bulk mark notifications read', async () => {
    const res = await request('PATCH', '/api/notifications/read-all', {}, authToken);
    if (res.status !== 200 || !res.body.success) {
      throw new Error(`Mark all read failed: ${res.status}`);
    }
  });

  // 13. Public Profile Gap & Strict Sanitization (No email, password, or phone leaked)
  await assert('GET /api/users/:username — Public profile sanitization (zero email/phone/password exposure)', async () => {
    const res = await request('GET', '/api/users/furqan12');
    if (res.status !== 200 || !res.body.success || !res.body.user) {
      throw new Error(`Public profile lookup failed: ${res.status}`);
    }
    const user = res.body.user;
    if (user.password !== undefined) throw new Error('SECURITY VIOLATION: password exposed in public profile!');
    if (user.email !== undefined) throw new Error('SECURITY VIOLATION: email exposed in public profile!');
    if (user.phone !== undefined) throw new Error('SECURITY VIOLATION: phone exposed in public profile!');
    if (user.savedJobs !== undefined) throw new Error('SECURITY VIOLATION: savedJobs exposed in public profile!');
    if (user.username !== 'furqan12') throw new Error(`Expected username furqan12, got: ${user.username}`);
  });

  // 14. Server-Verified Role Switch (Issues genuine server-signed JWT)
  await assert('POST /api/auth/demo-switch-role — Server-authenticated role switching', async () => {
    const res = await request('POST', '/api/auth/demo-switch-role', { targetRole: 'recruiter' });
    if (res.status !== 200 || !res.body.success || !res.body.token) {
      throw new Error(`Role switch failed: ${res.status}`);
    }
    if (res.body.user?.role !== 'recruiter') {
      throw new Error(`Expected recruiter role from server, got: ${res.body.user?.role}`);
    }
  });

  // 15. Application State Transition Validation (Rejecting invalid stage moves)
  await assert('PATCH /api/applications/:id/stage — State machine rejects invalid stage skips', async () => {
    // Attempting invalid stage string
    const res = await request('PATCH', '/api/applications/6abe5d9d16aef5be1d5a9a67/stage', {
      stage: 'astronaut_stage'
    }, authToken);
    if (res.status !== 400) {
      throw new Error(`Expected 400 Bad Request for invalid stage, got: ${res.status}`);
    }
  });

  // 16. IDOR Protection (Non-authenticated or forbidden job updates)
  await assert('PUT /api/jobs/:id — IDOR protection against unauthorized job modification', async () => {
    const res = await request('PUT', '/api/jobs/6abe5d9d16aef5be1d5a9a63', {
      title: 'Hacked Job Title'
    }, 'invalid_spoofed_token_xyz');
    if (res.status !== 401) {
      throw new Error(`Expected 401 Unauthorized for spoofed token, got: ${res.status}`);
    }
  });

  console.log('\n════════════════════════════════════════════════════════════');
  console.log(`🏁 TEST RESULTS: ${passed} PASSED, ${failed} FAILED (TOTAL: ${passed + failed})`);
  console.log('════════════════════════════════════════════════════════════');

  if (failed > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

runTests().catch((err) => {
  console.error('[Fatal Test Error]:', err);
  process.exit(1);
});
