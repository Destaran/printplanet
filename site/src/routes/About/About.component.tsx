import styled from "styled-components";
import { Button } from "../../components/Button/Button.component";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0px auto;
  padding: 30px;
  width: 65%;
  height: 100%;
  background-color: #f1f1f1;
  user-select: none;

  h1 {
    margin: 0;
  }

  button {
    width: 10%;
  }

  ul {
    margin-top: 0;
  }
`;

const DonateQR = styled.img`
  width: 10%;
`;

const SocialLogo = styled.img`
  width: 3%;
  margin: 0 5px 5px 5px;
  cursor: pointer;
`;

const LogoContainer = styled.div`
  display: flex;
`;

export const About = () => {
  const redirectToPaypal = () => {
    window.location.href =
      "https://www.paypal.com/donate/?hosted_button_id=7YCG2SZ42CZ54";
  };

  const redirectToDiscord = () => {
    window.location.href = "https://discordapp.com/users/.balagee";
  };

  return (
    <Container>
      <h1>Why PrintPlanet?</h1>
      <p>
        PrintPlanet aims to combine the perks of all available calculators and
        even more: simple, configurable, accurate and transparent while feature
        rich. <br /> Most of the calculators are overcomplicated, or if not,
        they are not so useable.
        <br /> I would like to provide a calculator to my fellow engineers, that
        can be utilized for any challenge Factorio can bring for new players and
        veterans alike.
      </p>
      <h1>Feature Roadmap</h1>
      <h3>Backend</h3>
      <ul>
        <li>Switching from Firestore to Express.js, later Nest.js</li>
        <li>Full TypeScript migration</li>
        <li>Automated server-side mod data scraping</li>
      </ul>
      <h3>Frontend</h3>
      <ul>
        <li>Adding energy consumption and pollution data</li>
        <li>Calculation browser: share your calculations and browse others'</li>
        <li>Attachable and viewable blueprints</li>
        <li>Compatibility with all mods</li>
      </ul>
      <h1>Let me know what you think</h1>
      <p>
        While the list isn't long, these features are complex and were never
        been implemented all-in-one on the same site before. <br /> <br /> Reach
        out to me and let me know what you think about this project:{" "}
      </p>
      <LogoContainer>
        <SocialLogo
          onClick={redirectToDiscord}
          src="./assets/discord-icon.svg"
        />
      </LogoContainer>
      <p>If you would like to show appreciation, consider donating:</p>
      <DonateQR src="./assets/donateQR.png" alt="" />
      <Button buttonType="green" onClick={redirectToPaypal}>
        Donate
      </Button>
    </Container>
  );
};
