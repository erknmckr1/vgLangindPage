import SignUpForm from "../components/signUp/SignUpForm";
import { redirect } from "next/navigation";
import { getCurrentUser } from "src/lib/helper/auth";
export default async function SignUp() {
  const user = await getCurrentUser();
  if (user) {
    redirect("/dashboard/home");
  }
  return <SignUpForm />;
}
