<?php
/*
 * Plugin Name: AAAA-----lll React Connect
 */

/**
 * ReactConnect
 */
class ReactConnect {

	/**
	 * The single instance of the class.
	 *
	 * @var object
	 */
	protected static $instance = null;
	/**
	 * @return self
	 */
	final public static function instance() {
		if ( null === self::$instance ) {
			self::$instance = new self();
		}

		return self::$instance;
	}

	/**
	 * __construct
	 */
	public function __construct() {
		add_action( 'admin_menu', [ $this, 'admin_menu_register' ] );
		add_action( 'admin_enqueue_scripts', [ $this, 'enqueue_scripts' ] );
		add_action( 'rest_api_init', [ $this, 'api_init' ] );
	}

	/**
	 * @return void
	 */
	public function api_init() {
		register_rest_route(
			'RC/v1/api',
			'/updateOptions',
			[
				'methods'             => 'POST',
				'callback'            => [ $this, 'rc_update_options' ],
				'permission_callback' => [ $this, 'login_permission_callback' ],
			]
		);
		register_rest_route(
			'RC/v1/api',
			'/getOptions',
			[
				'methods'             => 'GET',
				'callback'            => [ $this, 'rc_get_options' ],
				'permission_callback' => [ $this, 'login_permission_callback' ],
			]
		);
	}
	
	/**
	 * @return true
	 */
	public function login_permission_callback() {
		return current_user_can( 'manage_options' );
	}

	/**
	 * @return array
	 */
	public function rc_update_options( $request ) {
		$result       = [
			'message' => esc_html__( 'Update failed. Maybe change not found. ', 'dfsdfd' ),
		];
		$params       = $request->get_params();
		$get_settings = get_option( 'react_connect_settings', [] );
		if ( isset( $params['name'] ) ) {
			$get_settings['name'] = $params['name'];
		}
		if ( isset( $params['agree'] ) ) {
			$get_settings['agree'] = $params['agree'];
		}
		$options           = update_option( 'react_connect_settings', $get_settings );
		$result['updated'] = boolval( $options );
		if ( $result['updated'] ) {
			$result['message'] = esc_html__( 'Updated.', 'ancenter' );
		}
		return $result;
	}
	
	/**
	 * @return false|string
	 */
	public function rc_get_options() {
		$the_settings = get_option( 'react_connect_settings', [] );
		return wp_json_encode( $the_settings );
	}

	/**
	 * @return void
	 */
	public function enqueue_scripts() {
		wp_enqueue_script(
			'react-connect',
			plugin_dir_url( __FILE__ ) . 'assets/js/admin-settings.js',
			[],
			'1.0',
			true
		);

		wp_localize_script(
			'react-connect',
			'RcParam',
			[
				'restApiUrl' => esc_url_raw( rest_url() ),
				'rest_nonce' => wp_create_nonce( 'wp_rest' ),
			]
		);
	}

	/**
	 * @return void
	 */
	public function admin_menu_register() {
		add_menu_page(
			'React Conect',
			'React Conect',
			'manage_options',
			'react-connect',
			[ $this, 'admin_page_react_connect' ],
			6
		);
	}
	/**
	 * @return void
	 */
	public function admin_page_react_connect() {
		echo '<div class="wrap"><div id="react_connect"></div></div>';
	}
}

/**
 * @return object|ReactConnect|null
 */
function react_connect() {
	return ReactConnect::instance();
}

add_action( 'plugins_loaded', 'react_connect' );
