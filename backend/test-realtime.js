const io = require('../frontend/node_modules/socket.io-client');
const http = require('http');

const API_BASE = 'http://localhost:5001';

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
          resolve({ status: res.statusCode, body: data ? JSON.parse(data) : {} });
        } catch (e) {
          resolve({ status: res.statusCode, body: data });
        }
      });
    });

    req.on('error', (err) => reject(err));
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

async function runRealtimeTest() {
  console.log('════════════════════════════════════════════════════════════');
  console.log('⚡ JOB FIESTA REAL-TIME WEBSOCKET AUTOMATED TEST');
  console.log('════════════════════════════════════════════════════════════\n');

  // 1. Authenticate candidate Furqan
  const candLogin = await request('POST', '/api/auth/login', {
    emailOrUsername: 'furqan12',
    password: 'password123',
  });
  if (!candLogin.body?.token) throw new Error('Candidate login failed');
  const candToken = candLogin.body.token;
  const candUser = candLogin.body.user;
  console.log(`✅ Step 1: Candidate authenticated (${candUser.fullName}, ID: ${candUser.id || candUser._id})`);

  // 2. Authenticate recruiter Suzana
  const recLogin = await request('POST', '/api/auth/login', {
    email: 'suzana@nexusinnovations.io',
    password: 'password123',
  });
  if (!recLogin.body?.token) throw new Error('Recruiter login failed');
  const recToken = recLogin.body.token;
  console.log('✅ Step 2: Recruiter authenticated (Suzana Colin)');

  // 3. Connect Candidate via Socket.io
  const candidateSocket = io(API_BASE, {
    auth: { token: candToken },
    query: { userId: candUser.id || candUser._id, token: candToken },
    transports: ['websocket'],
    timeout: 4000,
  });

  await new Promise((resolve, reject) => {
    candidateSocket.on('connect', () => {
      console.log(`✅ Step 3: Candidate Socket connected live (socket ID: ${candidateSocket.id})`);
      candidateSocket.emit('join_user');
      resolve();
    });
    candidateSocket.on('connect_error', (err) => reject(new Error('Socket connect error: ' + err.message)));
  });

  // 4. Retrieve candidate's application in pipeline
  const pipelineRes = await request('GET', '/api/applications/candidate-pipeline', null, recToken);
  const candidates = pipelineRes.body?.data || pipelineRes.body?.candidates || [];
  const targetCandidate = candidates.find(c => c.name.includes('Furqan') || c.email === 'furqan@jobfiesta.com') || candidates[0];
  if (!targetCandidate) throw new Error('No candidate application found in pipeline');
  const targetAppId = targetCandidate.applicationId || targetCandidate.id;
  console.log(`✅ Step 4: Target application identified: ${targetAppId} (${targetCandidate.name} for ${targetCandidate.role})`);

  // 5. Setup candidate socket event listener for status update & notification
  const receivedEvents = [];
  candidateSocket.on('application_status_updated', (data) => {
    console.log(`   📡 Received 'application_status_updated': Status -> ${data.status}, Stage -> ${data.stage}`);
    receivedEvents.push({ type: 'application_status_updated', data });
  });

  candidateSocket.on('new_notification', (data) => {
    console.log(`   🔔 Received 'new_notification': "${data.title}"`);
    receivedEvents.push({ type: 'new_notification', data });
  });

  candidateSocket.on('interview_scheduled', (data) => {
    console.log(`   📅 Received 'interview_scheduled': ${data.interview?.roundType} on ${data.interview?.date} at ${data.interview?.time}`);
    receivedEvents.push({ type: 'interview_scheduled', data });
  });

  // 6. Recruiter updates candidate stage
  console.log('\n🔄 Step 5: Recruiter triggers stage transition to "interviewing"...');
  const stageRes = await request('PATCH', `/api/applications/${targetAppId}/stage`, {
    stage: 'interviewing',
    notes: 'Real-time test stage transition verification',
  }, recToken);
  console.log(`   Backend response: ${stageRes.status} (${stageRes.body.message || 'Updated'})`);

  // Allow events to arrive over WebSocket
  await new Promise(r => setTimeout(r, 600));

  // 7. Recruiter schedules interview for candidate
  console.log('\n📅 Step 6: Recruiter schedules interview for candidate...');
  const interviewRes = await request('POST', `/api/applications/${targetAppId}/schedule-interview`, {
    date: '2026-10-18',
    time: '03:00 PM',
    duration: '45 mins',
    roundType: 'System Architecture Deep Dive',
    location: 'Google Meet',
    notes: 'Please review micro-frontend patterns and state synchronization.',
    interviewer: 'Suzana Colin (Head of Engineering Talent)'
  }, recToken);
  console.log(`   Backend response: ${interviewRes.status} (${interviewRes.body.message || 'Scheduled'})`);

  // Allow events to arrive over WebSocket
  await new Promise(r => setTimeout(r, 800));

  // Disconnect socket cleanly
  candidateSocket.disconnect();

  // Verification checks
  const hasStatusUpdate = receivedEvents.some(e => e.type === 'application_status_updated');
  const hasNotification = receivedEvents.some(e => e.type === 'new_notification');
  const hasInterview = receivedEvents.some(e => e.type === 'interview_scheduled');

  console.log('\n════════════════════════════════════════════════════════════');
  console.log('📊 REAL-TIME EVENT AUDIT:');
  console.log(`  - 'application_status_updated' received: ${hasStatusUpdate ? '✅ YES' : '❌ NO'}`);
  console.log(`  - 'new_notification' received:           ${hasNotification ? '✅ YES' : '❌ NO'}`);
  console.log(`  - 'interview_scheduled' received:         ${hasInterview ? '✅ YES' : '❌ NO'}`);
  console.log('════════════════════════════════════════════════════════════\n');

  if (hasStatusUpdate && hasNotification && hasInterview) {
    console.log('🎉 ALL REAL-TIME SOCKET PIPELINE TESTS PASSED 100%!\n');
    process.exit(0);
  } else {
    console.error('❌ One or more expected real-time socket events was not received.');
    process.exit(1);
  }
}

runRealtimeTest().catch(err => {
  console.error('Fatal error during real-time test:', err);
  process.exit(1);
});
