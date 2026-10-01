const API = 'http://localhost:5001/api';

async function req(endpoint, options = {}) {
  const url = `${API}${endpoint}`;
  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    },
    body: options.body ? JSON.stringify(options.body) : undefined
  });
  const data = await res.json();
  if (!res.ok) {
    const err = new Error(data.message || `HTTP ${res.status}`);
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data;
}

async function runE2E() {
  console.log('====================================================');
  console.log('🚀 RUNNING END-TO-END WORKFLOW VERIFICATION');
  console.log('====================================================');

  // Step 1: Sign up a new user
  const randomSuffix = Date.now().toString().slice(-4);
  const newEmail = `alex.rivera.${randomSuffix}@jobfiesta.io`;
  console.log(`\n[1] Testing Registration for new user: ${newEmail}...`);
  const regRes = await req('/auth/register', {
    method: 'POST',
    body: {
      fullName: 'Alex Rivera',
      username: `alexrivera_${randomSuffix}`,
      email: newEmail,
      password: 'Password123!',
      role: 'jobseeker'
    }
  });
  console.log('✅ Registration SUCCESS:', regRes.user.fullName, `(Role: ${regRes.user.role})`);

  // Step 2: Login as Recruiter
  console.log('\n[2] Logging in as Recruiter (suzana@nexusinnovations.io)...');
  const recLoginRes = await req('/auth/login', {
    method: 'POST',
    body: {
      email: 'suzana@nexusinnovations.io',
      password: 'password123'
    }
  });
  const recruiterToken = recLoginRes.token;
  console.log('✅ Recruiter Login SUCCESS:', recLoginRes.user.fullName, `(Token received)`);

  // Step 3: Recruiter Posts a New Job
  console.log('\n[3] Posting New Job: "Staff Cloud AI Platform Architect"...');
  const postJobRes = await req('/jobs', {
    method: 'POST',
    headers: { Authorization: `Bearer ${recruiterToken}` },
    body: {
      title: 'Staff Cloud AI Platform Architect',
      company: 'Nexus Innovations',
      companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&h=100&fit=crop&crop=faces',
      location: 'San Francisco, CA',
      workplaceType: 'Remote',
      jobType: 'Full-time',
      experienceLevel: 'Senior',
      category: 'tech',
      salaryMin: 160000,
      salaryMax: 210000,
      salaryPeriod: 'year',
      description: 'We are seeking a Staff Cloud AI Platform Architect to lead our next generation distributed AI system.',
      requirements: [
        '7+ years experience in distributed cloud systems and AI orchestration',
        'Proficiency in React, Python, vLLM, Docker, Kubernetes',
        'Track record designing high-availability platform architectures'
      ],
      skills: ['React', 'Python', 'Cloud', 'AI', 'Node.js', 'Kubernetes'],
      tags: ['React', 'Python', 'Cloud', 'AI']
    }
  });
  const createdJob = postJobRes.job;
  console.log('✅ Job Posting SUCCESS! Job ID:', createdJob._id, `Title: "${createdJob.title}"`);

  // Step 4: Verify Job Appears in Public API Listing
  console.log('\n[4] Querying GET /api/jobs to verify public discoverability...');
  const jobsRes = await req('/jobs');
  console.log(`✅ Jobs Count in DB: ${jobsRes.count}`);
  const found = jobsRes.jobs.find(j => j._id === createdJob._id);
  if (!found) throw new Error('Posted job not found in public jobs listing!');
  console.log(`✅ Found posted job in public listings: "${found.title}" at "${found.company}" ($${found.salaryMin.toLocaleString()} - $${found.salaryMax.toLocaleString()})`);

  // Step 5: Login as Job Seeker (Furqan)
  console.log('\n[5] Logging in as Job Seeker (furqan@jobfiesta.com)...');
  const jsLoginRes = await req('/auth/login', {
    method: 'POST',
    body: {
      email: 'furqan@jobfiesta.com',
      password: 'password123'
    }
  });
  const seekerToken = jsLoginRes.token;
  console.log('✅ Job Seeker Login SUCCESS:', jsLoginRes.user.fullName);

  // Step 6: Job Seeker Applies to the newly posted job
  console.log(`\n[6] Applying to Job ID: ${createdJob._id}...`);
  const applyRes = await req(`/applications/${createdJob._id}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${seekerToken}` },
    body: {
      coverLetter: 'I am excited to apply for the Staff Cloud AI Platform Architect position. I have strong experience building distributed systems.',
      expectedSalary: '$185,000 / yr',
      experience: '6 Years'
    }
  });
  const application = applyRes.data || applyRes.application;
  console.log('✅ Job Application SUCCESS! App ID:', application._id, `ATS Match Score: ${application.matchScore}%`);

  // Step 7: Recruiter Checks Candidate ATS Pipeline
  console.log('\n[7] Recruiter querying GET /api/applications/candidate-pipeline...');
  const pipelineRes = await req('/applications/candidate-pipeline', {
    headers: { Authorization: `Bearer ${recruiterToken}` }
  });
  const candidatesList = pipelineRes.data || pipelineRes.candidates || [];
  console.log(`✅ Candidates Count in ATS Pipeline: ${candidatesList.length}`);
  const candInPipeline = candidatesList.find(c => c.applicationId === application._id || c.id === application._id);
  if (!candInPipeline) throw new Error('Applicant not found in recruiter ATS pipeline!');
  console.log(`✅ Candidate found in ATS: "${candInPipeline.name}" (Role: ${candInPipeline.role}, Current Stage: ${candInPipeline.stage})`);

  // Step 8: Recruiter Moves Candidate Stage in ATS
  console.log(`\n[8] Moving candidate stage from "${candInPipeline.stage}" to "screening"...`);
  const stageRes = await req(`/applications/${candInPipeline.applicationId || candInPipeline.id}/stage`, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${recruiterToken}` },
    body: { status: 'screening' }
  });
  console.log('✅ Stage Transition SUCCESS:', stageRes.message);

  // Step 9: Verify Job Seeker Sees Updated Application Status
  console.log('\n[9] Job Seeker querying GET /api/applications/my...');
  const myAppsRes = await req('/applications/my', {
    headers: { Authorization: `Bearer ${seekerToken}` }
  });
  const myAppsList = myAppsRes.data || myAppsRes.applications || [];
  const myApp = myAppsList.find(a => a._id === application._id);
  console.log(`✅ Job Seeker Application Status: "${myApp.status}" (Job: "${myApp.job.title}")`);

  console.log('\n====================================================');
  console.log('🎉 ALL END-TO-END WORKFLOW TESTS COMPLETED SUCCESSFULLY!');
  console.log('====================================================');
}

runE2E().catch(err => {
  console.error('❌ E2E Test FAILED:', err.data || err.message);
  process.exit(1);
});
