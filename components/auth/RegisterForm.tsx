import {useRegisterForm} from '@/features/auth/hooks/use-register-form';

export default function RegisterForm() {
  const { values, error, isSubmitting, handleChange, handleSubmit } =
    useRegisterForm()

  return (
    "форма регистрации"
  )
}
