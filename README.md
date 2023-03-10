# ng-10-laravel-9-app

Backend Installation

Install Composer
Install Laravel 9

Commands to Run
cd /backend
1. composer install
2. php artisan key:generate
3. php artisan migrate
4. php artisan db:seed
5. php artisan serve

I have implemented localization
- Goto http://localhost:8000
- Click French on top right
This will change a text below laravel app logo to french and this can be changed to English by clicking on the same point.
- To go to angular app you can click on top right on link that says (Angular App)

Frontend Installation

Angular 10 cli
cd /frontend
1. npm install
2. ng serve

- Permissions for Tasks
In angular who has created a task can only delete or edit the task while the member assigned to the task will be able to just view the task

I have written one test case to test login function of AuthService
Command to Test
- ng test