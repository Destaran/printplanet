import RegistrationForm from "../../components/RegistrationForm/RegistrationForm.component";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { currentUser } from "../../reduxStore/user/user.selector";
import { User } from "../../utils/types";

export const Registration = () => {
  const user: User | null = useSelector(currentUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/calculator");
    }
  }, [user]);

  return <RegistrationForm />;
};
