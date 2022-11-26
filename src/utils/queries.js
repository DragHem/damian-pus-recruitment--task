import { gql } from "@apollo/client";

export const PRODUCT_QUERY = (id) => gql`
    {
        product(id: "${id}") {
            id
            name
            inStock
            gallery
            description
            category
            attributes {
                id
                name
                type
                items {
                    displayValue
                    value
                    id
                }
            }
            prices {
                amount
                currency {
                    label
                    symbol
                }
            }
            brand
        }
    }
`;

export const CATEGORIES_QUERY = () => gql`
  {
    categories {
      name
    }
  }
`;

export const PRODUCT_CATEGORY_QUERY = (category) => gql`
    {
        category(input: { title: "${category}" }) {
            name
            products {
                id
                name
                gallery
                inStock
                prices {
                    amount
                    currency {
                        label
                        symbol
                    }
                }
            }
        }
    }
`;

export const CURRENCIES_QUERY = () => gql`
  {
    currencies {
      label
      symbol
    }
  }
`;
