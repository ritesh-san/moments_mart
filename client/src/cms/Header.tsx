import React, {useState, useEffect, useRef } from "react";
import axios from "axios";
import {Link,NavLink, useNavigate} from "react-router-dom";
import ProductsDeatils from "../Catalog/ProductDeatils";
import { useSelector } from "react-redux";

const Header=()=>{
    const[menu, setMenu] = useState<any>();
    const refMenu = useRef(null);
    const [data, setData] = useState<any[]>([])
    const [query, setQuery] = useState<string>("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const itemc = useSelector((state:any) => state.tocart.count)

  const nav = useNavigate()
 
    useEffect(()=>{
        axios.get('http://localhost:4000/mart/categories')
        .then((res)=>{
            console.log(res)
            if(res?.data?.success) {
                setMenu(res?.data?.data);
            }

            axios.get(`http://localhost:4000/mart/prosearch/`)
            .then((res)=>{
                console.log(res.data.data)
                setData(res.data.data)
                
            }).catch((err)=>{
                console.log(err)
                //toast.error("Something went wrong!");
            })
        })
        .catch((err)=>{
            console.log(err)
        })
    },[])

    const toggleNav=()=>{
            refMenu.current.classList.toggle("show");   
    }

    

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    

    if (value.trim() === "") {
      setSuggestions([]);
    } else {
      const filtered:any = data.filter((item:string) => {
        //console.log(item.nameSku);
        return item?.nameSku?.toLowerCase().includes(value.toLowerCase())
    });
    console.log(filtered)
      setSuggestions(filtered);
    }
  };

  const handleSelect = (item:any) => {
    //setQuery(item)
    setSuggestions([])
    nav(`/item/${item.id}`)
    //return <ProductsDeatils key={item.id} />;
  };
    

    return(
        <>
             <header className="site-header">
                <div className="container header-top">
                <a href="/" className="log-cls"><h1 className="logo">Moments<span>Mart</span></h1></a>
                <div className="search-box search-container">
                    <input id="search" className="search-input" type="text" autoComplete="off" placeholder="Type to search..." value={query}
                        onChange={handleChange} />
                    {(suggestions.length > 0) ? (
                        <ul className="suggestion-list">
                        {suggestions.map((item, index) => (
                            <li key={item.id} onClick={() => handleSelect(item)}>
                                <div className="li-item">
                                    <img src={item.image} /> 
                                <span className="left-span">{item.name} <span className="sbottom">${item.price}</span></span> 
                               </div>
                            </li>
                        ))}
                        </ul>
                    ) : null}
                    <button>Search</button>
                </div>
                <nav className="top-menu user-actions">
                    <a href="/register" className="action-link"><i className="fas fa-user-plus"></i></a>
                    <a href="/login" className="action-link"><i className="fas fa-user"></i></a>
                    <a href="/cart" className="action-link cart-icon">
                        <i className="fas fa-shopping-cart"></i>
                        <span>{itemc}</span>
                    </a>
                </nav>
                </div>
                <button className="nav-toggle" onClick={toggleNav}>☰ Categories</button>
                <div className="main-nav-wrapper" ref={refMenu}>
                    <div className="main-nav container">
                        <NavLink to="/" key="home" style={({isActive})=>({color:isActive?'#fff':'#1E1E2E',backgroundColor:isActive?'#DC143C':'#FFD93D'})}>Home</NavLink>
                        {
                            (menu && menu.length > 0) ?
                                (
                                    menu.map((category:any)=>{
                                        return <NavLink to={`/category/${category._id}`} key={category._id} style={({isActive})=>({color:isActive?'#fff':'#1E1E2E',backgroundColor:isActive?'#DC143C':'#FFD93D'})}>{category.name}</NavLink>
                                    })
                                ):null
                        }
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header