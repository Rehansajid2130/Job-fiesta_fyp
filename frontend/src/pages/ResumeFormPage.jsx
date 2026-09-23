import React, { useState } from 'react';
import styled from 'styled-components';

const FormContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const FormSection = styled.div`
  margin-bottom: 30px;
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 100px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  resize: vertical;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

const EnhanceButton = styled.button`
  background-color: #0C463B;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  font-size: 14px;
  
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
  
  &:hover:not(:disabled) {
    background-color: #0a3a30;
  }
`;

const RevertButton = styled.button`
  background-color: #E9191D;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  font-size: 14px;
  
  &:hover {
    background-color: #d11519;
  }
`;

const ResumeFormPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    postalCode: '',
    profile: '',
    education: [],
    workExperience: [],
    skills: [],
    hobbies: []
  });

  const [isEnhancing, setIsEnhancing] = useState(false);
  const [originalProfile, setOriginalProfile] = useState('');
  const [isEnhanced, setIsEnhanced] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEnhanceProfile = async () => {
    try {
      setIsEnhancing(true);
      setOriginalProfile(formData.profile);
      
      const response = await fetch('http://localhost:5000/api/resume/enhance-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ profile: formData.profile }),
      });

      const data = await response.json();
      
      if (data.success) {
        setFormData(prev => ({
          ...prev,
          profile: data.data.enhancedProfile
        }));
        setIsEnhanced(true);
      } else {
        throw new Error(data.error || 'Failed to enhance profile');
      }
    } catch (error) {
      console.error('Error enhancing profile:', error);
      alert('Failed to enhance profile. Please try again.');
    } finally {
      setIsEnhancing(false);
    }
  };

  const handleRevertProfile = () => {
    setFormData(prev => ({
      ...prev,
      profile: originalProfile
    }));
    setIsEnhanced(false);
  };

  return (
    <FormContainer>
      <h2>Create Your Resume</h2>
      <form>
        <FormSection>
          <h3>Personal Information</h3>
          <FormGroup>
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="phone">Phone</Label>
            <Input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
          </FormGroup>
        </FormSection>

        <FormSection>
          <h3>Professional Profile</h3>
          <FormGroup>
            <Label htmlFor="profile">Profile</Label>
            <TextArea
              id="profile"
              name="profile"
              value={formData.profile}
              onChange={handleInputChange}
              required
              placeholder="Write a brief professional summary..."
            />
            {formData.profile && (
              <ButtonGroup>
                <EnhanceButton
                  type="button"
                  onClick={handleEnhanceProfile}
                  disabled={isEnhancing}
                >
                  {isEnhancing ? 'Enhancing...' : 'Enhance Profile'}
                </EnhanceButton>
                {isEnhanced && (
                  <RevertButton
                    type="button"
                    onClick={handleRevertProfile}
                  >
                    Revert to Original
                  </RevertButton>
                )}
              </ButtonGroup>
            )}
          </FormGroup>
        </FormSection>
      </form>
    </FormContainer>
  );
};

export default ResumeFormPage; 