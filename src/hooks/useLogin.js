import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { loginUser } from '../services/user.service';
import { setAuthSession } from '@/lib/storage/authSession';
// import { useNavigate } from 'react-router-dom';

export const useLogin = () => {
  // const router = useNavigate();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (res) => {
      setAuthSession(res);
      // toast.success('Login successful!');
      toast.success(res.message);
      // Example: store token if API returns
      // localStorage.setItem('token', res.token);
      // router.push('/page/checkout');
    },
    onError: (err) => {
      toast.error(err?.response?.data?.detail || 'Login failed!');
    },
  });
};
