// src/utils/dummyData.ts
export const dummyProducts = {
    products: [
      {
        id: "prod_12345",
        name: "Men's Casual Shirt",
        description: "A comfortable and stylish casual shirt for men.",
        price: 29.99,
        currency: "USD",
        images: [
          {
            file: {
              url: "https://example.com/images/mens-shirt-1.jpg",
            },
          },
          {
            file: {
              url: "https://example.com/images/mens-shirt-2.jpg",
            },
          },
        ],
        categories: [
          {
            id: "cat_123",
            name: "Men's Clothing",
          },
        ],
        stock_level: 100,
        sku: "MCS12345",
        attributes: {
          color: "Blue",
          size: "M",
        },
        created_at: "2023-10-01T12:00:00Z",
        updated_at: "2023-10-01T12:00:00Z",
      },
      // Add more products here...
    ],
  };