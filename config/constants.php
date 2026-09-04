<?php

// ======================================
// ENVIRONMENT DETECTION
// ======================================

$isLocal =
    $_SERVER['HTTP_HOST'] === 'localhost' ||
    $_SERVER['HTTP_HOST'] === '127.0.0.1';


// ======================================
// BASE URL
// ======================================

if ($isLocal) {

    define('BASE_URL', '/AetherPortfolio/');

} else {

    define('BASE_URL', '/');

}


// ======================================
// ASSET PATHS
// ======================================

define('CSS_PATH', BASE_URL . 'assets/css/');
define('JS_PATH', BASE_URL . 'assets/js/');
define('IMAGE_PATH', BASE_URL . 'assets/images/');