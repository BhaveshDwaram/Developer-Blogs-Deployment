# Developer Blogs 

## login Credentials
- ### Username :- bhavesh
- ### password :- bhavesh@test
- # Step 1 is to install nodejs
## Installing Nodejs 
### Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v8.11.3

    $ npm --version
    6.1.0

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g
- # Step 2 is to clone Git Repository
    Apply this command in the  directory where you want to save project
  
      $ git clone https://github.com/BhaveshDwaram/Developer-Blogs-Website
  
Open IDE like VScode and split the terminal into two halves on half will run CLIENT part and another half will run API part 
- #### In CLIENT terminal change the directory to client
      
      $ cd client

- #### In API terminal change the directory to api

        $cd api
- #### It should look like this

    ![Screenshot 2024-02-21 115634](https://github.com/BhaveshDwaram/Developer-Blogs-Website/assets/92073342/eac810de-04e9-43cb-a316-659a22fe6416)

- #### Now run this command in both the terminals it will install all dependencies

           $ npm install

- #### In your api directory create a new .env file  
![image](https://github.com/BhaveshDwaram/Developer-Blogs-Website/assets/92073342/42acdc34-f457-45c7-9391-23b758a38851)

- #### In env file add the mongo url
       $ MONGO_URL = "mongodb+srv://bhavesh13dwaram:bhavesh@2003@cluster0.nxxspmy.mongodb.net/blog?retryWrites=true&w=majority"
       $ PORT =3000
  
- #### In the api directory install mongodb
       $ npm install mongodb
  
- #### Now in api directory run the backend
       $ npm start

- #### In the client directory run the frontend
        $ npm start

## Our project opens the Live server in the browser and gets executed 
