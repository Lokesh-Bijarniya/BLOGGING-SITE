import userModel from '../modals/authorModel.js';
import {isEmpty} from '../validator/validation.js';



const createAuthor =  async (req, res) => {
    try {
        let data = req.body;
        if(Object.keys(data).length == 0){
            return res.status(400).send({status : false, message:"Data is required"});
        }

        let {fname, lname, title, email, password} = data;

        if(isEmpty(fname)){
          return res.status(404).send({status : false, message:"fname is required"});
        }
        if(isEmpty(lname)){
            return res.status(404).send({status : false, message:"lname is required"});
          }
        if(isEmpty(title)){
            return res.status(404).send({status : false, message:"title is required"});
          }
        if(isEmpty(email)){
            return res.status(404).send({status : false, message:"email is required"});
          }
        if(isEmpty(password)){
            return res.status(404).send({status : false, message:"password is required"});
          }


        if(!isValidName(fname)){
            return res.status(404).send({status : false, message:"Invalid name"});
        }
        if(!isValidName(lname)){
            return res.status(404).send({status : false, message:"Invalid name"});
        }
        if(!isValidEmail(email)){
            return res.status(404).send({status : false, message:"Invalid email"});
        }
        if(!isValidPassword(password)){
            return res.status(404).send({status : false, message:"Invalid password"});
        }

        if(!["Mr", "Mrs", "Miss"].includes(title)){
            return res.status(404).send({status : false, message:"Title should only include 'Mr','Miss','Mrs'"});
        }

        email = email.toLowerCase();
        let checkEmail = await userModel.findOne({email:email});
        if(checkEmail){
            return res.status(404).send({status : false, message:"Email already exists"});
        }

        let createAuthor = await userModel.create(data);

    return res.status(200).send({status : true, message:"Author created successfully", data:createAuthor});

    } catch (error) {
        return res.status(404).send({status : false, message:error.message});
    }
};


export {createAuthor};