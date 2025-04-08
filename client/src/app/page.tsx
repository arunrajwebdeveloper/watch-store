import Image from "next/image";
import Banner from "./components/home/Banner";
import SectionColumn from "./components/home/SectionColumn";

export default function Home() {
  return (
    <>
      <Banner />
      <section>
        <div>
          <SectionColumn />
          <SectionColumn />
        </div>
      </section>
    </>
  );
}
