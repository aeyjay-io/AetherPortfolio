<?php

require_once __DIR__ . '/../config/site.php';
require_once __DIR__ . '/../config/constants.php';

?>

<!DOCTYPE html>

<html lang="en">

<head>

<meta charset="UTF-8">

<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title><?= SITE_NAME ?></title>

<meta name="description" content="<?= SITE_DESCRIPTION ?>">

<meta name="author" content="<?= SITE_AUTHOR ?>">

<!-- Favicon -->
<link rel="icon" type="image/png" href="assets/images/profile/favicon.png">

<!-- Google Fonts -->

<link rel="preconnect" href="https://fonts.googleapis.com">

<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet">

<!-- CSS -->



<link rel="stylesheet" href="<?= CSS_PATH ?>variables.css">
<link rel="stylesheet" href="<?= CSS_PATH ?>base.css">
<link rel="stylesheet" href="<?= CSS_PATH ?>layout.css?v=20260731">
<link rel="stylesheet" href="<?= CSS_PATH ?>components.css?v=20260809">

<link rel="stylesheet" href="<?= CSS_PATH ?>utilities.css">
<link rel="stylesheet" href="<?= CSS_PATH ?>animations.css?v=20260807">
<link rel="stylesheet" href="<?= CSS_PATH ?>responsive.css?v=20260731">

<!-- Components CSS -->
<link rel="stylesheet" href="<?= CSS_PATH ?>components/about.css">
<link rel="stylesheet" href="<?= CSS_PATH ?>journey.css">
<link rel="stylesheet" href="<?= CSS_PATH ?>components/skills.css">
<link rel="stylesheet" href="<?= CSS_PATH ?>components/projects.css">
<link rel="stylesheet" href="<?= CSS_PATH ?>components/experience.css">
<link rel="stylesheet" href="<?= CSS_PATH ?>components/services.css">


</head>

<body>
