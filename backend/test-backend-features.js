/**
 * Verification test for Option 1 (Resume File Upload Engine & Parser)
 * and Option 2 (Compound Indexing, Full-Text Search, and Pagination).
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const API_BASE = 'http://localhost:5001';

function request(method, reqPath, body = null, headers = {}) {
  return new Promise((resolve, reject) => {
    const url = new URL(reqPath, API_BASE);
    const options = {
      method,
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      headers: { ...headers },
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          const parsed = data ? JSON.parse(data) : {};
          resolve({ status: res.statusCode, headers: res.headers, body: parsed });
        } catch {
          resolve({ status: res.statusCode, headers: res.headers, body: data });
        }
      });
    });

    req.on('error', reject);
    if (body) {
      if (Buffer.isBuffer(body)) {
        req.write(body);
      } else if (typeof body === 'object') {
        req.write(JSON.stringify(body));
      } else {
        req.write(body);
      }
    }
    req.end();
  });
}

function buildMultipartFormData(boundary, fields, files) {
  const chunks = [];

  for (const [key, value] of Object.entries(fields)) {
    chunks.push(Buffer.from(`--${boundary}\r\nContent-Disposition: form-data; name="${key}"\r\n\r\n${value}\r\n`));
  }

  for (const [fieldName, file] of Object.entries(files)) {
    chunks.push(
      Buffer.from(
        `--${boundary}\r\nContent-Disposition: form-data; name="${fieldName}"; filename="${file.filename}"\r\nContent-Type: ${file.contentType}\r\n\r\n`
      )
    );
    chunks.push(file.content);
    chunks.push(Buffer.from('\r\n'));
  }

  chunks.push(Buffer.from(`--${boundary}--\r\n`));
  return Buffer.concat(chunks);
}

async function run() {
  console.log('════════════════════════════════════════════════════════════');
  console.log('🧪 TESTING OPTION 1 & OPTION 2 BACKEND UPGRADES');
  console.log('════════════════════════════════════════════════════════════\n');

  // Login as jobseeker
  const loginRes = await request('POST', '/api/auth/login', {
    email: 'JobSeeker@JobFiesta.com',
    password: 'password123',
  }, { 'Content-Type': 'application/json' });

  if (loginRes.status !== 200 || !loginRes.body.token) {
    throw new Error('Failed to login demo jobseeker');
  }
  const token = loginRes.body.token;
  console.log('✅ Jobseeker logged in successfully');

  // --- OPTION 2: PAGINATION, SEARCH, SORTING ---
  console.log('\n--- Testing Option 2: Pagination & Text Search ---');
  
  // 1. Pagination
  const pagedRes = await request('GET', '/api/jobs?page=1&limit=3');
  if (pagedRes.status !== 200) throw new Error(`Pagination request failed: ${pagedRes.status}`);
  if (pagedRes.body.jobs.length > 3) throw new Error('Limit exceeded');
  if (typeof pagedRes.body.pagination !== 'object') throw new Error('Pagination metadata missing');
  console.log(`✅ Paginated /api/jobs?page=1&limit=3: returned ${pagedRes.body.jobs.length} jobs (Total: ${pagedRes.body.total}, Pages: ${pagedRes.body.pages}, HasMore: ${pagedRes.body.hasMore})`);

  // 2. Full-Text Search
  const searchRes = await request('GET', '/api/jobs?q=Cloud');
  if (searchRes.status !== 200) throw new Error(`Full-text search failed: ${searchRes.status}`);
  console.log(`✅ Full-text search /api/jobs?q=Cloud: returned ${searchRes.body.jobs.length} matching jobs`);

  // 3. Sorting
  const sortRes = await request('GET', '/api/jobs?sort=salary_high&limit=3');
  if (sortRes.status !== 200) throw new Error(`Salary sort failed: ${sortRes.status}`);
  console.log(`✅ Sorted /api/jobs?sort=salary_high: top job salaryMax is $${sortRes.body.jobs[0]?.salaryMax}`);

  // --- OPTION 1: RESUME UPLOAD & PARSING ENGINE ---
  console.log('\n--- Testing Option 1: File Upload Engine & Resume Parser ---');

  const boundary = '----WebKitFormBoundaryJobFiesta' + Date.now();
  const sampleResumeContent = `
John Doe
Email: johndoe.developer@example.com
Phone: +1 (555) 234-5678
Location: San Francisco, CA

SUMMARY
Senior Full Stack Engineer with 6 years of experience building modern web applications with React, Node.js, TypeScript, PostgreSQL, and Docker.

SKILLS
React, TypeScript, Node.js, Express, PostgreSQL, MongoDB, Docker, TailwindCSS, AWS, Git

EXPERIENCE
Lead Frontend Developer | Tech Innovations Inc (2021 - Present)
Architected and scaled web applications serving 200,000+ active users. Improved Core Web Vitals score by 45%.
`;

  const multipartBody = buildMultipartFormData(
    boundary,
    {},
    {
      resume: {
        filename: 'sample_resume.txt',
        contentType: 'text/plain',
        content: Buffer.from(sampleResumeContent, 'utf-8'),
      },
    }
  );

  const uploadRes = await request(
    'POST',
    '/api/resume/upload-and-parse',
    multipartBody,
    {
      'Content-Type': `multipart/form-data; boundary=${boundary}`,
      'Authorization': `Bearer ${token}`,
    }
  );

  if (uploadRes.status !== 200 || !uploadRes.body.success) {
    throw new Error(`Upload and parse failed (${uploadRes.status}): ${JSON.stringify(uploadRes.body)}`);
  }

  const parsed = uploadRes.body.data.parsedData;
  console.log(`✅ Upload & Parse /api/resume/upload-and-parse:`);
  console.log(`   File stored at: ${uploadRes.body.data.fileUrl}`);
  console.log(`   Extracted Name: ${parsed.fullName}`);
  console.log(`   Extracted Email: ${parsed.email}`);
  console.log(`   Extracted Phone: ${parsed.phone}`);
  console.log(`   Extracted Skills: [${parsed.skills.join(', ')}]`);
  console.log(`   Detected Experience: ${parsed.experienceYears} years`);

  // Verify file is statically served at uploaded URL
  const staticFileRes = await request('GET', uploadRes.body.data.fileUrl);
  if (staticFileRes.status !== 200) {
    throw new Error(`Static file access failed: ${staticFileRes.status}`);
  }
  console.log(`✅ Static file download verified (${staticFileRes.status} OK at ${uploadRes.body.data.fileUrl})`);

  console.log('\n════════════════════════════════════════════════════════════');
  console.log('🎉 ALL OPTION 1 & OPTION 2 TESTS PASSED WITH 100% SUCCESS!');
  console.log('════════════════════════════════════════════════════════════\n');
}

run().catch((err) => {
  console.error('❌ Test failed:', err);
  process.exit(1);
});
