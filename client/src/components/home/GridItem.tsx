import Link from "next/link";
import React from "react";

type Props = {
  url: string;
  image: string;
  content?: string;
  buttonText?: string;
};

const GridItem = (props: Props) => {
  const { url, image, content, buttonText } = props;
  return (
    <div className="grid-item">
      <img
        src={image}
        alt="grid-image"
        className="grid-item__image"
        style={{ objectFit: "cover", width: "100%", height: "100%" }}
      />
      {content && (
        <div className="grid-item__content">
          <h2>{content}</h2>
          <div className="btn-holder center">
            <Link className="btn secondary" href={url}>
              {buttonText}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default GridItem;
