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
