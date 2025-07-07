// API service for backend communication
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export class ApiService {
  private static async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const defaultOptions: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, defaultOptions);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'API request failed');
      }
      
      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Chat/AI related endpoints
  static async sendMessage(message: string): Promise<ApiResponse<{ response: string }>> {
    return this.request<{ response: string }>('/chat', {
      method: 'POST',
      body: JSON.stringify({ message }),
    });
  }

  static async generateResumeBullet(experience: string): Promise<ApiResponse<{ bullet: string }>> {
    return this.request<{ bullet: string }>('/resume/bullet', {
      method: 'POST',
      body: JSON.stringify({ experience }),
    });
  }

  static async tailorResume(resumeId: string, jobDescription: string): Promise<ApiResponse<{ tailoredResume: string }>> {
    return this.request<{ tailoredResume: string }>('/resume/tailor', {
      method: 'POST',
      body: JSON.stringify({ resumeId, jobDescription }),
    });
  }

  static async generateCoverLetter(resumeId: string, jobDescription: string): Promise<ApiResponse<{ coverLetter: string }>> {
    return this.request<{ coverLetter: string }>('/cover-letter/generate', {
      method: 'POST',
      body: JSON.stringify({ resumeId, jobDescription }),
    });
  }

  // Application tracking endpoints
  static async getApplications(): Promise<ApiResponse<any[]>> {
    return this.request<any[]>('/applications');
  }

  static async createApplication(application: any): Promise<ApiResponse<any>> {
    return this.request<any>('/applications', {
      method: 'POST',
      body: JSON.stringify(application),
    });
  }

  static async updateApplicationStatus(applicationId: string, status: string): Promise<ApiResponse<any>> {
    return this.request<any>(`/applications/${applicationId}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  }

  // Resume management endpoints
  static async getResumes(): Promise<ApiResponse<any[]>> {
    return this.request<any[]>('/resumes');
  }

  static async createResume(resume: any): Promise<ApiResponse<any>> {
    return this.request<any>('/resumes', {
      method: 'POST',
      body: JSON.stringify(resume),
    });
  }

  static async updateResume(resumeId: string, resume: any): Promise<ApiResponse<any>> {
    return this.request<any>(`/resumes/${resumeId}`, {
      method: 'PUT',
      body: JSON.stringify(resume),
    });
  }

  static async deleteResume(resumeId: string): Promise<ApiResponse<void>> {
    return this.request<void>(`/resumes/${resumeId}`, {
      method: 'DELETE',
    });
  }
}

export default ApiService; 