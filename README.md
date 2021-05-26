# GraphQL keystone API

Ecommerce API created with KeystoneJS

## Preview

<img src="./screenshots/preview.gif" data-canonical-src="./screenshots/preview.gif" />

## Dependencies

* [KeystoneJS](https://www.keystonejs.com/)
* [Stripe](https://stripe.com/en-gb-us)
* [cloudinary](https://cloudinary.com/)
* [mongodb](https://www.mongodb.com/)
* [Ethereal Mail](https://ethereal.email/)

## Setup Evniroment variables
Rename [.env.example](./.env.example) to .env and add your:
* database URI
* cloudninary credentials
* cookie secret : type a random long String of characters
* Stripe secret
* a mail provider (ethreal for example)
* frontend url (in case of the use of webapp)



## Running the Project.

Install dependencies with `npm install`

Run `npm run dev`

* Admin UI - `http://localhost:3000/admin`
* Graphiql Client - `http://localhost:3000/admin/graphql`
* API Endpoint - `http://localhost:3000/admin/api`


## Next steps

Run the [FrontEnd flutter app](https://github.com/zakariaBoukernafa/Marv) and follow the instructions to run the project.

## License
Licensed under the [MIT license](https://opensource.org/licenses/MIT).
