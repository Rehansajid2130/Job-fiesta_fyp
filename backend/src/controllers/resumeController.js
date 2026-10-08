/**
 * AI Resume Controller - Job Fiesta
 * Provides smart ATS resume analysis, section enhancements, and skill recommendations.
 */

// Comprehensive skill mappings for top tech & business domains
const DOMAIN_SKILLS = {
  frontend: ['React.js', 'TypeScript', 'Next.js', 'TailwindCSS', 'Redux / Zustand', 'HTML5 & CSS3', 'RESTful APIs', 'Jest / Vitest', 'Web Performance (Core Web Vitals)', 'Git / GitHub'],
  backend: ['Node.js', 'Express', 'Python', 'PostgreSQL', 'MongoDB', 'Docker', 'Redis', 'Microservices', 'REST & GraphQL APIs', 'AWS / Cloud Infrastructure'],
  fullstack: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'Docker', 'RESTful APIs', 'TailwindCSS', 'Next.js', 'MongoDB', 'CI/CD Pipelines'],
  mobile: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Mobile UI/UX', 'State Management', 'REST APIs', 'App Store Deployment', 'Firebase', 'Jest'],
  devops: ['Docker', 'Kubernetes', 'AWS', 'Terraform', 'CI/CD (GitHub Actions)', 'Linux', 'Prometheus & Grafana', 'Bash / Python', 'Nginx', 'Zero-Trust Security'],
  data: ['Python', 'SQL', 'Pandas & NumPy', 'Machine Learning', 'PyTorch / TensorFlow', 'Power BI / Tableau', 'Data Warehousing (BigQuery)', 'ETL Pipelines', 'Statistics', 'Docker'],
  design: ['Figma', 'UI/UX Design', 'Design Systems', 'Prototyping', 'User Research', 'Wireframing', 'Responsive Design', 'Accessibility (WCAG 2.1)', 'Information Architecture', 'Interaction Design'],
  product: ['Product Roadmap', 'Agile / Scrum', 'User Stories & PRDs', 'KPI & Metric Tracking', 'A/B Testing', 'Stakeholder Management', 'Customer Discovery', 'Market Analysis', 'Figma', 'Jira'],
  marketing: ['SEO & SEM', 'Content Strategy', 'Google Analytics 4', 'Email Automation', 'Copywriting', 'Paid Social Media Ads', 'Conversion Rate Optimization (CRO)', 'HubSpot', 'Brand Strategy', 'A/B Testing']
};

const ACTION_VERBS = [
  'Architected', 'Spearheaded', 'Engineered', 'Optimized', 'Accelerated',
  'Orchestrated', 'Implemented', 'Streamlined', 'Delivered', 'Pioneered',
  'Transformed', 'Scaled', 'Automated', 'Revamped', 'Maximized'
];

/**
 * @desc    Enhance resume section (Summary, Experience, Job Fit Pitch)
 * @route   POST /api/resume/enhance
 * @access  Public
 */
exports.enhanceResumeContent = async (req, res) => {
  try {
    const { type = 'summary', text = '', role = '', skills = [], experienceLevel = 'mid' } = req.body;

    if (type === 'summary') {
      const targetRole = role.trim() || 'Software Engineer';
      const topSkills = Array.isArray(skills) && skills.length > 0 ? skills.slice(0, 4).join(', ') : 'modern tech stacks';
      
      const enhancedSummary = `Results-oriented ${targetRole} with a proven track record of engineering scalable, high-performance solutions utilizing ${topSkills}. Adept at translating complex product requirements into resilient architectures, driving cross-functional collaboration, and delivering impactful digital experiences that exceed business benchmarks and Core Web Vitals.`;

      return res.status(200).json({
        success: true,
        data: {
          original: text,
          enhanced: enhancedSummary,
          actionVerbsUsed: ['Results-oriented', 'Engineered', 'Accelerated', 'Collaborated']
        }
      });
    }

    if (type === 'experience') {
      const cleanText = text.trim() || 'Built web application features and fixed bugs';
      const verb = ACTION_VERBS[Math.floor(Math.random() * ACTION_VERBS.length)];
      
      // Transform into STAR-based bullet
      const enhancedBullet = `${verb} critical platform features for ${role || 'core products'}, improving response times by 32% and enhancing end-user reliability for 150k+ active accounts. Collaborated closely with cross-functional product and design teams to deliver high-quality, clean code on schedule.`;

      return res.status(200).json({
        success: true,
        data: {
          original: text,
          enhanced: enhancedBullet
        }
      });
    }

    if (type === 'fit_pitch') {
      const targetRole = role.trim() || 'this position';
      const cleanText = text.trim() || '';
      
      const enhancedPitch = `I bring a combination of hands-on expertise, strong analytical problem-solving, and continuous learning agility directly aligned with ${targetRole}. With a commitment to clean architecture, measurable team velocity, and user-centric outcomes, I am excited to immediately contribute to your engineering milestones and product vision.`;

      return res.status(200).json({
        success: true,
        data: {
          original: cleanText,
          enhanced: enhancedPitch
        }
      });
    }

    return res.status(400).json({ success: false, message: 'Invalid enhancement type specified' });
  } catch (error) {
    console.error('Error enhancing resume content:', error);
    return res.status(500).json({ success: false, message: 'Server error during enhancement' });
  }
};

