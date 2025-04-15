import Banner from "@/components/home/Banner";
import GridItem from "@/components/home/GridItem";
import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      <Banner />
      <Link href="/products">Products</Link>
      <GridItem />
    </div>
  );
}
