import React from "react";
import classes from "./VideoCard.module.scss";
import { Card, Image } from "semantic-ui-react";

const VideoCard = props => {
  return (
    <Card
      key={props.index}
      className={classes.videoCard}
      onContextMenu={e => props.handleRightClick(e, props.video._id)}
    >
      <Image
        src={
          props.video.videoThumbnail.high
            ? props.video.videoThumbnail.high.url
            : props.video.videoThumbnail
        }
        wrapped
        ui={false}
        onClick={() => props.handleImageClick(props.video.videoUrl)}
        className={classes.hover}
      />
      <Card.Content>{props.video.title}</Card.Content>
    </Card>
  );
};

export default VideoCard;