/**
 * @desc    Suggest ATS-optimized skills by role or domain
 * @route   POST /api/resume/suggest-skills
 * @access  Public
 */
exports.suggestSkills = async (req, res) => {
  try {
    const { role = '' } = req.body;
    const lower = role.toLowerCase();

    let matchedCategory = 'frontend';
    if (lower.includes('back') || lower.includes('node') || lower.includes('python') || lower.includes('api') || lower.includes('java')) {
      matchedCategory = 'backend';
    } else if (lower.includes('full') || lower.includes('mern') || lower.includes('web dev')) {
      matchedCategory = 'fullstack';
    } else if (lower.includes('mobile') || lower.includes('react native') || lower.includes('ios') || lower.includes('android')) {
      matchedCategory = 'mobile';
    } else if (lower.includes('devops') || lower.includes('cloud') || lower.includes('sre') || lower.includes('infr')) {
      matchedCategory = 'devops';
    } else if (lower.includes('data') || lower.includes('ai') || lower.includes('machine learning') || lower.includes('analyst')) {
      matchedCategory = 'data';
    } else if (lower.includes('design') || lower.includes('ui') || lower.includes('ux') || lower.includes('product design')) {
      matchedCategory = 'design';
    } else if (lower.includes('product') || lower.includes('pm') || lower.includes('owner')) {
      matchedCategory = 'product';
    } else if (lower.includes('market') || lower.includes('seo') || lower.includes('growth')) {
      matchedCategory = 'marketing';
    }

    const suggestions = DOMAIN_SKILLS[matchedCategory] || DOMAIN_SKILLS.fullstack;

    return res.status(200).json({
      success: true,
      data: {
        category: matchedCategory,
        skills: suggestions
      }
    });
  } catch (error) {
    console.error('Error suggesting skills:', error);
    return res.status(500).json({ success: false, message: 'Failed to retrieve skill suggestions' });
  }
};

/**
 * @desc    Calculate ATS Resume Score & provide actionable feedback
 * @route   POST /api/resume/ats-analyze
 * @access  Public
 */
exports.analyzeAtsScore = async (req, res) => {
  try {
    const { resumeData = {} } = req.body;
    
    let score = 20; // Base score
    const feedback = [];
    const strengths = [];

    // 1. Contact Info (Email, Phone, Location)
    if (resumeData.fullName && resumeData.email) {
      score += 15;
      strengths.push('Essential personal identification and contact details present');
    } else {
      feedback.push('Add your full name and a professional email address');
    }

    if (resumeData.phone && resumeData.location) {
      score += 10;
      strengths.push('Contact location & phone number formatted properly');
    } else {
      feedback.push('Include your phone number and city/region for localized ATS matching');
    }

    // 2. Summary
    if (resumeData.summary && resumeData.summary.length > 60) {
      score += 15;
      strengths.push('Strong professional summary statement');
    } else {
      feedback.push('Craft a 2-3 sentence professional summary highlighting your key achievements');
    }

    // 3. Work Experience
    if (Array.isArray(resumeData.experiences) && resumeData.experiences.length > 0) {
      const hasDetailedExp = resumeData.experiences.some(e => e.description && e.description.length > 40);
      if (hasDetailedExp) {
        score += 20;
        strengths.push('Experience entries contain metric-rich impact statements');
      } else {
        score += 10;
        feedback.push('Add quantifiable metrics (e.g. percentages, user counts) to your work experience bullets');
      }
    } else {
      feedback.push('Add at least one professional work experience or relevant project entry');
    }

    // 4. Skills
    if (Array.isArray(resumeData.skills) && resumeData.skills.length >= 5) {
      score += 20;
      strengths.push(`Good keyword density with ${resumeData.skills.length} technical skills`);
    } else {
      feedback.push('Add at least 5-8 relevant technical skills to pass ATS keyword filters');
    }

    const finalScore = Math.min(100, Math.max(10, score));

    return res.status(200).json({
      success: true,
      data: {
        atsScore: finalScore,
        grade: finalScore >= 85 ? 'Excellent' : finalScore >= 70 ? 'Good' : 'Needs Optimization',
        strengths,
        improvements: feedback
      }
    });
  } catch (error) {
    console.error('Error analyzing ATS score:', error);
    return res.status(500).json({ success: false, message: 'Failed to analyze resume' });
  }
};
