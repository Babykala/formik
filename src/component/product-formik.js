import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Formik } from 'formik';
import './formik.css';

export default function Product() {
    const [field, setField] = useState({
        user:[],
    })
    const [formvalues,setFormvalues]=useState({});
    const initialValue = {
        id:'',
        productId: '',
        productName: '',
        price: '',
    };

    const validate = (formData) => {
        var errors = {};
        if (formData.id === '') errors.id = 'Id is Required';
        if (formData.productId === '') errors.productId = 'ProductId is Required';
        if (formData.productName === '') errors.productName = 'ProductName is Required';
        if (formData.price === '') errors.price = 'Price is Required';
        return errors;
    };
    const onPopulateData=async (id)=>{
        const selectedData=field.user.filter((data)=>data.id==id)[0];
        await setFormvalues({
        id:selectedData.id,
        productId:selectedData.productId,
        productName:selectedData.productName,
        price:selectedData.price,})
    }
    const handleSubmit = async (formData) => {

        if(formvalues.id){
            //Update
            var res=await axios.put(`https://6249738f831c69c687cde72c.mockapi.io/product/${formvalues.id}`,
                {productId:formData.productId,
                productName:formData.productName,
                price:formData.price,});
                
            var index=field.user.findIndex(row=>row.id==res.data.id);
            var user=[...field.user]
            user[index]=res.data;
            await setField({user})
            
            formData.productId='';
            formData.productName='';
            formData.price='';  
            await setFormvalues({});
        }
        else{
            //create
            var res=await axios.post('https://6249738f831c69c687cde72c.mockapi.io/product',
            {productId:formData.productId,
             productName:formData.productName,
             price:formData.price,});
            
            var user=[...field.user]
            user.push(res.data);
            await setField({user})
            formData.productId='';
            formData.productName='';
            formData.price='';
           
        }
        
    };
    const handleDelete= async (id)=>{
        await axios.delete(`https://6249738f831c69c687cde72c.mockapi.io/product/${id}`)
        var user=field.user.filter((row)=>row.id!=id)
        setField({user})
    }


    useEffect(async () => {
        var res = await axios.get('https://6249738f831c69c687cde72c.mockapi.io/product');
        setField({user:res.data});
        console.log(field.user);
    }, []);

    return (
        <div style={{ padding: '15px', margin: '15px' }}>
            <div style={{border:'solid 1px black',width:'50%',borderRadius:'5px',padding:'10px'}}>
                <h3 style={{color:'red',textAlign:'center'}}> Product Form using Formik </h3><br /><br />
                <Formik
                    initialValues={formvalues || initialValue}
                    validate={(formData) => validate(formData)}
                    onSubmit={(formData) => handleSubmit(formData)}
                    enableReinitialize
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                        /* and other goodies */
                    }) => (
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label> Product ID: </label>&nbsp;
                                <input
                                    type="text"
                                    name="productId"
                                    value={values.productId}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <br />
                                <span style={{ color: 'red' }}>
                                    {touched.productId && errors.productId}
                                </span>
                            </div>
                            <br />
                            <div>
                                <label> Product Name: </label>&nbsp;
                                <input
                                    type="text"
                                    name="productName"
                                    value={values.productName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <br />
                                <span style={{ color: 'red' }}>
                                    {touched.productName && errors.productName}
                                </span>
                            </div>
                            <br />
                            <div>
                                <label> Price: </label>&nbsp;
                                <input
                                    type="text"
                                    name="price"
                                    value={values.price}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <br />
                                <span style={{ color: 'red' }}>
                                    {touched.price && errors.price}
                                </span>
                            </div>
                            <br />
                            <div style={{textAlign:'center'}}>
                                <button type="submit" disabled={isSubmitting}>
                                    Submit
                                </button>
                                &nbsp;&nbsp;
                                
                            </div>
                        </form>
                    )}
                </Formik>
            </div>

            <br /><br />
            <div>
                <h3>Table</h3><br />
                <table className='table'>
                    <thead>
                        <tr>
                            <td>S.No.</td>
                            <td>Product Id</td>
                            <td>Product Name</td>
                            <td>Price</td>
                            <td>Actions</td>
                        </tr>
                    </thead>
                    <tbody>
                        {field.user.map((row=>{
                           return(
                                <tr>
                                <td>{row.id}</td>
                                <td>{row.productId}</td>
                                <td>{row.productName}</td>
                                <td>Rs.{row.price}</td>
                                <td><button onClick={()=>onPopulateData(row.id)}>Edit</button> &nbsp; 
                                <button onClick={()=>handleDelete(row.id)}>Delete</button></td>
                            </tr>
                            )
  
                        }))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
