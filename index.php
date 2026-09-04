<?php

session_start();

if (empty($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = bin2hex(
        random_bytes(32)
    );
}


include 'includes/head.php';
?>

<?php include 'includes/loader.php'; ?>

<?php include 'components/layout/navbar.php'; ?>

<main>



    <?php include 'components/sections/hero.php'; ?>

    <?php include 'components/sections/stats.php'; ?>

    <?php include 'components/sections/about.php'; ?>

    <?php include 'components/sections/journey.php'; ?>

    <?php include 'components/sections/experience.php'; ?>

    <?php include 'components/sections/skills.php'; ?>

    <?php include 'components/sections/services.php'; ?>

    <?php include 'components/sections/projects.php'; ?>

    <?php include 'components/sections/contact.php'; ?>
    

</main>

<?php include 'includes/cursor.php'; ?>

<?php
include 'includes/scripts.php';


?>