import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Formik } from 'formik';
import './formik.css';

export default function Product() {
    const [field, setField] = useState({
        user:[],
    })
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
    const handleSubmit = async (formData,resetForm) => {

        if(field.user.id){
            //Update
            var res=await axios.put(`https://6249738f831c69c687cde72c.mockapi.io/product/${field.user.id}`,
                {productId:formData.productId,
                productName:formData.productName,
                price:formData.price,});
                
            var index=field.user.findIndex(row=>row.id==res.data.id);
            var user=[...field.user]
            user[index]=res.data;
            await setField({user,productId:'',productName:'',price:'',id:''})
            
        }
        else{
            //create
            var res=await axios.post('https://6249738f831c69c687cde72c.mockapi.io/product',
            {productId:formData.productId,
             productName:formData.productName,
             price:formData.price,});
                
            //console.log(res)
            var user=[...field.user]
            user.push(res.data);
            await setField({user})
            //await resetForm();
        }
        
    };
    const handleDelete= async (id)=>{
        console.log(id,field.user)
        await axios.delete(`https://6249738f831c69c687cde72c.mockapi.io/product/${id}`)
        var user=field.user.filter((row)=>row.id!=id)
        console.log(user)
        setField({user})
    }


    useEffect(async () => {
        var res = await axios.get('https://6249738f831c69c687cde72c.mockapi.io/product');
        setField({user:res.data});
        console.log(field.user);
    }, []);

    const onPopulateData=(id)=>{
        const selectedData=field.user.filter((row)=>row.id==id)[0];
        
        // formData.productId=selectedData.productId;
        // formData.productName=selectedData.productName;
        // formData.price=selectedData.price;
        // formData.id=selectedData.id;
        
        console.log(initialValue)    
    }

    return (
        <div style={{ padding: '15px', margin: '15px' }}>
            <div>
                <h3> Product Form using Formik </h3><br /><br />
                <Formik
                    initialValues={initialValue}
                    validate={(formData) => validate(formData)}
                    onSubmit={(formData) => handleSubmit(formData)}
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
                        <form onSubmit={(values,{resetForm})=>handleSubmit(values,resetForm)}>
                            <div>
                                <label> S.No.: </label>&nbsp;
                                <input
                                    type="text"
                                    name="id"
                                    value={values.id}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <br />
                                <span style={{ color: 'red' }}>
                                    {touched.id && errors.id}
                                </span>
                            </div>
                            <br />
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
                            <div>
                                <button type="submit" disabled={isSubmitting}>
                                    Submit
                                </button>
                                &nbsp;
                                <button type="button"> Reset </button>&nbsp;
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
