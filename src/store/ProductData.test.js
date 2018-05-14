import { Listings } from './ProductData';

it('computes should display', () => {
    const dataThatShouldDisplay = [
        { productStore: { products: ['sss'] } },
        { productStore: { products: [] } },
    ];

    const dataThatShouldNotDisplay = [
        { productStore: { products: [] } },
        { productStore: { products: [] } },
    ];

    const listings = Listings(dataThatShouldDisplay);
    expect(listings.shouldDisplay).toBe(true);
    
    const listings2 = Listings(dataThatShouldNotDisplay);
    expect(listings2.shouldDisplay).toBe(false);
});

it('bla', () => {
    expect(true).toBe(true);
})