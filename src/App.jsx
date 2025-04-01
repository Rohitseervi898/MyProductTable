import { useState } from 'react'
import './App.css'

function ProductCategoryRow({ category }){
  return (
    <tr>
      <th colSpan="2">{category}</th>
    </tr>
  )
}

function ProductRow({product}){
  const name=product.stocked?product.name:<span style={{color:"red"}}>{product.name}</span>
  return (
    <>
      <tr>
        <td style={{border:'1px solid rgb(168, 212, 23)'}}>{name}</td>
        <td style={{border:'1px solid rgb(168, 212, 23)'}}>{product.price}</td>
      </tr>
    </>
  )
}

function ProductTable({Products, filtertext, ischecked}){  
  const row=[];
  let lastCategory=null;
  Products.forEach((product) =>{
    if(product.name.toLowerCase().indexOf(filtertext.toLowerCase())===-1){
      return;
    }
    if(ischecked && !product.stocked){
      return;
    }
    if(product.category!=lastCategory){
      row.push(
        <ProductCategoryRow category={product.category}  />
      )
    }
    row.push(
      <ProductRow product={product} key={product.id}/>
    )
    lastCategory=product.category;
  })
  return (
    <table style={{border:'1px solid'}}>
      <thead >
        <tr>
          <th style={{border:'1px solid'}}>Name</th>
          <th style={{border:'1px solid'}}>Price</th>
        </tr>
      </thead>
      <tbody>{row}</tbody>
    </table>
  )
}

function Searchproduct({filtertext,setFiltertext,ischecked,setIschecked}){

  return(
    <>
      <form>
        <input style={{padding:'5px 10px',backgroundColor:"white",fontSize:'18px', color:'black', border:'none',borderRadius:'20px',textAlign:'center'}} type='text' placeholder='Search' value={filtertext} onChange={(e)=>setFiltertext(e.target.value)}/><br/>
        <label>
          <input type='checkbox' checked={ischecked} onChange={(e)=>setIschecked(e.target.checked)} />
          {' '} Only in Stock
        </label>
      </form>
    </>
  )
}

function FilterProductTable({ Products }) {
  console.log(Products);
  
  const [filtertext, setFiltertext] = useState('');
  const [ischecked, setIschecked] = useState(false);
  return (
    <div style={{display:'flex',flexDirection:'column', textAlign:'center'}}>
      <Searchproduct filtertext={filtertext} setFiltertext={setFiltertext} ischecked={ischecked} setIschecked={setIschecked}/>
      <ProductTable Products={Products} filtertext={filtertext} ischecked={ischecked} />
    </div>
  );
}

const PRODUCTS=[
  {id:1 ,category:"Fruits", price:"$1", stocked: true, name:"Apple"},
  {id:2 ,category:"Fruits", price:"$1", stocked: true, name:"Dragonfruit"},
  {id:3 ,category:"Fruits", price:"$2", stocked: false, name:"Passionfruit"},
  {id:4 ,category:"Vegetables", price:"$2", stocked: true, name:"Spinach"},
  {id:5 ,category:"Vegetables", price:"$4", stocked: false, name:"Pumpkin"},
  {id:6 ,category:"Vegetables", price:"$1", stocked: true, name:"Peas"},
]

function App() {
  return (
    <FilterProductTable Products={ PRODUCTS } />
  )
}

export default App
