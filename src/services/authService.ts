import { User } from '../types';

// Mock user data for demonstration
const mockUsers: User[] = [
  {
    id: '1',
    email: 'demo@hireflow.com',
    firstName: 'John',
    lastName: 'Doe',
    phoneNumber: '+1234567890',
    profilePicture: {
      url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      publicId: 'demo-profile'
    },
    resume: {
      url: 'https://example.com/resume.pdf',
      publicId: 'demo-resume',
      fileName: 'John_Doe_Resume.pdf',
      uploadedAt: new Date('2024-01-15')
    },
    socialLinks: {
      github: 'https://github.com/johndoe',
      linkedin: 'https://linkedin.com/in/johndoe',
      portfolio: 'https://johndoe.dev'
    },
    isEmailVerified: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-15'),
    lastLogin: new Date('2024-01-15')
  }
];

class MockAuthService {
  private token: string | null = localStorage.getItem('token');
  private currentUser: User | null = null;

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return this.token;
  }

  removeToken() {
    this.token = null;
    localStorage.removeItem('token');
  }

  async register(userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phoneNumber?: string;
  }): Promise<{ success: boolean; token: string; user: User }> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check if user already exists
    const existingUser = mockUsers.find(u => u.email === userData.email);
    if (existingUser) {
      throw new Error('User already exists with this email');
    }

    // Create new user
    const newUser: User = {
      id: (mockUsers.length + 1).toString(),
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      phoneNumber: userData.phoneNumber,
      socialLinks: {},
      isEmailVerified: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      lastLogin: new Date()
    };

    mockUsers.push(newUser);
    const token = `mock-token-${Date.now()}`;
    this.setToken(token);
    this.currentUser = newUser;

    return {
      success: true,
      token,
      user: newUser
    };
  }

  async login(email: string, password: string): Promise<{ success: boolean; token: string; user: User }> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Find user (in real app, would check password)
    const user = mockUsers.find(u => u.email === email);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Update last login
    user.lastLogin = new Date();
    user.updatedAt = new Date();

    const token = `mock-token-${Date.now()}`;
    this.setToken(token);
    this.currentUser = user;

    return {
      success: true,
      token,
      user
    };
  }

  async getCurrentUser(): Promise<User> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    if (!this.token) {
      throw new Error('Not authenticated');
    }

    // Return the first mock user for demo
    return mockUsers[0];
  }

  async updateProfile(profileData: Partial<User>): Promise<User> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (!this.currentUser) {
      throw new Error('Not authenticated');
    }

    // Update user data
    Object.assign(this.currentUser, profileData);
    this.currentUser.updatedAt = new Date();

    // Update in mock array
    const index = mockUsers.findIndex(u => u.id === this.currentUser!.id);
    if (index !== -1) {
      mockUsers[index] = this.currentUser;
    }

    return this.currentUser;
  }

  async uploadProfilePicture(file: File): Promise<{ url: string; publicId: string }> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    if (!this.currentUser) {
      throw new Error('Not authenticated');
    }

    // Create a mock URL (in real app, this would be uploaded to Cloudinary)
    const mockUrl = `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face&t=${Date.now()}`;
    const publicId = `profile-${Date.now()}`;

    // Update user profile picture
    this.currentUser.profilePicture = { url: mockUrl, publicId };
    this.currentUser.updatedAt = new Date();

    return { url: mockUrl, publicId };
  }

  async uploadResume(file: File): Promise<{
    url: string;
    publicId: string;
    fileName: string;
    uploadedAt: Date;
  }> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    if (!this.currentUser) {
      throw new Error('Not authenticated');
    }

    // Create mock resume data
    const mockUrl = `https://example.com/resume-${Date.now()}.pdf`;
    const publicId = `resume-${Date.now()}`;
    const fileName = file.name;
    const uploadedAt = new Date();

    // Update user resume
    this.currentUser.resume = {
      url: mockUrl,
      publicId,
      fileName,
      uploadedAt
    };
    this.currentUser.updatedAt = new Date();

    return { url: mockUrl, publicId, fileName, uploadedAt };
  }

  logout() {
    this.removeToken();
    this.currentUser = null;
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }
}

export default new MockAuthService(); 