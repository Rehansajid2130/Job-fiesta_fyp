const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse');

// Comprehensive dictionary of technical & professional skills for ATS matching
const SKILL_DICTIONARY = [
  // Frontend
  'JavaScript', 'TypeScript', 'React', 'React.js', 'Next.js', 'Vue', 'Vue.js', 'Angular', 
  'HTML', 'HTML5', 'CSS', 'CSS3', 'Tailwind', 'Tailwind CSS', 'SASS', 'SCSS', 'Bootstrap',
  'Redux', 'Zustand', 'Webpack', 'Vite', 'Responsive Design', 'Figma', 'UI/UX',
  // Backend
  'Node.js', 'Express', 'Express.js', 'Nest.js', 'Python', 'Django', 'FastAPI', 'Flask',
  'Java', 'Spring Boot', 'C#', '.NET', 'Go', 'Golang', 'Rust', 'PHP', 'Laravel', 'Ruby', 'Rails',
  'REST API', 'RESTful APIs', 'GraphQL', 'gRPC', 'Microservices', 'WebSockets', 'Socket.io',
  // Databases
  'MongoDB', 'PostgreSQL', 'MySQL', 'SQLite', 'Redis', 'Elasticsearch', 'DynamoDB', 'Supabase',
  'Prisma', 'Mongoose', 'TypeORM', 'Sequelize',
  // Cloud & DevOps
  'AWS', 'Amazon Web Services', 'Azure', 'Google Cloud', 'GCP', 'Docker', 'Kubernetes',
  'CI/CD', 'GitHub Actions', 'Jenkins', 'Terraform', 'Linux', 'Nginx', 'Apache', 'Vercel',
  // Testing & Quality
  'Jest', 'Vitest', 'Cypress', 'Playwright', 'Mocha', 'Chai', 'Unit Testing', 'TDD',
  // AI & Data
  'Machine Learning', 'Deep Learning', 'PyTorch', 'TensorFlow', 'Scikit-learn', 'Pandas',
  'NumPy', 'OpenAI', 'LangChain', 'NLP', 'Computer Vision',
  // Tools & Methodologies
  'Git', 'GitHub', 'GitLab', 'Agile', 'Scrum', 'Jira', 'Postman'
];

/**
 * Extract raw text from file (PDF, TXT, or binary buffer)
 * @param {string} filePath - Absolute path to uploaded file
 * @returns {Promise<string>}
 */
async function extractTextFromFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();

  try {
    const dataBuffer = fs.readFileSync(filePath);

    if (ext === '.pdf') {
      const pdfData = await pdfParse(dataBuffer);
      if (pdfData && pdfData.text && pdfData.text.trim().length > 20) {
        return pdfData.text;
      }
    }

    if (ext === '.txt') {
      return dataBuffer.toString('utf8');
    }

    // Generic fallback for binary docx or simple text streams: extract printable characters
    const text = dataBuffer.toString('utf8').replace(/[^\x20-\x7E\n\r\t]/g, ' ');
    if (text.trim().length > 30) {
      return text;
    }

    return '';
  } catch (err) {
    console.warn(`[ResumeParser] Raw text extraction warning for ${filePath}:`, err.message);
    try {
      // Emergency fallback reading as utf8
      return fs.readFileSync(filePath, 'utf8');
    } catch (e) {
      return '';
    }
  }
}

/**
 * Parse raw text into structured resume insights
 * @param {string} rawText
 * @param {string} originalName
 * @returns {Object}
 */
