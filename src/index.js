import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import jsonpP from 'jsonp-p';

let flag = true;

const ProductService = {
	DEFAULT_LINK: "http://api.walmartlabs.com/v1/search?query=bosch&format=json&categoryId=1072864_1067619_1231248_1067739&apiKey=rgzr9bdktsbm3d6qy8ppdevb&numItems=25&start=25",

	async loadProducts(link = this.DEFAULT_LINK) {
		return jsonpP(link).promise
			.then(resp => {
				if (flag) {
					flag = false;
					return new Promise((resolve) => {
						setTimeout(() => {
							resolve(resp);
						}, 3000);
					});
				}

				return resp;
			})
			.then(resp => {
				resp.items.forEach(item => this.theFullData[item.itemId] = item);
				return resp.items;
			});
	},

	theFullData: {}
};

window.service = ProductService;

const ProductStore = (id, link) => {
	const store = observable({
		id,
		products: []
	});

	ProductService.loadProducts(link).then(products => store.products = products);

	return store;
};

const AppStore = (...links) => {
	const store = observable({
		activeTab: 0,
		// productListings: [new ProductStore(0, links[0])],
		productListings: links.map((link, i) => new ProductStore(i, link)),
		toggle() {
			// if (store.productListings.length === 1) {
			// 	store.productListings.push(new ProductStore(1, links[1]));
			// }
			store.activeTab = !store.activeTab;
		}
	});

	return store;
};

const appStore = new AppStore(
	"http://api.walmartlabs.com/v1/items?ids=222,369677640,12417832&apiKey=rgzr9bdktsbm3d6qy8ppdevb",
	"http://api.walmartlabs.com/v1/items?ids=222,679562478,19336123,951908906,369677640&apiKey=rgzr9bdktsbm3d6qy8ppdevb"
);


const ProductListing = observer(({ store: { products, id }}) => {
	return <div className="product-listing">
		{ console.log("xxx render", id) }
    <h2>List #{id+1}</h2>
		{products.map(p => <div>
			{ console.log("xxx render", p.itemId) }
			{p.itemId}</div>)
		}
  </div>
});

const App = observer(({ store: { productListings, activeTab, toggle }}) => (
  <div className="app">
    <div>{ productListings.length }</div>
		{ console.log("xxx app render") }
    <h1>Product Listings</h1>
    <button onClick={toggle}>Toggle</button>

		{/*{ productListings.map(store => <ProductListing store={store} />) }*/}

		<ProductListing store={productListings[Number(activeTab)]} />
		<hr />
		<ProductListing store={productListings[0]} />
  </div>
));


ReactDOM.render(<App store={appStore}/>, document.getElementById('root'));