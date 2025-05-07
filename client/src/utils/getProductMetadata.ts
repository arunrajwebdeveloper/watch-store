export function getProductMetadata(product: any, id: string) {
  return {
    title: `${product.brand} - Buy Now`,
    description: `Purchase ${product.brand} ${product.model} at the best price.`,
    openGraph: {
      title: product.brand,
      description: `Buy ${product.brand} ${product.model} online with discounts.`,
      images: [product?.images[0]],
    },
    robots: "index, follow",
  };
}
