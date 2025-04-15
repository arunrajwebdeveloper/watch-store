import React from "react";
import GridItem from "./GridItem";

type Props = {
  url: string;
  image: string;
  content: string;
  buttonText: string;
};

const Banner = (props: Props) => {
  return (
    <div className="wide-banner">
      <GridItem {...props} />
    </div>
  );
};

export default Banner;
