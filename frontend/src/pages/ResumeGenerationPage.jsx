import { useNavigate, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Navbar from "../components/common/Navbar";
import {
  PageContainer,
  FormSection,
  FormTitle,
  FormSubtitle,
  FormGroup,
  Label,
  Required,
  InputColumn,
  InputRow,
  Input,
  TextArea,
  EnhanceButton,
  FormImage,
  ButtonGroup,
  Button,
  SkillHobbyContainer,
  SkillHobbySection,
  InputWithButton,
  RemoveButton,
  FormContainer,
  LoadingOverlay,
  Spinner,
  SuccessMessage,
  ErrorMessage,
  TemplateSelection,
  TemplateCard,
  TemplatePreview,
  TemplateName,
  PreviewModal,
  PreviewContent,
  CloseButton,
  PreviewHeader,
  PreviewSection,
  PreviewSectionTitle,
  PreviewText,
  PreviewSkills,
  SkillTag
} from "../components/resume/ResumeGenerationStyles";

const ResumeGenerationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [previewData, setPreviewData] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    // ponytail: removed 'dob' (Date of Birth) to prevent age discrimination exposure under ADEA and EEOC regulations
    address: '',
    postalCode: '',
    profile: '',
    template: 'modern',
    education: [{
      institution: '',
      degree: '',
      startDate: '',
      endDate: ''
    }],
    workExperience: [{
      companyName: '',
      jobTitle: '',
      startDate: '',
      endDate: '',
      experience: ''
    }],
    skills: [''],
    hobbies: ['']
  });
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [profileHistory, setProfileHistory] = useState([]);

  // Initialize form data with location state if available
  useEffect(() => {
    if (location.state?.formData) {
      setFormData(location.state.formData);
    }
  }, [location.state]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleArrayInputChange = (index, value, field) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayItem = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayItem = (index, field) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const addWorkExperience = () => {
    setFormData(prev => ({
      ...prev,
      workExperience: [...prev.workExperience, {
        companyName: '',
        jobTitle: '',
        startDate: '',
        endDate: '',
        experience: ''
      }]
    }));
  };

  const removeWorkExperience = (index) => {
    setFormData(prev => ({
      ...prev,
      workExperience: prev.workExperience.filter((_, i) => i !== index)
    }));
  };

  const handleWorkExperienceChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      workExperience: prev.workExperience.map((exp, i) => 
        i === index ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const addEducation = () => {
    setFormData(prev => ({
      ...prev,
      education: [...prev.education, {
        institution: '',
        degree: '',
        startDate: '',
        endDate: ''
      }]
    }));
  };

  const removeEducation = (index) => {
    setFormData(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index)
    }));
  };

  const handleEducationChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      education: prev.education.map((edu, i) => 
        i === index ? { ...edu, [field]: value } : edu
      )
    }));
  };

  const handleEnhanceProfile = async () => {
    if (!formData.profile.trim()) return;
    
    setIsEnhancing(true);
    setError(null);
    try {
      // Add current profile to history before enhancing
      setProfileHistory(prev => [...prev, formData.profile]);

      const response = await fetch('http://localhost:5000/api/resume/enhance-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ profile: formData.profile }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to enhance profile');
      }

      setFormData(prev => ({
        ...prev,
        profile: data.data.enhancedProfile
      }));
    } catch (error) {
      console.error('Error enhancing profile:', error);
      setError([error.message || 'Failed to enhance profile. Please try again.']);
    } finally {
      setIsEnhancing(false);
    }
  };

  const handleUndoEnhance = () => {
    if (profileHistory.length > 0) {
      // Get the last version from history
      const previousVersion = profileHistory[profileHistory.length - 1];
      
      // Update the profile with the previous version
      setFormData(prev => ({
        ...prev,
        profile: previousVersion
      }));
      
      // Remove the last version from history
      setProfileHistory(prev => prev.slice(0, -1));
    }
  };

  const validateForm = () => {
    const errors = [];
    
    // Required fields validation
    if (!formData.fullName.trim()) errors.push('Full name is required');
    if (!formData.email.trim()) errors.push('Email is required');
    if (!formData.phone.trim()) errors.push('Phone number is required');
    if (!formData.address.trim()) errors.push('Address is required');
    if (!formData.profile.trim()) errors.push('Profile description is required');
    
    // Education validation
    if (formData.education.length === 0 || formData.education.every(edu => !edu.institution.trim() && !edu.degree.trim() && !edu.startDate && !edu.endDate)) {
      errors.push('At least one education entry is required');
    } else {
      formData.education.forEach((edu, index) => {
        if (!edu.institution.trim()) errors.push(`Institution name is required for education #${index + 1}`);
        if (!edu.degree.trim()) errors.push(`Degree is required for education #${index + 1}`);
        if (!edu.startDate) errors.push(`Start date is required for education #${index + 1}`);
        if (!edu.endDate) errors.push(`End date is required for education #${index + 1}`);
      });
    }

    // Work Experience validation
    if (formData.workExperience.length === 0 || formData.workExperience.every(exp => !exp.companyName.trim() && !exp.jobTitle.trim() && !exp.startDate && !exp.endDate && !exp.experience.trim())) {
      errors.push('At least one work experience entry is required');
    } else {
      formData.workExperience.forEach((exp, index) => {
        if (!exp.companyName.trim()) errors.push(`Company name is required for experience #${index + 1}`);
        if (!exp.jobTitle.trim()) errors.push(`Job title is required for experience #${index + 1}`);
        if (!exp.startDate) errors.push(`Start date is required for experience #${index + 1}`);
        if (!exp.endDate) errors.push(`End date is required for experience #${index + 1}`);
        if (!exp.experience.trim()) errors.push(`Experience description is required for experience #${index + 1}`);
      });
    }

    // Skills validation
    if (formData.skills.length === 0 || formData.skills.every(skill => !skill.trim())) {
      errors.push('At least one skill is required');
    }

    // Hobbies validation
    if (formData.hobbies.length === 0 || formData.hobbies.every(hobby => !hobby.trim())) {
      errors.push('At least one hobby is required');
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset states
    setError(null);
    setShowSuccess(false);
    setIsLoading(true);

    // Validate form
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setError(validationErrors);
      setIsLoading(false);
      return;
    }

    try {
      // Show success message before making the request
      setShowSuccess(true);

      const response = await fetch('http://localhost:5000/api/generate-resume', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to generate resume');
      }

      // Get the blob
      const blob = await response.blob();
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'resume.pdf';
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      // Clear success message after delay
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);

    } catch (error) {
      setShowSuccess(false);
      console.error('Error:', error);
      setError(['Failed to generate resume. Please try again.']);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePreview = () => {
    setPreviewData(formData);
    setShowPreview(true);
  };

  return (
    <PageContainer>
      {isLoading && (
        <LoadingOverlay>
          <Spinner />
        </LoadingOverlay>
      )}
      
      {showSuccess && (
        <SuccessMessage>
          Resume generated successfully! Downloading...
        </SuccessMessage>
      )}

      {error && (
        <ErrorMessage>
          <strong>Please fix the following errors:</strong>
          <ul>
            {error.map((err, index) => (
              <li key={index}>{err}</li>
            ))}
          </ul>
        </ErrorMessage>
      )}

      {showPreview && (
        <PreviewModal onClick={() => setShowPreview(false)}>
          <PreviewContent onClick={e => e.stopPropagation()}>
            <CloseButton onClick={() => setShowPreview(false)}>×</CloseButton>
            <PreviewHeader>
              <h2>{previewData.fullName}</h2>
              <PreviewText>{previewData.email} | {previewData.phone}</PreviewText>
              <PreviewText>{previewData.address}, {previewData.postalCode}</PreviewText>
            </PreviewHeader>

            <PreviewSection>
              <PreviewSectionTitle>Profile</PreviewSectionTitle>
              <PreviewText>{previewData.profile}</PreviewText>
            </PreviewSection>

            <PreviewSection>
              <PreviewSectionTitle>Education</PreviewSectionTitle>
              {previewData.education.map((edu, index) => (
                <div key={index}>
                  <PreviewText><strong>{edu.institution}</strong></PreviewText>
                  <PreviewText>{edu.degree} - {edu.startDate} to {edu.endDate}</PreviewText>
                </div>
              ))}
            </PreviewSection>

            <PreviewSection>
              <PreviewSectionTitle>Work Experience</PreviewSectionTitle>
              {previewData.workExperience.map((exp, index) => (
                <div key={index}>
                  <PreviewText><strong>{exp.companyName}</strong> - {exp.jobTitle}</PreviewText>
                  <PreviewText>{exp.startDate} to {exp.endDate}</PreviewText>
                  <PreviewText>{exp.experience}</PreviewText>
                </div>
              ))}
            </PreviewSection>

            <PreviewSection>
              <PreviewSectionTitle>Skills</PreviewSectionTitle>
              <PreviewSkills>
                {previewData.skills.map((skill, index) => (
                  <SkillTag key={index}>{skill}</SkillTag>
                ))}
              </PreviewSkills>
            </PreviewSection>

            <PreviewSection>
              <PreviewSectionTitle>Hobbies</PreviewSectionTitle>
              <PreviewSkills>
                {previewData.hobbies.map((hobby, index) => (
                  <SkillTag key={index}>{hobby}</SkillTag>
                ))}
              </PreviewSkills>
            </PreviewSection>
          </PreviewContent>
        </PreviewModal>
      )}

      <Navbar />

      <FormSection>
        <FormTitle>Resume Generation</FormTitle>
        <FormSubtitle>Your Gateway to a Perfecto Resume</FormSubtitle>

        <FormContainer>
          <form onSubmit={handleSubmit}>
            <InputColumn>
              <FormGroup>
                <Label>Full name<Required>*</Required></Label>
                <Input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label>Email ID<Required>*</Required></Label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email id"
                  required
                />
              </FormGroup>
            </InputColumn>
            <FormImage src="/assets/images/group_27.svg" alt="Resume Generation" />

            <FormGroup>
              <Label>Personal Details<Required>*</Required></Label>
              <InputRow>
                <Input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number (e.g. +1 555-0199)"
                  style={{ flex: 1 }}
                />
              </InputRow>
              <InputRow>
                <Input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Enter your address"
                  style={{ flex: 2 }}
                />
                <Input
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  placeholder="Enter Postal Code"
                  style={{ flex: 1 }}
                />
              </InputRow>
            </FormGroup>

            <FormGroup>
              <Label>Profile<Required>*</Required></Label>
              <InputRow>
                <TextArea
                  name="profile"
                  value={formData.profile}
                  onChange={handleInputChange}
                  placeholder="Write a brief description about yourself"
                  style={{ height: '120px', width: '100%' }}
                />
              </InputRow>
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                {formData.profile.trim() && (
                  <EnhanceButton 
                    onClick={handleEnhanceProfile}
                    disabled={isEnhancing}
                  >
                    {isEnhancing ? 'Enhancing...' : 'Enhance Profile'}
                  </EnhanceButton>
                )}
                {profileHistory.length > 0 && (
                  <EnhanceButton 
                    onClick={handleUndoEnhance}
                    style={{ background: '#E9191D' }}
                  >
                    Undo Enhancement ({profileHistory.length} left)
                  </EnhanceButton>
                )}
              </div>
            </FormGroup>

            <FormGroup>
              <Label>Education<Required>*</Required></Label>
              {formData.education.map((edu, index) => (
                <div key={index}>
                  <InputRow>
                    <Input
                      type="text"
                      value={edu.institution}
                      onChange={(e) => handleEducationChange(index, 'institution', e.target.value)}
                      placeholder="Institution Name"
                      style={{ flex: 1 }}
                    />
                    {index > 0 && (
                      <RemoveButton onClick={() => removeEducation(index)}>
                        ×
                      </RemoveButton>
                    )}
                  </InputRow>
                  <InputRow>
                    <Input
                      type="text"
                      value={edu.degree}
                      onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                      placeholder="Degree Earned"
                      style={{ flex: 1 }}
                    />
                    <Input
                      type="date"
                      value={edu.startDate}
                      onChange={(e) => handleEducationChange(index, 'startDate', e.target.value)}
                      placeholder="Start Date"
                      style={{ flex: 1 }}
                    />
                    <Input
                      type="date"
                      value={edu.endDate}
                      onChange={(e) => handleEducationChange(index, 'endDate', e.target.value)}
                      placeholder="End Date"
                      style={{ flex: 1 }}
                    />
                  </InputRow>
                </div>
              ))}
              <Button type="button" onClick={addEducation}>Education +</Button>
            </FormGroup>

            <FormGroup>
              <Label>Work Experience<Required>*</Required></Label>
              {formData.workExperience.map((exp, index) => (
                <div key={index}>
                  <InputRow>
                    <Input
                      type="text"
                      value={exp.companyName}
                      onChange={(e) => handleWorkExperienceChange(index, 'companyName', e.target.value)}
                      placeholder="Company Name"
                      style={{ flex: 1 }}
                    />
                    {index > 0 && (
                      <RemoveButton onClick={() => removeWorkExperience(index)}>
                        ×
                      </RemoveButton>
                    )}
                  </InputRow>
                  <InputRow>
                    <Input
                      type="text"
                      value={exp.jobTitle}
                      onChange={(e) => handleWorkExperienceChange(index, 'jobTitle', e.target.value)}
                      placeholder="Job Title"
                      style={{ flex: 1 }}
                    />
                    <Input
                      type="date"
                      value={exp.startDate}
                      onChange={(e) => handleWorkExperienceChange(index, 'startDate', e.target.value)}
                      placeholder="Start Date"
                      style={{ flex: 1 }}
                    />
                    <Input
                      type="date"
                      value={exp.endDate}
                      onChange={(e) => handleWorkExperienceChange(index, 'endDate', e.target.value)}
                      placeholder="End Date"
                      style={{ flex: 1 }}
                    />
                  </InputRow>
                  <InputRow>
                    <TextArea
                      value={exp.experience}
                      onChange={(e) => handleWorkExperienceChange(index, 'experience', e.target.value)}
                      placeholder="Describe your work experience"
                      style={{ width: '100%' }}
                    />
                  </InputRow>
                </div>
              ))}
              <Button type="button" onClick={addWorkExperience}>Experience +</Button>
            </FormGroup>

            <SkillHobbyContainer>
              <SkillHobbySection>
                <Label>Skills<Required>*</Required></Label>
                {formData.skills.map((skill, index) => (
                  <InputWithButton key={index}>
                    <Input
                      type="text"
                      value={skill}
                      onChange={(e) => handleArrayInputChange(index, e.target.value, 'skills')}
                      placeholder={`Enter Skill ${index + 1}`}
                    />
                    {index > 0 && (
                      <RemoveButton onClick={() => removeArrayItem(index, 'skills')}>
                        ×
                      </RemoveButton>
                    )}
                  </InputWithButton>
                ))}
                <Button type="button" onClick={() => addArrayItem('skills')}>Skill +</Button>
              </SkillHobbySection>

              <SkillHobbySection>
                <Label>Hobbies<Required>*</Required></Label>
                {formData.hobbies.map((hobby, index) => (
                  <InputWithButton key={index}>
                    <Input
                      type="text"
                      value={hobby}
                      onChange={(e) => handleArrayInputChange(index, e.target.value, 'hobbies')}
                      placeholder={`Enter Hobby ${index + 1}`}
                    />
                    {index > 0 && (
                      <RemoveButton onClick={() => removeArrayItem(index, 'hobbies')}>
                        ×
                      </RemoveButton>
                    )}
                  </InputWithButton>
                ))}
                <Button type="button" onClick={() => addArrayItem('hobbies')}>Hobby +</Button>
              </SkillHobbySection>
            </SkillHobbyContainer>

            <FormGroup>
              <Label>Choose Template<Required>*</Required></Label>
              <TemplateSelection>
                <TemplateCard 
                  selected={formData.template === 'modern'} 
                  onClick={() => setFormData(prev => ({ ...prev, template: 'modern' }))}
                >
                  <TemplatePreview>Modern Template</TemplatePreview>
                  <TemplateName>Modern</TemplateName>
                </TemplateCard>
                <TemplateCard 
                  selected={formData.template === 'professional'} 
                  onClick={() => setFormData(prev => ({ ...prev, template: 'professional' }))}
                >
                  <TemplatePreview>Professional Template</TemplatePreview>
                  <TemplateName>Professional</TemplateName>
                </TemplateCard>
                <TemplateCard 
                  selected={formData.template === 'creative'} 
                  onClick={() => setFormData(prev => ({ ...prev, template: 'creative' }))}
                >
                  <TemplatePreview>Creative Template</TemplatePreview>
                  <TemplateName>Creative</TemplateName>
                </TemplateCard>
              </TemplateSelection>
            </FormGroup>

            <ButtonGroup>
              <Button type="button" className="secondary" onClick={() => navigate("/")}>
                Cancel
              </Button>
              <Button type="button" className="primary" onClick={() => navigate("/template-selection", { state: { formData } })}>
                Next
              </Button>
            </ButtonGroup>
          </form>
        </FormContainer>
      </FormSection>
    </PageContainer>
  );
};

export default ResumeGenerationPage; 