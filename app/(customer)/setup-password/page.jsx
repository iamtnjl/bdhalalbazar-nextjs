import { Suspense } from "react";
import SetupPasswordForm from "./components/SetupPasswordForm";

const SetupPassword = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SetupPasswordForm />
    </Suspense>
  );
};

export default SetupPassword;
