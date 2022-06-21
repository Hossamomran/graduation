/**
 * External dependencies
 */
import { useEffect, useState } from '@wordpress/element';
import { RichText } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { useStoreCart } from '../../hooks';
import Product from '../product';
import {
	getProductsFromCategoryMatches,
	getProductsFromProductMatches,
	getDefaultProducts,
	getProductsFromCart,
	getLatestProducts,
} from '../../datasource';

const ProductsGrid = ( props ) => {
	const [ products, setProducts ] = useState( [] );
	const { cartItems } = useStoreCart();
	const { attributes, setAttributes, isEditing } = props;
	const {
		defaultAddons,
		categoryMatches,
		productMatches,
		numberOfProducts,
		columns,
		title,
	} = attributes;

	const loadProducts = async () => {
		if ( isEditing ) {
			/**
			 * Loads products coming from the array defined as default ones,
			 * if empty, the lastest 10 created.
			 **/
			const productsToShow =
				defaultAddons.length > 0
					? await getDefaultProducts( defaultAddons )
					: await getLatestProducts();
			setProducts( productsToShow );
		} else {
			/**
			 * We don' want to display anything if the cart is empty.
			 */
			if ( cartItems.length === 0 ) {
				setProducts( [] );
				return;
			}

			let productsToShow = [];

			/**
			 * Let's see if there are product matches.
			 */
			const productsFromProductMatches = await getProductsFromProductMatches(
				productMatches
			);

			if ( undefined !== productsFromProductMatches ) {
				productsToShow = productsFromProductMatches;
			}

			/**
			 * Now, let's see if there are category matches, if so, let's add the missing products matches.
			 */
			const productsFromCategoryMatches = await getProductsFromCategoryMatches(
				categoryMatches
			);

			if ( undefined !== productsFromCategoryMatches ) {
				productsFromCategoryMatches.forEach( ( candidate ) => {
					// We're only adding it in if it's not already been added by a product match.
					if (
						! productsToShow.find( ( product ) => {
							return product.id === candidate.id;
						} )
					) {
						productsToShow.push( candidate );
					}
				} );
			}

			/**
			 * Still no products to show? Let's load defauts
			 */
			if ( productsToShow.length === 0 ) {
				productsToShow = await getDefaultProducts( defaultAddons );
			}

			/**
			 * Alright, we're all set. We did our investigation for the matches,
			 * now let's show the products. Before though, let's remove products that
			 * are in cart already.
			 */
			const cartProductIDs = getProductsFromCart();
			const difference = productsToShow.filter(
				( product ) => ! cartProductIDs.includes( product.id )
			);
			setProducts( difference );
		}
	};

	useEffect( () => {
		loadProducts();
	}, [ isEditing ? defaultAddons : cartItems ] );

	const gridClass = `wc-block-grid has-${
		columns ?? 3
	}-columns has-multiple-rows`;
	const listClass = 'wc-block-grid__products';

	if ( ( products.length === 0 || cartItems.length === 0 ) && ! isEditing ) {
		return null;
	}
	return (
		<div className={ gridClass }>
			{ isEditing ? (
				<RichText
					tagName="h1"
					value={ title }
					onChange={ ( newTitle ) =>
						setAttributes( { title: newTitle } )
					}
					placeholder={ __(
						'Cart Add-ons Title',
						'sfn_cart_addons'
					) }
					allowedFormats={ [ 'core/bold', 'core/italic' ] }
				/>
			) : (
				<>
					<h1>
						{ title ?? __( 'Cart Add-ons', 'sfn_cart_addons' ) }
					</h1>
				</>
			) }
			<ul className={ listClass }>
				{ products
					.slice( 0, numberOfProducts ?? 3 )
					.map( ( product ) => (
						<li
							key={ product.id }
							className="wc-block-grid__product wc-block-layout"
						>
							<Product
								isEditing={ isEditing }
								product={ product }
							/>
						</li>
					) ) }
			</ul>
		</div>
	);
};

export default ProductsGrid;
