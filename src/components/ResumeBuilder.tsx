import React, { useState } from 'react';

interface ResumeTemplate {
  id: string;
  name: string;
  description: string;
  preview: string;
}

interface ResumeBuilderProps {
  onTemplateSelect: (template: ResumeTemplate) => void;
}

const ResumeBuilder: React.FC<ResumeBuilderProps> = ({ onTemplateSelect }) => {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const templates: ResumeTemplate[] = [
    {
      id: 'professional',
      name: 'Professional',
      description: 'Clean and traditional format suitable for corporate roles',
      preview: 'Professional template preview',
    },
    {
      id: 'creative',
      name: 'Creative',
      description: 'Modern design with visual elements for creative industries',
      preview: 'Creative template preview',
    },
    {
      id: 'minimal',
      name: 'Minimal',
      description: 'Simple and elegant design focusing on content',
      preview: 'Minimal template preview',
    },
  ];

  const handleTemplateSelect = (template: ResumeTemplate) => {
    setSelectedTemplate(template.id);
    onTemplateSelect(template);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Choose a Resume Template</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {templates.map((template) => (
          <div
            key={template.id}
            className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
              selectedTemplate === template.id
                ? 'border-gray-800 bg-gray-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => handleTemplateSelect(template)}
          >
            <h3 className="font-medium text-gray-900 mb-2">{template.name}</h3>
            <p className="text-sm text-gray-600 mb-3">{template.description}</p>
            <div className="h-32 bg-gray-100 rounded border flex items-center justify-center text-gray-500 text-sm">
              {template.preview}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResumeBuilder; 