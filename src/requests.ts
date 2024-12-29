import supabase from "../utils/supabase";

interface UserProps {
  name?: string;
  email: string;
  password: string;
}
export const signUpNewuser = async ({ email, password, name }: UserProps) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        email,
      },
    },
  });
  if (error) {
    console.log(error);
    return error;
  } else {
    return data.user;
  }
};

export const loginUser = async ({ email, password }: UserProps) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    console.log(error.status);
    return error;
  } else {
    return data.user;
  }
};
