import React from "react";
import Link from "next/link";

type Props = {
  url: string;
  image: string;
};

const Banner = (props: Props) => {
  return (
    <div className="wide-banner">
      <Link href={props.url}>
        <img
          src={props.image}
          alt="banner image"
          className="grid-item__image"
          style={{ objectFit: "cover", width: "100%", height: "100%" }}
        />
      </Link>
    </div>
  );
};

export default Banner;
