/**
 * @license Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here.
	// For complete reference see:
	// http://docs.ckeditor.com/#!/api/CKEDITOR.config

	// The toolbar groups arrangement, optimized for a single toolbar row.
	config.toolbarGroups = [
	    { name: 'clipboard',   groups: [ 'clipboard' ] },
		{ name: 'basicstyles', groups: [ 'basicstyles' ] },
		{ name: 'paragraph',   groups: [ 'list' ] },
		{ name: 'insert' },
		{ name: 'links' },
		{ name: 'editing',     groups: [ 'spellchecker' ] }

	];
	config.removeButtons = 'Cut,Copy,Paste,Anchor,Subscript,Superscript,h2,h3,h4,h5,h6,NumberedList,Outdent,Indent';

	// Dialog windows are also simplified.
	config.removeDialogTabs = 'link:advanced';
	config.basicEntities = false;

	config.contentsCss = ['css/style.css'];
};
