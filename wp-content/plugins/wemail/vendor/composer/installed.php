<?php return array(
    'root' => array(
        'pretty_version' => '1.0.0+no-version-set',
        'version' => '1.0.0.0',
        'type' => 'wordpress-plugin',
        'install_path' => __DIR__ . '/../../',
        'aliases' => array(),
        'reference' => NULL,
        'name' => 'wemail/wemail',
        'dev' => false,
    ),
    'versions' => array(
        'appsero/client' => array(
            'pretty_version' => 'v1.2.0',
            'version' => '1.2.0.0',
            'type' => 'library',
            'install_path' => __DIR__ . '/../appsero/client',
            'aliases' => array(),
            'reference' => '5c3fdc4945c8680bca6fb01eee1ec5dc4f22de87',
            'dev_requirement' => false,
        ),
        'danielstjules/stringy' => array(
            'pretty_version' => 'dev-master',
            'version' => 'dev-master',
            'type' => 'library',
            'install_path' => __DIR__ . '/../danielstjules/stringy',
            'aliases' => array(
                0 => '9999999-dev',
            ),
            'reference' => 'df24ab62d2d8213bbbe88cc36fc35a4503b4bd7e',
            'dev_requirement' => false,
        ),
        'league/csv' => array(
            'pretty_version' => '7.2.0',
            'version' => '7.2.0.0',
            'type' => 'library',
            'install_path' => __DIR__ . '/../league/csv',
            'aliases' => array(),
            'reference' => '69bafa6ff924fbf9effe4275d6eb16be81a853ef',
            'dev_requirement' => false,
        ),
        'symfony/polyfill-mbstring' => array(
            'pretty_version' => 'v1.20.0',
            'version' => '1.20.0.0',
            'type' => 'library',
            'install_path' => __DIR__ . '/../symfony/polyfill-mbstring',
            'aliases' => array(),
            'reference' => '39d483bdf39be819deabf04ec872eb0b2410b531',
            'dev_requirement' => false,
        ),
        'wemail/wemail' => array(
            'pretty_version' => '1.0.0+no-version-set',
            'version' => '1.0.0.0',
            'type' => 'wordpress-plugin',
            'install_path' => __DIR__ . '/../../',
            'aliases' => array(),
            'reference' => NULL,
            'dev_requirement' => false,
        ),
    ),
);