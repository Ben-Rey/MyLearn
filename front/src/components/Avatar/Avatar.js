import React from "react";
import { Reveal, Image } from "semantic-ui-react";

const Avatar = props => {

  const style = {
    revealStyle: {
      overflow: "hidden",
      borderRadius: "500rem"
    }
  };

  return (
    <div>
      <Reveal animated="rotate" style={style.revealStyle}>
        <Reveal.Content visible>
          <Image
            circular
            size="small"
            src="https://react.semantic-ui.com/images/avatar/large/stevie.jpg"
          />
        </Reveal.Content>
        <Reveal.Content hidden>
          <Image
            circular
            size="small"
            src="https://react.semantic-ui.com/images/avatar/large/stevie.jpg"
          />
        </Reveal.Content>
      </Reveal>
    </div>
  );
};

export default Avatar;
