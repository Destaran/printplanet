import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { FaInfoCircle } from "react-icons/fa";
import { BsArrowReturnRight } from "react-icons/bs";
import { PageBase } from "../components/PageBase";

const Segment = styled.div`
  display: flex;
  margin: 15px 0 15px 0;
  transition: all 1s;
  cursor: pointer;

  &:hover {
    color: orange;
    transition: all 0.3s;
  }

  &:active {
    color: black;
    transition: all 0.03s;
  }

  svg {
    scale: 2;
    margin-right: 20px;
  }

  p {
    margin: 0;
  }
`;

const Header = styled.h1`
  margin: 0 0 30px 0;
`;

export const LandingPage = () => {
  const navigate = useNavigate();
  const handleClick = (path: string) => {
    navigate(path);
  };

  return (
    <PageBase>
      <Header>Welcome Fellow Engineer,</Header>
      <Segment onClick={() => handleClick("/about")}>
        <AiFillStar />
        <p>PrintPlanet aims to be your favorite Factorio calculator! </p>
      </Segment>
      <Segment onClick={() => handleClick("/login")}>
        <CgProfile />
        <p>
          Create an account or Log in to get the most out of the site!{" "}
        </p>{" "}
      </Segment>
      <Segment onClick={() => handleClick("/guide")}>
        <FaInfoCircle />
        <p>
          Take a look at the Guide to be sure you know about all the functions
          this calculator can bring to you!
        </p>
      </Segment>
      <Segment onClick={() => handleClick("/planner")}>
        <BsArrowReturnRight />
        <p>Or just skip straight to the Planner!</p>
      </Segment>
    </PageBase>
  );
};
