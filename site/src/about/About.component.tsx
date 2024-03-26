import styled from "styled-components";
import { Button } from "../components/Button/Button.component";
import { PageBase } from "../components/PageBase";

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  text-align: justify;

  button {
    width: 150px;
  }
`;

export const About = () => {
  const redirectToPaypal = () => {
    window.location.href =
      "https://www.paypal.com/donate/?hosted_button_id=7YCG2SZ42CZ54";
  };
  const handleEmail = () => {
    window.location.href =
      "https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley";
  };

  return (
    <PageBase>
      <TextWrapper>
        <h1>Why PrintPlanet?</h1>
        <p>
          PrintPlanet aims to combine the perks of all available calculators and
          even more: simple, configurable, accurate and transparent while
          feature rich. Most of the calculators are overcomplicated, or if not,
          they are not so useable. I would like to provide a calculator to my
          fellow engineers, that can be utilized for any challenge Factorio can
          bring for new players and veterans alike.
        </p>
        <h1>Feature Roadmap</h1>
        <h4>Plan hub: save and share your calculations or browse others'</h4>
        <h4>Plan blueprints: attachable and viewable blueprints</h4>
        <h4>More data: add energy consumption, pollution and side products</h4>
        <h4>Compatibility: support all mods</h4>
        <h1>Your help matters</h1>
        <p>If you enjoy the site, consider donating:</p>
        <Button buttonType="green" onClick={redirectToPaypal}>
          Donate
        </Button>
        <p>Have any ideas for the site? </p>
        <Button onClick={handleEmail}>Send feedback</Button>
      </TextWrapper>
    </PageBase>
  );
};
