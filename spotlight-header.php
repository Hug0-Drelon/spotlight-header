<?php
/**
 * Plugin Name:       Spotlight Header
 * Description:       Header with neat spotlight effect.
 * Requires at least: 6.6
 * Requires PHP:      7.2
 * Version:           0.1.0
 * Author:            Hugo Drelon
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       spotlight-header
 *
 * @package Hug0-Drelon\SpotlightHeader
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

function register_spotlight_header_block_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'register_spotlight_header_block_init' );

function spotlight_header_block_register_style() {
    wp_register_style(
        'spotlight-style',
        plugins_url( 'build/style-index.css', __FILE__ ),
        [],
        filemtime( plugin_dir_path( __FILE__ ) . 'build/style-index.css' )
    );
}
add_action( 'init', 'spotlight_header_block_register_style' );

function spotlight_header_block_enqueue_style() {
    if ( has_block( 'hd/spotlight' ) ) {
        wp_enqueue_style( 'spotlight-style' );
    }
}
add_action( 'wp_enqueue_scripts', 'spotlight_header_block_enqueue_style' );
