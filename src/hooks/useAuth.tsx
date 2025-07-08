
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/types/database';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock authentication check
    const mockUser = localStorage.getItem('mockUser');
    if (mockUser) {
      setUser(JSON.parse(mockUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Mock login - in real app this would call Supabase
    const mockUsers: User[] = [
      { id: '1', email: 'admin@exp.com', full_name: 'Admin User', role: 'admin', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
      { id: '2', email: 'staff@exp.com', full_name: 'eXp Staff', role: 'exp_staff', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
      { id: '3', email: 'lead@exp.com', full_name: 'Team Lead', role: 'team_lead', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
      { id: '4', email: 'agent@exp.com', full_name: 'Agent User', role: 'agent', created_at: new Date().toISOString(), updated_at: new Date().toISOString() }
    ];
    
    const foundUser = mockUsers.find(u => u.email === email);
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('mockUser', JSON.stringify(foundUser));
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('mockUser');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
