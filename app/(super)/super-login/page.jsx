import { Suspense } from "react";
import WeLoginForm from "./components/WeLoginForm";

const SuperLogin = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <WeLoginForm />
    </Suspense>
  );
};

export default SuperLogin;
