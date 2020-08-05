# Smart Brain API 🎯
Server for [Smart Brain](https://github.com/oussamabouchikhi/smartbrain) app.

## Technologies used 🛠️
**Deployment**: *Heroku*<br />
**Database**: *Postgres*<br />
**Backend**: *NodeJs* <br />
**Libraries**: <br />
    - **clarifai**: api which uses AI/ML to detect faces <br />
    - **bcryptjs**: for implementing extra layer of security by encrypting users passwords <br />
    - **knex** & **pg**: for dealing with postgres & sql commands <br />
    - **express** NodeJs framework <br />
    - **cors** for avoiding cross origin errors <br />
    - **body-parser** for parsing request from browser to our server <br />
    

## Usage 📋
<details open>
<summary>1. Server Setup</summary>

```bash
#1. clone this project
~ git clone https://github.com/oussamabouchikhi/smartbrain-api.git
#2. cd into it
~ cd smartbrain-api
#3. install dependencies
~ npm i
#4. run app 
~ npm start:dev
```
</details>

<details open>
<summary>2. Database Setup</summary>

1. Create a database named `smartbrain` <br />
2. Setup your db credentials in `server.js` <br />
3. Create users & login tables using `sql` **commands**


</details>

## Contributing 💡
Pull request are welcome but please open an issue and discuss what you will do before 😊

## License 📄
This project is open-sourced under the [MIT license](https://opensource.org/licenses/MIT).
