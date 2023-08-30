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

  h2 {
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
  const redirectToReddit = () => {
    window.location.href = "https://www.reddit.com/user/Destaran";
  };

  return (
    <Container>
      <h2>Why PrintPlanet?</h2>
      <p>
        PrintPlanet aims to combine the perks of all available calculators and
        even more: simple, configurable, accurate and transparent. <br /> Most
        of the calculators are overcomplicated, or if not, they are not so
        useable.
        <br /> I would like to provide a calculator to my fellow engineers, that
        can be utilized by new players and veterans alike.
      </p>
      <h2>Feature Roadmap</h2>
      <p>
        First I would like to estabilish a robust backend for the many features
        I will be implementing, so <br /> these features won't be implemented
        rapidly, but I'm planning to start writing a DevLog to keep you updated.
      </p>
      <ul>
        <li>Adding energy consumption and pollution data</li>
        <li>Calculation browser: share your calculations and browse others'</li>
        <li>Attachable and viewable blueprints</li>
        <li>Compatibility with all mods</li>
      </ul>
      <h2>Let me know what you think</h2>
      <p>
        While the list isn't long, these features are complex and were never
        been implemented on the same site before. <br /> <br /> Reach out to me
        and let me know what you think about this project:{" "}
      </p>
      <LogoContainer>
        <SocialLogo
          onClick={redirectToDiscord}
          src="./src/assets/discord-icon.svg"
        />
        <SocialLogo
          onClick={redirectToReddit}
          src="./src/assets/Reddit_Logo_Icon.png"
        />
      </LogoContainer>
      <p>If you would like to show appreciation, consider donating:</p>
      <DonateQR src="/src/assets/donateQR.png" alt="" />
      <Button buttonType="green" onClick={redirectToPaypal}>
        Donate
      </Button>
    </Container>
  );
};