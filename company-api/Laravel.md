##### Start development server

php artisan serve

##### Clear various caches

php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear

##### Clear all caches at once

php artisan optimize:clear

##### Run migrations

php artisan migrate

##### Rollback last migration

php artisan migrate:rollback

##### Refresh migrations (rollback all and migrate again)

php artisan migrate:refresh

##### Refresh database and run seeders

php artisan migrate:refresh --seed

##### Create a model

php artisan make:model ModelName

##### Create a model with migration

php artisan make:model ModelName -m

##### Create a controller

php artisan make:controller ControllerName

##### Create a resource controller with all CRUD methods

php artisan make:controller ControllerName --resource

##### Create migration

php artisan make:migration create_table_name_table

##### Create seeder

php artisan make:seeder TableNameSeeder

##### Create factory

php artisan make:factory ModelNameFactory

##### Create middleware

php artisan make:middleware MiddlewareName

##### Install Laravel Breeze (basic authentication)

composer require laravel/breeze --dev
php artisan breeze:install

##### Install Laravel Sanctum (API authentication)

composer require laravel/sanctum
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"

##### Put application in maintenance mode

php artisan down

##### Bring application back online

php artisan up

##### List all registered routes

php artisan route:list

##### Create application key

php artisan key:generate

##### Create symbolic link for storage

php artisan storage:link

##### Install dependencies

composer install

##### Update dependencies

composer update

##### Install a new package

composer require package/name

##### Autoload classes

composer dump-autoload

##### Create a new job

php artisan make:job JobName

##### Create a new event

php artisan make:event EventName

##### Create a new listener

php artisan make:listener ListenerName

##### Create a new mail class

php artisan make:mail MailName

##### Show all available artisan commands

php artisan list