function parseResumeText(rawText, originalName = '') {
  const cleanText = (rawText || '').replace(/\r/g, '\n');

  // 1. Email extraction
  const emailRegex = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/i;
  const emailMatch = cleanText.match(emailRegex);
  const email = emailMatch ? emailMatch[1].trim() : '';

  // 2. Phone extraction (international and local US/PK/UK formats)
  const phoneRegex = /(?:(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4})/;
  const phoneMatch = cleanText.match(phoneRegex);
  const phone = phoneMatch ? phoneMatch[0].trim() : '';

  // 3. Name heuristic
  let fullName = '';
  const lines = cleanText.split('\n').map(l => l.trim()).filter(Boolean);
  if (lines.length > 0) {
    // Usually the candidate's name is on line 1 or 2, before emails/contacts
    const candidateLine = lines.slice(0, 4).find(l => 
      l.length >= 3 && l.length <= 40 && 
      !l.includes('@') && !l.includes('http') && !l.includes('Resume') && !l.includes('CV') &&
      /^[a-zA-Z\s.-]+$/.test(l)
    );
    if (candidateLine) {
      fullName = candidateLine;
    }
  }
  if (!fullName && originalName) {
    // Derive from filename (e.g. Alex_Morgan_Resume.pdf -> Alex Morgan)
    const base = path.basename(originalName, path.extname(originalName));
    fullName = base.replace(/[-_]?(resume|cv|latest|202[0-9])[-_]?/gi, '').replace(/[-_]+/g, ' ').trim();
  }

  // 4. Skills extraction against dictionary
  const foundSkills = new Set();
  const lowerText = cleanText.toLowerCase();

  SKILL_DICTIONARY.forEach((skill) => {
    const skillLower = skill.toLowerCase();
    // Boundary check for short skills like 'C', 'Go', 'Git'
    const pattern = new RegExp(`(?:^|[^a-zA-Z0-9#+])${skillLower.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?:$|[^a-zA-Z0-9#+])`, 'i');
    if (pattern.test(cleanText)) {
      foundSkills.add(skill);
    }
  });

  const extractedSkills = Array.from(foundSkills);

  // 5. Experience Years detection
  let experienceYears = 2; // Default baseline
  const expMatch = cleanText.match(/(\d{1,2})\+?\s*(?:years?|yrs?)(?:\s*(?:of)?\s*(?:experience|work))?/i);
  if (expMatch && parseInt(expMatch[1], 10) < 35) {
    experienceYears = parseInt(expMatch[1], 10);
  }

  // 6. Education detection
  let education = 'Bachelor of Science in Computer Science';
  if (/master|m\.s\.|msc/i.test(cleanText)) {
    education = 'Master of Science';
  } else if (/ph\.?d|doctorate/i.test(cleanText)) {
    education = 'Ph.D. in Engineering / Computing';
  } else if (/bachelor|b\.s\.|btech|bsc/i.test(cleanText)) {
    education = 'Bachelor of Science';
  }

  // 7. Executive summary generation
  let summary = '';
  const summaryBlock = cleanText.match(/(?:summary|profile|about me|objective)[\s:]*\n+([^]+?)(?=\n\s*(?:experience|skills|education|projects))/i);
  if (summaryBlock && summaryBlock[1].trim().length > 30) {
    summary = summaryBlock[1].replace(/\n+/g, ' ').trim().slice(0, 300);
  } else {
    summary = `${fullName || 'Candidate'} is a qualified professional with ${experienceYears}+ years of experience specializing in ${extractedSkills.slice(0, 4).join(', ') || 'modern software engineering'}.`;
  }

  return {
    fullName: fullName || 'Candidate Applicant',
    email,
    phone,
    skills: extractedSkills,
    experienceYears,
    education,
    summary,
    rawTextLength: cleanText.length,
  };
}

/**
 * Full parsing pipeline: Reads file and returns structured analysis
 * @param {string} filePath
 * @param {string} originalName
 * @returns {Promise<Object>}
 */
async function parseResumeFile(filePath, originalName) {
  const rawText = await extractTextFromFile(filePath);
  const parsed = parseResumeText(rawText, originalName);
  return parsed;
}

module.exports = {
  extractTextFromFile,
  parseResumeText,
  parseResumeFile,
  SKILL_DICTIONARY,
};
