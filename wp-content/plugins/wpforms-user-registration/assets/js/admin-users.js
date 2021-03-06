/* global wpforms_admin_users */

/**
 * WPForms User Registration users bulk actions.
 *
 * @since 1.0.0
 */

'use strict';

jQuery( function( $ ) {

	$( 'tr:has(.submitapprove)' ).css( 'background-color', '#FFFFE0' );
	$( '.actions select[name^="action"]' ).append(
		'<option value="wpforms_bulk_approve">' + wpforms_admin_users.approve + '</option>' +
		'<option value="wpforms_bulk_unapprove">' + wpforms_admin_users.unapprove + '</option>'
	);
} );
