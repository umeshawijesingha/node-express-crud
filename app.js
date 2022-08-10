const express=require('express');
const Joi=require('joi');
const schema=require('./validateSchema');

const app=express();
app.use(express.json());

const customers=[{
    id:1,
    name:"Kamal",
    age:25
},{
    id:2,
    name:"Kamali",
    age:25
},{
    id:3,
    name:"Namali",
    age:27
},{
    id:4,
    name:"Pamali",
    age:28
}
]

app.get('/',(req,res)=>{
    res.send("Hello World");
})

//get all customers----------------------------
app.get('/api/customers',(req,res)=>{
    res.send(customers);
})

//get customer by id-----------------------------
app.get('/api/customers/:id',(req,res)=>{
    const id=req.params.id;
    const result=customers.find(customer=>customer.id==id);
    console.log(result);

    if(result)
        res.send("Customer found");
    else
        res.send("Customer not found");
})

//create customer --------------------------------
app.post('/api/customers/add',(req,res)=>{
    const name=req.body.name;
    const result=schema.validate(req.body);
    if(result.error){
       
       res.send(result.error.details[0].message);
       return;
    }
    //--------------Normal validation-------------------------------------------
    // if(!name||name.length<3){
    //     res.status(400).send("Name is required and should not minimum 3");
    //     return;
    // }
     const cus=req.body;
     customers.push(cus);
    res.send(customers);
})

//edit customer---------------------------------------------------------------
app.put('/api/customers/edit/:id',(req,res)=>{
    const result=schema.validate(req.body);
    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }
     const id=req.params.id-1;
     console.log(id);
    const cus=req.body
    customers[id].name=cus.name;
    customers[id].age=cus.age;
    //  customers.splice(id,1)
    //  customers.push(cus)
    res.send(customers);

})

//delete customer------------------------------------------------------------
app.delete('/api/customers/delete/:id',(req,res)=>{
     const id=req.params.id-1;
     console.log(id);
   customers.splice(id,1);
    res.send(customers);
})

app.listen('3000',()=>console.log('App started'));