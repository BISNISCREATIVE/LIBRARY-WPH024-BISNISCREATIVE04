import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { BookOpen, Eye, EyeOff, Mail, Lock, Shield } from 'lucide-react';
import { useAppDispatch } from '@/app/hooks';
import { loginStart, loginSuccess, loginFailure } from '@/features/auth/authSlice';
import { toast } from '@/hooks/use-toast';

export const AdminLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    dispatch(loginStart());

    try {
      const response = await fetch('https://belibraryformentee-production.up.railway.app/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        throw new Error('Login failed');
      }
      
      const data = await response.json();
      
      // Check if user is admin
      if (data.user?.role !== 'ADMIN') {
        throw new Error('Access denied. Admin credentials required.');
      }
      
      dispatch(loginSuccess({
        user: data.user,
        token: data.token
      }));

      toast({
        title: 'Admin Login Successful',
        description: `Welcome back, ${data.user?.name || 'Admin'}! Access granted to admin panel.`,
      });

      navigate('/admin');
    } catch (error) {
      dispatch(loginFailure());
      const errorMessage = error instanceof Error ? error.message : 'Invalid credentials or insufficient permissions.';
      setErrors({
        general: errorMessage
      });
      
      toast({
        title: 'Admin Login Failed',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-red-700 rounded-lg flex items-center justify-center shadow-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">Admin Portal</span>
          </Link>
        </div>

        <Card className="shadow-2xl border-slate-700 bg-slate-800/50 backdrop-blur">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-2xl font-bold text-white flex items-center justify-center gap-2">
              <Shield className="w-6 h-6 text-red-500" />
              Admin Access
            </CardTitle>
            <CardDescription className="text-slate-300">
              Sign in with your administrator credentials
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {errors.general && (
              <Alert variant="destructive" className="bg-red-900/50 border-red-700">
                <AlertDescription className="text-red-200">{errors.general}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-200">Admin Email</Label>
                <div className="relative">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter admin email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`pl-10 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-red-500 ${errors.email ? 'border-red-500' : ''}`}
                  />
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                </div>
                {errors.email && (
                  <p className="text-sm text-red-400">{errors.email}</p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-200">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter admin password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`pl-10 pr-10 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-red-500 ${errors.password ? 'border-red-500' : ''}`}
                  />
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 text-slate-400 hover:text-white"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </Button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-400">{errors.password}</p>
                )}
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-2.5" 
                disabled={isLoading}
              >
                {isLoading ? 'Authenticating...' : 'Access Admin Panel'}
              </Button>
            </form>

            {/* User Login Link */}
            <div className="text-center text-sm">
              <span className="text-slate-400">Not an admin? </span>
              <Link 
                to="/login" 
                className="text-red-400 hover:text-red-300 hover:underline font-medium"
              >
                User Login
              </Link>
            </div>

            {/* Back to Home */}
            <div className="text-center">
              <Link 
                to="/" 
                className="text-sm text-slate-400 hover:text-slate-300 transition-colors"
              >
                ← Back to Home
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};