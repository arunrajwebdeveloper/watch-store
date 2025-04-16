import Banner from "@/components/home/Banner";
import GridItem from "@/components/home/GridItem";
import "@/styles/home/home.style.css";
import Grid from "@/components/home/Grid";
import ProductScroller from "@/components/products/ProductScroller";

export default async function HomePage() {
  return (
    <div>
      <Banner
        url="/products/brand/rolex"
        image="/rolex-banner.jpeg"
        content="Welcome to WatchStore, Official Rolex Retailer in the World"
        buttonText="Explore more"
      />
      <Grid>
        <GridItem
          url="/products?gender=male"
          image="/men-collections.jpg"
          content="Men Collections"
          buttonText="View watches"
        />
        <GridItem
          url="/products?gender=female"
          image="/women-collections.jpg"
          content="Women Collections"
          buttonText="View watches"
        />
      </Grid>

      <ProductScroller
        title="Panerai watch Collections"
        filter={{ brand: "Panerai" }}
      />

      <Grid>
        <GridItem
          url="/products/brand/hublot"
          image="/hublot-collections.jpg"
          content="Hublot Watches"
          buttonText="View watches"
        />
        <GridItem
          url="/products/brand/panerai"
          image="/panerai-collections.avif"
          content="Panerai Watches"
          buttonText="View watches"
        />
      </Grid>

      <ProductScroller
        title="Casio Watch Collections"
        filter={{ brand: "Casio" }}
      />
    </div>
  );
}
