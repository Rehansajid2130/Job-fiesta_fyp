import styled from "styled-components";

export const PageContainer = styled.div`
  position: relative;
  overflow: hidden;
  background: #FFFFFF;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  min-height: 100vh;
  width: 100%;
`;

export const Header = styled.div`
  position: absolute;
  background: #F2FFF2;
  height: 89px;
  width: 100%;
  top: 0;
  left: 0;
`;

export const Logo = styled.div`
  position: absolute;
  left: 40px;
  top: 29px;
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const LogoText = styled.span`
  font-family: ${props => props.font || 'Martel'};
  font-size: ${props => props.size || '24px'};
  font-weight: ${props => props.weight || '900'};
  color: #000000;
`;

export const Navigation = styled.div`
  position: absolute;
  height: 50px;
  width: 359.72px;
  left: 50%;
  transform: translateX(-50%);
  top: 27px;
  display: flex;
  gap: 20px;
`;

export const NavItem = styled.div`
  padding: 10px;
  cursor: pointer;
  font-family: Inter;
  font-size: 20px;
  font-weight: ${props => props['data-active'] ? '700' : '500'};
  color: #282828;
`;

export const BrowseJobsButton = styled.div`
  position: absolute;
  right: 40px;
  top: 27px;
  padding: 10px;
  cursor: pointer;
  font-family: Inter;
  font-size: 20px;
  font-weight: 700;
  color: #0C463B;
`;

export const FormSection = styled.div`
  margin-top: 120px;
  padding: 20px;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
`;

export const FormTitle = styled.h1`
  font-family: Poppins;
  font-size: 45px;
  font-weight: 600;
  color: #303030;
  margin-bottom: 10px;
`;

export const FormSubtitle = styled.p`
  font-family: Poppins;
  font-size: 22px;
  color: #5E6670;
  margin-bottom: 40px;
`;

export const FormGroup = styled.div`
  margin-bottom: 30px;
`;

export const Label = styled.label`
  display: block;
  font-family: Poppins;
  font-size: 24px;
  font-weight: 500;
  color: #303030;
  margin-bottom: 10px;
`;

export const Required = styled.span`
  color: #F04141;
`;

export const InputColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 20px;
  max-width: 400px;
`;

export const InputRow = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  width: 100%;
`;

export const Input = styled.input`
  width: 100%;
  height: 45px;
  border: 2px solid #E7E7F1;
  border-radius: 8px;
  padding: 0 20px;
  font-family: Poppins;
  font-size: 16px;
  color: #121224;
  margin-bottom: 10px;
  
  &::placeholder {
    color: rgba(18, 18, 36, 0.5);
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  height: 100px;
  border: 2px solid #E7E7F1;
  border-radius: 8px;
  padding: 20px;
  font-family: Poppins;
  font-size: 16px;
  color: #121224;
  resize: vertical;
  margin-bottom: 10px;
  
  &::placeholder {
    color: rgba(18, 18, 36, 0.5);
  }
`;

export const EnhanceButton = styled.button`
  background: #0C463B;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-family: Poppins;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  margin-top: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;

  &:hover {
    background: #0a3a32;
  }

  &:disabled {
    background: #cccccc;
    cursor: not-allowed;
  }
`;

export const FormImage = styled.img`
  position: absolute;
  right: 100px;
  top: 40px;
  width: 400px;
  height: auto;
  filter: drop-shadow(0px 10px 40px rgba(0, 0, 0, 0.15));
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-top: 40px;
`;

export const Button = styled.button`
  height: 45px;
  width: 200px;
  border-radius: 8px;
  font-family: Inter;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  
  &.primary {
    background: #0C463B;
    color: #FFFFFF;
  }
  
  &.secondary {
    background: #E9191D;
    color: #FFFFFF;
  }
`;

export const SkillHobbyContainer = styled.div`
  display: flex;
  gap: 40px;
  margin-bottom: 30px;
`;

export const SkillHobbySection = styled.div`
  flex: 1;
`;

export const InputWithButton = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  margin-bottom: 10px;
`;

export const RemoveButton = styled.button`
  height: 45px;
  width: 45px;
  border-radius: 8px;
  background: #E9191D;
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
`;

export const FormContainer = styled.div`
  position: relative;
  background: rgba(255, 255, 255, 1.00);
  border-radius: 40px;
  box-shadow: 0px 10px 40px rgba(0, 0, 0, 0.15);
  padding: 40px;
  margin-top: 20px;
  margin-bottom: 40px;
  min-height: 500px;
`;

export const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #0C463B;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export const SuccessMessage = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  background: #4CAF50;
  color: white;
  padding: 15px 25px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
  animation: slideIn 0.3s ease-out;

  @keyframes slideIn {
    from { transform: translateX(100%); }
    to { transform: translateX(0); }
  }
`;

export const ErrorMessage = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  background: #f44336;
  color: white;
  padding: 15px 25px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
  animation: slideIn 0.3s ease-out;
  max-width: 400px;
  z-index: 1000;

  ul {
    margin: 5px 0 0 0;
    padding-left: 20px;
  }

  li {
    margin: 5px 0;
  }

  @keyframes slideIn {
    from { transform: translateX(100%); }
    to { transform: translateX(0); }
  }
`;

export const TemplateSelection = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
  flex-wrap: wrap;
`;

export const TemplateCard = styled.div`
  width: 200px;
  height: 280px;
  border: 2px solid ${props => props.selected ? '#0C463B' : '#E7E7F1'};
  border-radius: 8px;
  padding: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${props => props.selected ? '#F2FFF2' : '#FFFFFF'};

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
`;

export const TemplatePreview = styled.div`
  width: 100%;
  height: 200px;
  background: #F5F5F5;
  border-radius: 4px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Poppins;
  color: #666;
`;

export const TemplateName = styled.div`
  font-family: Poppins;
  font-size: 16px;
  font-weight: 500;
  color: #303030;
  text-align: center;
`;

export const PreviewModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const PreviewContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
  
  &:hover {
    color: #000;
  }
`;

export const PreviewHeader = styled.div`
  text-align: center;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 2px solid #E7E7F1;
`;

export const PreviewSection = styled.div`
  margin-bottom: 20px;
`;

export const PreviewSectionTitle = styled.h3`
  font-family: Poppins;
  font-size: 18px;
  font-weight: 600;
  color: #0C463B;
  margin-bottom: 10px;
`;

export const PreviewText = styled.p`
  font-family: Poppins;
  font-size: 14px;
  color: #303030;
  margin: 5px 0;
`;

export const PreviewSkills = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

export const SkillTag = styled.span`
  background: #F2FFF2;
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 14px;
  color: #0C463B;
`;
